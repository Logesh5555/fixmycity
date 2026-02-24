import { Badge } from '@/components/ui/badge';
import type { Issue } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusStyles: Record<Issue['status'], string> = {
  submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
};

const severityStyles: Record<Issue['severity'], string> = {
    low: 'border-green-500/50',
    medium: 'border-yellow-500/50',
    high: 'border-red-500/50',
}

export function IssueStatusBadge({ status, severity }: { status: Issue['status'], severity: Issue['severity'] }) {
    const text = status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <Badge variant="outline" className={cn("capitalize border-2", statusStyles[status], severityStyles[severity])}>
            {text}
        </Badge>
    );
}
