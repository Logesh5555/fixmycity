import { issues, currentUser } from '@/lib/data';
import { IssueCard } from '@/components/dashboard/issue-card';
import type { Issue } from '@/lib/types';

export default function MyReportsPage() {
  const userIssues = issues.filter(
    (issue) => issue.reporterId === currentUser.id
  );

  return (
    <div className="flex flex-1 flex-col">
       <header>
        <h1 className="text-2xl font-bold tracking-tight">My Reports</h1>
        <p className="text-muted-foreground">
          Track the status of all your submitted issues.
        </p>
      </header>
      <div className="mt-6">
        {userIssues.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue as Issue} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm h-[400px]">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">You haven't reported any issues yet</h3>
                <p className="text-sm text-muted-foreground">Report an issue to see it here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
