import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Issue } from '@/lib/types';
import { IssueStatusBadge } from '@/components/issues/issue-status-badge';
import { IssueIcon } from '@/components/issues/issue-icon';
import { formatDistanceToNow } from 'date-fns';

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="w-full">
            <CardTitle className="text-base font-semibold leading-snug mb-1">{issue.title}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{`${issue.location.lat.toFixed(4)}, ${issue.location.lng.toFixed(4)}`}</span>
            </div>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Assign</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
            <Image
                src={issue.imageUrl}
                width={300}
                height={169}
                alt={issue.title}
                data-ai-hint={issue.imageHint}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <IssueIcon type={issue.type} className="h-4 w-4" />
                <IssueStatusBadge status={issue.status} severity={issue.severity} />
            </div>
            <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
