import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Issue } from '@/lib/types';
import { ListChecks, AlertTriangle, Wrench, File } from 'lucide-react';

export function StatsCards({ issues }: { issues: Issue[] }) {
  const totalIssues = issues.length;
  const openIssues = issues.filter((i) => i.status === 'submitted').length;
  const inProgressIssues = issues.filter(
    (i) => i.status === 'in_progress'
  ).length;
  const resolvedIssues = issues.filter((i) => i.status === 'resolved').length;

  const stats = [
    { title: 'Total Reports', value: totalIssues, icon: File },
    { title: 'Open', value: openIssues, icon: AlertTriangle },
    { title: 'In Progress', value: inProgressIssues, icon: Wrench },
    { title: 'Resolved', value: resolvedIssues, icon: ListChecks },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
