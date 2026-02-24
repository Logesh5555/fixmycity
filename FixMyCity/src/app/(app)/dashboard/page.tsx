import { issues } from '@/lib/data';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { IssueFilters } from '@/components/dashboard/issue-filters';
import { IssueCard } from '@/components/dashboard/issue-card';
import type { Issue } from '@/lib/types';

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    status?: string;
    severity?: string;
    type?: string;
  };
}) {
  const filteredIssues = issues.filter((issue) => {
    return (
      (!searchParams?.status || issue.status === searchParams.status) &&
      (!searchParams?.severity || issue.severity === searchParams.severity) &&
      (!searchParams?.type || issue.type === searchParams.type)
    );
  });

  return (
    <div className="flex flex-1 flex-col">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of all reported civic issues.
        </p>
      </header>
      <div className="mt-4">
        <StatsCards issues={issues} />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">All Reports</h2>
            <IssueFilters />
        </div>
        
        {filteredIssues.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue as Issue} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm h-[400px]">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">No issues found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
