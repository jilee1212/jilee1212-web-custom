import { NextResponse } from "next/server";
import { CoinGeckoAPI } from "@/lib/api/coingecko";

export async function GET() {
  try {
    const coingecko = new CoinGeckoAPI();

    // BNB 가격 테스트
    const bnbPrice = await coingecko.getBNBPrice();

    return NextResponse.json({
      success: true,
      message: "CoinGecko API가 정상적으로 작동합니다!",
      data: {
        bnbPrice,
        hasApiKey: !!process.env.COINGECKO_API_KEY,
      },
    });
  } catch (error: any) {
    console.error("CoinGecko API 테스트 실패:", error);
    return NextResponse.json(
      {
        success: false,
        message: "CoinGecko API 호출 중 오류가 발생했습니다.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
