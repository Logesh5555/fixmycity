'use server';
/**
 * @fileOverview This file defines a Genkit flow for AI-powered categorization of civic infrastructure issues.
 *
 * - aiIssueCategorization - A function that categorizes and refines reported infrastructure issues.
 * - AiIssueCategorizationInput - The input type for the aiIssueCategorization function.
 * - AiIssueCategorizationOutput - The return type for the aiIssueCategorization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiIssueCategorizationInputSchema = z.object({
  description: z.string().describe('A detailed description of the infrastructure issue.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the infrastructure issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiIssueCategorizationInput = z.infer<typeof AiIssueCategorizationInputSchema>;

const AiIssueCategorizationOutputSchema = z.object({
  issueType: z.enum(['pothole', 'damaged road', 'street light out', 'drainage problem', 'waste accumulation', 'signage issue', 'other'])
    .describe('The categorized type of the infrastructure issue.'),
  refinedDescription: z.string()
    .describe('A refined and standardized description of the issue based on the input.'),
  severity: z.enum(['low', 'medium', 'high', 'critical'])
    .describe('The initial severity level of the issue (e.g., low, medium, high, critical).'),
  imageValid: z.boolean()
    .describe('True if the uploaded image is relevant to an infrastructure issue, false otherwise.'),
  rejectionReason: z.string().optional()
    .describe('If imageValid is false, provide a reason why the image is not relevant to the issue.'),
});
export type AiIssueCategorizationOutput = z.infer<typeof AiIssueCategorizationOutputSchema>;

const aiIssueCategorizationPrompt = ai.definePrompt({
  name: 'aiIssueCategorizationPrompt',
  input: { schema: AiIssueCategorizationInputSchema },
  output: { schema: AiIssueCategorizationOutputSchema },
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert AI assistant for categorizing infrastructure issues from citizen reports. Your task is to analyze the provided description and image, then categorize the issue, refine its description for clarity and standardization, assign an initial severity, and determine if the image is relevant to an infrastructure issue.

**Categorization Rules:**
- Use one of the following predefined categories: 'pothole', 'damaged road', 'street light out', 'drainage problem', 'waste accumulation', 'signage issue', 'other'.
- If the issue does not fit neatly into these categories, use 'other'.

**Description Refinement Rules:**
- Standardize the language.
- Ensure all critical details from the original description are included concisely.
- Avoid informal language.

**Severity Assessment Rules:**
- 'low': Minor inconvenience, no immediate danger, e.g., small cosmetic damage.
- 'medium': Moderate inconvenience, potential for future issues, e.g., moderate pothole, flickering street light.
- 'high': Significant inconvenience or safety risk, requires prompt attention, e.g., large deep pothole, completely broken street light, significant debris.
- 'critical': Immediate danger, requires urgent intervention, e.g., collapsed road section, major flooding due to drainage, hazardous waste.

**Image Validation Rules:**
- Determine if the image genuinely depicts an infrastructure issue.
- If the image is not relevant (e.g., a selfie, a pet, a blurry picture unrelated to infrastructure), set 'imageValid' to false and provide a brief 'rejectionReason'.

---

**User Input:**
Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Please provide your analysis strictly in the JSON format as described by the output schema, ensuring all fields are populated correctly.`,
});

const aiIssueCategorizationFlow = ai.defineFlow(
  {
    name: 'aiIssueCategorizationFlow',
    inputSchema: AiIssueCategorizationInputSchema,
    outputSchema: AiIssueCategorizationOutputSchema,
  },
  async (input) => {
    const { output } = await aiIssueCategorizationPrompt(input);
    // The output is guaranteed to conform to AiIssueCategorizationOutputSchema due to the prompt definition.
    return output!;
  }
);

export async function aiIssueCategorization(input: AiIssueCategorizationInput): Promise<AiIssueCategorizationOutput> {
  return aiIssueCategorizationFlow(input);
}
