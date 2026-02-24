'use client';

import Link from 'next/link';
import {
  CircleUser,
  Menu,
  Mountain,
  LayoutDashboard,
  PlusCircle,
  List,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { currentUser } from '@/lib/data';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/report-issue', icon: PlusCircle, label: 'Report an Issue' },
    { href: '/my-reports', icon: List, label: 'My Reports' },
    { href: '/settings', icon: Settings, label: 'Settings' },
    { href: '/support', icon: LifeBuoy, label: 'Support' },
];

function BreadcrumbNav() {
    const pathname = usePathname();
    const currentNavItem = navItems.find(item => item.href === pathname);


    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {currentNavItem && currentNavItem.href !== '/dashboard' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentNavItem.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Mountain className="h-6 w-6 text-primary" />
              <span>FixMyCity</span>
            </Link>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                        {'bg-muted text-foreground': pathname === item.href}
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <BreadcrumbNav />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full" suppressHydrationWarning>
            {currentUser && currentUser.imageUrl ? (
              <Image
                src={currentUser.imageUrl}
                width={36}
                height={36}
                alt={currentUser.name}
                data-ai-hint={currentUser.imageHint}
                className="rounded-full"
              />
            ) : (
              <CircleUser className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/support">Support</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
