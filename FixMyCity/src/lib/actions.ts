'use server';

import { z } from 'zod';
import { validateAndSuggestSeverity } from '@/ai/flows/ai-issue-validation-and-severity-flow';
import { revalidatePath } from 'next/cache';

const ReportIssueSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  photoDataUri: z.string().startsWith('data:image', 'Invalid image format.'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type ReportIssueState = {
  message?: string | null;
  errors?: {
    description?: string[];
    photoDataUri?: string[];
    location?: string[];
    ai?: string;
  };
};

export async function reportIssue(
  prevState: ReportIssueState,
  formData: FormData,
): Promise<ReportIssueState> {
  const validatedFields = ReportIssueSchema.safeParse({
    description: formData.get('description'),
    photoDataUri: formData.get('photoDataUri'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to report issue. Please check the fields.',
    };
  }

  const { description, photoDataUri, latitude, longitude } = validatedFields.data;

  if (!latitude || !longitude) {
    return {
      errors: { location: ['Location is required. Please click "Get Current Location".'] },
      message: 'Location is missing.',
    }
  }

  try {
    const aiResult = await validateAndSuggestSeverity({
        description,
        photoDataUri
    });

    if (!aiResult.isValid) {
        return {
            errors: { ai: aiResult.reasoning || "AI validation failed: The submitted image or description does not seem to be a valid civic issue." },
            message: aiResult.reasoning || "AI validation failed: The submitted image or description does not seem to be a valid civic issue.",
        }
    }

    // Here you would typically save the issue to a database
    console.log('AI Analysis:', aiResult);
    console.log('Issue to save:', {
      description,
      location: { lat: latitude, lng: longitude },
      ...aiResult,
    });
    
    // Invalidate cache for dashboard and my-reports to show new data
    revalidatePath('/dashboard');
    revalidatePath('/my-reports');

    return { message: `Successfully reported issue. AI classified it as a "${aiResult.issueType}" with ${aiResult.severity} severity.` };

  } catch (error) {
    console.error('Error reporting issue:', error);
    return {
      message: 'An unexpected error occurred while analyzing the issue. Please try again.',
      errors: { ai: 'An unexpected error occurred.'}
    };
  }
}
