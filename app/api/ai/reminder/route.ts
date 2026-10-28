import { NextRequest, NextResponse } from "next/server";
import { aiReminderRequestSchema } from "@/lib/validations/ai";
import { generatePaymentReminder, checkRateLimit } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous-client";

    const rateLimit = checkRateLimit(`ai-reminder:${ip}`, 30, 60 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait before generating another payment reminder.",
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

    const body = await request.json().catch(() => null);
    const validationResult = aiReminderRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const reminder = await generatePaymentReminder(validationResult.data);

    return NextResponse.json(
      {
        success: true,
        data: reminder,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in POST /api/ai/reminder:", error);
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
