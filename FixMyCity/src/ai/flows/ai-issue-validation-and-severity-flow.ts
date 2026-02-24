'use server';
/**
 * @fileOverview This file defines a Genkit flow for AI-powered issue validation and severity suggestion.
 *
 * - validateAndSuggestSeverity - A function that handles the AI analysis of submitted issues.
 * - IssueValidationAndSeverityInput - The input type for the validateAndSuggestSeverity function.
 * - IssueValidationAndSeverityOutput - The return type for the validateAndSuggestSeverity function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IssueValidationAndSeverityInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the infrastructure issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .describe(
      'A detailed description of the observed infrastructure issue, including any relevant context.'
    ),
});
export type IssueValidationAndSeverityInput = z.infer<
  typeof IssueValidationAndSeverityInputSchema
>;

const IssueValidationAndSeverityOutputSchema = z.object({
  isValid: z
    .boolean()
    .describe(
      'True if the uploaded image and description are relevant to an infrastructure problem, false otherwise.'
    ),
  severity: z
    .union([z.literal('low'), z.literal('medium'), z.literal('high')])
    .describe(
      "The suggested initial severity level for the issue based on its nature. 'low' for minor issues, 'medium' for significant but not critical, 'high' for urgent and critical problems."
    ),
  issueType: z
    .string()
    .describe(
      "The categorized type of the infrastructure issue (e.g., 'pothole', 'street light out', 'drainage problem', 'waste accumulation', 'damaged road', 'other')."
    ),
  reasoning: z
    .string()
    .describe('Brief explanation for the validation, severity, and issue type determination.')
});
export type IssueValidationAndSeverityOutput = z.infer<
  typeof IssueValidationAndSeverityOutputSchema
>;

export async function validateAndSuggestSeverity(
  input: IssueValidationAndSeverityInput
): Promise<IssueValidationAndSeverityOutput> {
  return aiIssueValidationAndSeverityFlow(input);
}

const issueAnalysisPrompt = ai.definePrompt({
  name: 'issueAnalysisPrompt',
  input: { schema: IssueValidationAndSeverityInputSchema },
  output: { schema: IssueValidationAndSeverityOutputSchema },
  prompt: `You are an expert civic infrastructure analyst. Your task is to evaluate submitted reports from citizens, which include an image and a description, to determine if they are relevant infrastructure problems, categorize the issue, and suggest an initial severity level.

Instructions:
1.  **Relevance Validation (isValid):** Determine if the provided image and description are clearly related to an infrastructure issue (e.g., a pothole, a broken street light, waste, damaged road, drainage problem). If it's not clearly an infrastructure issue (e.g., a personal photo, a non-related object, or unclear), set 'isValid' to false. Otherwise, set it to true.
2.  **Severity Suggestion (severity):** If 'isValid' is true, assign an initial severity level: 'low' for minor issues, 'medium' for significant but not immediately critical problems, and 'high' for urgent issues that require immediate attention (e.g., large dangerous potholes, severe flooding risk, completely non-functional street light in a dark area).
3.  **Issue Categorization (issueType):** If 'isValid' is true, categorize the issue into one of the following types: 'pothole', 'street light out', 'drainage problem', 'waste accumulation', 'damaged road', or 'other'. Choose 'other' if none of the specific categories fit well.
4.  **Reasoning (reasoning):** Provide a brief, concise explanation for your determinations regarding 'isValid', 'severity', and 'issueType'.

Here is the report:
Description: {{{description}}}
Photo: {{media url=photoDataUri}}`,
});

const aiIssueValidationAndSeverityFlow = ai.defineFlow(
  {
    name: 'aiIssueValidationAndSeverityFlow',
    inputSchema: IssueValidationAndSeverityInputSchema,
    outputSchema: IssueValidationAndSeverityOutputSchema,
  },
  async (input) => {
    const { output } = await issueAnalysisPrompt(input);
    if (!output) {
      throw new Error('AI analysis failed to produce output.');
    }
    return output;
  }
);
