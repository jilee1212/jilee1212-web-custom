import { NextResponse } from "next/server";
import { DexScreenerAPI } from "@/lib/api/dexscreener";

export async function GET() {
  try {
    const dexscreener = new DexScreenerAPI();

    // 테스트용 토큰 주소 (CAKE)
    const testTokenAddress = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";

    const pairs = await dexscreener.getTokenPairs(testTokenAddress);

    return NextResponse.json({
      success: true,
      message: "DexScreener API가 정상적으로 작동합니다!",
      data: {
        tokenAddress: testTokenAddress,
        pairsFound: pairs.length,
        firstPair: pairs[0] ? {
          pairAddress: pairs[0].pairAddress,
          baseToken: pairs[0].baseToken.symbol,
          quoteToken: pairs[0].quoteToken.symbol,
          priceUsd: pairs[0].priceUsd,
          liquidity: pairs[0].liquidity.usd,
        } : null,
      },
    });
  } catch (error: any) {
    console.error("DexScreener API 테스트 실패:", error);
    return NextResponse.json(
      {
        success: false,
        message: "DexScreener API 호출 중 오류가 발생했습니다.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
