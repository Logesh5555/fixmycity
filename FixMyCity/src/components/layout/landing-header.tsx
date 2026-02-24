import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mountain } from 'lucide-react';

export function LandingHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Mountain className="h-6 w-6 text-primary" />
        <span className="sr-only">FixMyCity</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" asChild>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </Button>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/signup" prefetch={false}>
            Sign Up
          </Link>
        </Button>
      </nav>
    </header>
  );
}
