import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I report a new issue?",
      answer:
        "To report a new issue, navigate to the 'Report an Issue' page from the sidebar. Fill in the required details, including a description, photo, and location, then submit the form. Our AI system will analyze your report for validity and severity.",
    },
    {
      question: "How can I track the status of my reported issues?",
      answer:
        "You can view all the issues you have reported on the 'My Reports' page. This page will show you the current status of each issue, such as 'Submitted', 'In Progress', or 'Resolved'.",
    },
    {
      question: "What do the different severity levels mean?",
      answer:
        "'Low' severity is for minor issues. 'Medium' is for issues that need attention but are not critical. 'High' severity is for issues that pose a safety risk or significant disruption and require prompt attention.",
    },
    {
      question: "Can I edit a report after submitting it?",
      answer:
        "Currently, editing a submitted report is not supported. Please ensure all information is accurate before submission. If you need to add more information, you can submit a new report with the updated details.",
    },
    {
      question: "Who can see the issues I report?",
      answer:
        "All submitted and validated issues are visible on the main dashboard to all users of the platform. This transparency helps the community and city officials track and prioritize repairs.",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">
          Frequently asked questions and support information.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about using FixMyCity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
