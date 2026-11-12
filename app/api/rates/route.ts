import { NextRequest, NextResponse } from "next/server";

const RATES_URL = "https://open.er-api.com/v6/latest";

export async function GET(request: NextRequest) {
  const base = request.nextUrl.searchParams.get("base")?.toUpperCase() ?? "";

  if (!/^[A-Z]{3}$/.test(base)) {
    return NextResponse.json(
      { error: "Invalid base currency code" },
      { status: 400 }
    );
  }

  try {
    // The provider updates once a day and rate-limits per IP, so cache upstream.
    const res = await fetch(`${RATES_URL}/${base}`, {
      next: { revalidate: 60 * 60 },
    });
    if (!res.ok) throw new Error(`Rates provider returned ${res.status}`);

    const data = await res.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("Rates provider returned an unexpected response");
    }

    return NextResponse.json({
      base,
      rates: data.rates as Record<string, number>,
      updatedAt: data.time_last_update_utc as string,
    });
  } catch (error) {
    console.warn("Failed to fetch exchange rates:", error);
    return NextResponse.json(
      { error: "Exchange rates are temporarily unavailable" },
      { status: 502 }
    );
  }
}
