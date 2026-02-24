import { Mountain } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-headline">FixMyCity</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
