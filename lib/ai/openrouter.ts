import { aiInvoiceDraftSchema, type AiInvoiceDraft } from "@/lib/validations/ai";

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openrouter/free";

const INVOICE_EXTRACTION_SYSTEM_PROMPT = `You are an expert AI invoicing assistant for Invio.
Your job is to parse natural language invoicing prompts into structured JSON invoices.

Rules:
1. Return ONLY valid JSON matching the specified schema. No markdown code blocks, no explanations.
2. clientName: The name of the client or company being billed. If unspecified, leave as empty string.
3. description: A clear 2-6 word summary of the work/project (e.g. "Brand Identity Design", "Fullstack Web App Development").
4. paymentTerms: One of [1, 7, 14, 30]. Default to 30 if unspecified or flexible.
5. items: Array of line items. Each item must have:
   - name: clear description of the service or product
   - quantity: number (integer or decimal >= 1)
   - price: unit price in standard currency units (e.g. 50.00 for $50/hour). Never use cents/minor units.
6. taxRate: Percentage number (e.g. 20 for 20% VAT/Tax) if mentioned or implied, otherwise 0.
7. discount: Total discount amount in standard currency units if mentioned, otherwise 0.
8. clientAddress: { street: "", city: "", postCode: "", country: "" } if mentioned, otherwise empty strings.
9. notes: Optional extra terms or notes mentioned.

JSON Output Schema:
{
  "clientName": string,
  "clientEmail": string,
  "description": string,
  "paymentTerms": 1 | 7 | 14 | 30,
  "items": [
    { "name": string, "quantity": number, "price": number }
  ],
  "taxRate": number,
  "discount": number,
  "clientAddress": {
    "street": string,
    "city": string,
    "postCode": string,
    "country": string
  },
  "notes": string
}`;

export async function generateInvoiceDraftFromPrompt(
  prompt: string
): Promise<AiInvoiceDraft> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not configured on the server. Please check your environment variables."
    );
  }

  const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "Invio Invoice Assistant",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: INVOICE_EXTRACTION_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorDetail = response.statusText;
    try {
      const errJson = JSON.parse(errorBody);
      errorDetail = errJson?.error?.message || response.statusText;
    } catch {
      errorDetail = errorBody || response.statusText;
    }
    console.error("OpenRouter API error:", response.status, errorDetail);
    throw new Error(`OpenRouter request failed (${response.status}): ${errorDetail}`);
  }

  const json = await response.json();
  const rawContent = json?.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("No response content received from OpenRouter.");
  }

  // Handle possible markdown formatting (e.g. ```json ... ```)
  const cleaned = rawContent
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse OpenRouter response as JSON:", rawContent, err);
    throw new Error("The AI model returned an invalid JSON response.");
  }

  // Validate strictly with Zod schema
  const validated = aiInvoiceDraftSchema.safeParse(parsed);
  if (!validated.success) {
    console.error("Zod validation failed for AI draft:", validated.error.format());
    throw new Error("The AI response did not conform to the expected invoice format.");
  }

  return validated.data;
}
