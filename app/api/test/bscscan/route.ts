import { NextResponse } from "next/server";
import { BSCScanAPI } from "@/lib/api/bscscan";

export async function GET() {
  try {
    const apiKey = process.env.BSCSCAN_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "BSCSCAN_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.",
        },
        { status: 400 }
      );
    }

    const bscscan = new BSCScanAPI(apiKey);

    // 테스트용 주소 (PancakeSwap Router)
    const testAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

    const balance = await bscscan.getContractBalance(testAddress);

    return NextResponse.json({
      success: true,
      message: "BSCScan API가 정상적으로 작동합니다!",
      data: {
        apiKey: `${apiKey.substring(0, 8)}...`,
        testAddress,
        balance,
      },
    });
  } catch (error: any) {
    console.error("BSCScan API 테스트 실패:", error);
    return NextResponse.json(
      {
        success: false,
        message: "BSCScan API 호출 중 오류가 발생했습니다.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
