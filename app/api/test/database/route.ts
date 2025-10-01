import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // 1. 테스트 데이터 생성
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 기존 데이터 삭제 (테스트용)
    await prisma.dailyMetric.deleteMany({
      where: { date: today },
    });

    // 새 데이터 생성
    const metric = await prisma.dailyMetric.create({
      data: {
        date: today,
        tradingVolume: 1234567.89,
        tvl: 5678901.23,
        stakingAmount: 2345678.00,
        participantCount: 1234,
        luminaPrice: 0.123456,
        abnormalTx: false,
        notes: "테스트 데이터입니다.",
      },
    });

    // 2. 데이터 조회
    const allMetrics = await prisma.dailyMetric.findMany({
      orderBy: { date: "desc" },
      take: 5,
    });

    // 3. 카운트 확인
    const count = await prisma.dailyMetric.count();

    return NextResponse.json({
      success: true,
      message: "데이터베이스가 정상적으로 작동합니다!",
      data: {
        created: metric,
        totalRecords: count,
        recentMetrics: allMetrics,
      },
    });
  } catch (error: any) {
    console.error("데이터베이스 테스트 실패:", error);
    return NextResponse.json(
      {
        success: false,
        message: "데이터베이스 작업 중 오류가 발생했습니다.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
