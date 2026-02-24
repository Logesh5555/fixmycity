import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { LandingHeader } from '@/components/layout/landing-header';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Empower Your Community with FixMyCity
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Report civic issues, track their resolution, and help build a smarter, safer city. Our AI-powered platform makes it easy.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/login">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={600}
                  height={400}
                  alt="Hero"
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
