'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function IssueFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (filterName: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value || value === 'all') {
      current.delete(filterName);
    } else {
      current.set(filterName, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={(value) => handleFilterChange('status', value)} defaultValue={searchParams.get('status') || 'all'}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="submitted">Submitted</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleFilterChange('severity', value)} defaultValue={searchParams.get('severity') || 'all'}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
