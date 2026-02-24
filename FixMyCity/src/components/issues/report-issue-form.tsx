'use client';

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { reportIssue, type ReportIssueState } from '@/lib/actions';
import { useActionState, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Image as ImageIcon, MapPin, Loader2 } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  photo: z.any().refine((files) => files?.length == 1, 'Image is required.'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Report
    </Button>
  );
}

export function ReportIssueForm() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: ReportIssueState = {};
  const [state, dispatch] = useActionState(reportIssue, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.errors ? 'Error' : 'Success',
        description: state.message,
        variant: state.errors ? 'destructive' : 'default',
      });
      if (!state.errors) {
        form.reset();
        setImagePreview(null);
        formRef.current?.reset();
      }
    }
  }, [state, toast, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
        toast({ title: 'Error', description: 'Geolocation is not supported by your browser.', variant: 'destructive' });
        return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            form.setValue('latitude', position.coords.latitude);
            form.setValue('longitude', position.coords.longitude);
            toast({ title: 'Success', description: 'Location captured.' });
            setIsLocating(false);
        },
        () => {
            toast({ title: 'Error', description: 'Unable to retrieve your location.', variant: 'destructive' });
            setIsLocating(false);
        }
    );
  };

  const action: (formData: FormData) => void = (formData) => {
    const file = form.getValues('photo')[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            formData.append('photoDataUri', reader.result as string);
            formData.set('description', form.getValues('description'));
            formData.set('latitude', String(form.getValues('latitude') || ''));
            formData.set('longitude', String(form.getValues('longitude') || ''));
            dispatch(formData);
        };
        reader.readAsDataURL(file);
    } else {
        toast({ title: 'Error', description: 'Please select an image to upload.', variant: 'destructive' });
    }
  };


  return (
    <Form {...form}>
      <form ref={formRef} action={action} className="grid gap-4">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Photo</FormLabel>
              <FormControl>
                <div className="relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'contain' }} className="rounded-lg p-2" />
                  ) : (
                    <div className="flex flex-col items-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        <span className="mt-2 text-sm text-muted-foreground">Click to upload an image</span>
                    </div>
                  )}
                  <Input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleImageChange(e);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the issue..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Location</FormLabel>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLocating}>
              {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
              Get Current Location
            </Button>
            {form.watch('latitude') && (
                <span className="text-sm text-muted-foreground">
                    {form.watch('latitude')?.toFixed(4)}, {form.watch('longitude')?.toFixed(4)}
                </span>
            )}
          </div>
          {state?.errors?.location && <p className="text-sm font-medium text-destructive">{state.errors.location}</p>}
        </FormItem>
        
        <SubmitButton />
      </form>
    </Form>
  );
}
