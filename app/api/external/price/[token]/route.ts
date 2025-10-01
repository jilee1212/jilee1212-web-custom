import { NextRequest, NextResponse } from "next/server";
import { CoinGeckoAPI } from "@/lib/api/coingecko";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const coingecko = new CoinGeckoAPI();
    const price = await coingecko.getTokenPrice(token);

    return NextResponse.json(price);
  } catch (error) {
    console.error("Error fetching token price:", error);
    return NextResponse.json(
      { error: "Failed to fetch token price" },
      { status: 500 }
    );
  }
}
