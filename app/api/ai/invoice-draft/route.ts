import { NextRequest, NextResponse } from "next/server";
import { aiDraftRequestSchema } from "@/lib/validations/ai";
import { generateInvoiceDraftFromPrompt, checkRateLimit } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting check (per IP address or fallback)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous-client";

    const rateLimit = checkRateLimit(`ai-draft:${ip}`, 20, 60 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait before generating more invoice drafts.",
          retryAfter: rateLimit.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds || 60),
          },
        }
      );
    }

    // 2. Validate request body
    const body = await request.json().catch(() => null);
    const validationResult = aiDraftRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { prompt } = validationResult.data;

    // 3. Generate structured draft via OpenRouter
    const draft = await generateInvoiceDraftFromPrompt(prompt);

    return NextResponse.json(
      {
        success: true,
        data: draft,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in POST /api/ai/invoice-draft:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error occurred";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
