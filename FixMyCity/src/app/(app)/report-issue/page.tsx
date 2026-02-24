import { ReportIssueForm } from '@/components/issues/report-issue-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ReportIssuePage() {
  return (
    <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Report a New Issue</CardTitle>
                <CardDescription>Fill out the form below to report a problem in your community. Please be as detailed as possible.</CardDescription>
            </CardHeader>
            <CardContent>
                <ReportIssueForm />
            </CardContent>
        </Card>
    </div>
  );
}
