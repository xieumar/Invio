import { aiInvoiceDraftSchema, type AiInvoiceDraft } from "@/lib/validations/ai";

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openrouter/free";

const INVOICE_EXTRACTION_SYSTEM_PROMPT = `You are an expert AI invoicing assistant for Invio.
Your job is to parse natural language invoicing prompts into structured JSON invoices.

Rules:
1. Return ONLY valid JSON matching the specified schema. No markdown code blocks, no explanations.
2. clientName: The name of the client or company being billed.
3. clientEmail: The client's email address. If not specified in the prompt, generate a realistic professional email based on the client or company name (e.g. billing@acme.com or contact@client.com). NEVER leave this empty.
4. description: A clear 2-6 word summary of the work/project (e.g. "Frontend Development", "Brand Identity Package").
5. paymentTerms: One of [1, 7, 14, 30]. Default to 30 if unspecified or flexible.
6. items: Array of line items. Each item must have:
   - name: clear description of the service or product
   - quantity: number (integer or decimal >= 1)
   - price: unit price in standard currency units (e.g. 75.00 for $75/hour).
7. taxRate: Percentage number (e.g. 20 for 20% VAT/Tax) if mentioned or implied, otherwise 0.
8. discount: Total discount amount in standard currency units if mentioned, otherwise 0.
9. senderAddress: The billing sender address. If not mentioned in the prompt, default to:
   { "street": "19 Union Terrace", "city": "London", "postCode": "E1 3EZ", "country": "United Kingdom" }
10. clientAddress: Complete address for the client. If not fully specified in the prompt, generate realistic details (street, city, postCode, country) so that no address fields are left blank.
11. notes: Helpful payment remittance notes or terms.

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
  "senderAddress": {
    "street": string,
    "city": string,
    "postCode": string,
    "country": string
  },
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

  const parsed = extractJsonFromText(rawContent);

  // Validate strictly with Zod schema
  const validated = aiInvoiceDraftSchema.safeParse(parsed);
  if (!validated.success) {
    console.error(
      "Zod validation failed for AI draft:",
      validated.error.format(),
      "Parsed JSON was:",
      parsed
    );
    throw new Error(
      "The AI response did not conform to the expected invoice format."
    );
  }

  return validated.data;
}

/**
 * Extracts and parses a JSON object from text that may contain
 * markdown code blocks, reasoning tags (<think>...</think>), or extra preamble.
 */
function extractJsonFromText(rawText: string): unknown {
  // 1. Remove <think>...</think> reasoning blocks from reasoning models
  let text = rawText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // 2. Try direct JSON parse
  try {
    return JSON.parse(text);
  } catch {
    // Continue fallback strategies
  }

  // 3. Extract from markdown code blocks ```json ... ``` or ``` ... ```
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch {
      // Continue fallback
    }
  }

  // 4. Find outermost JSON object braces { ... }
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = text.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      // Failed to parse substring
    }
  }

  console.error("Unable to extract valid JSON from model response:", rawText);
  throw new Error("The AI model returned an invalid JSON response.");
}
