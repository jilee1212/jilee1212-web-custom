import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: 일일 메트릭 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "30");

    const metrics = await prisma.dailyMetric.findMany({
      orderBy: {
        date: "desc",
      },
      take: limit,
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error fetching daily metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily metrics" },
      { status: 500 }
    );
  }
}

// POST: 일일 메트릭 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const metric = await prisma.dailyMetric.create({
      data: {
        date: new Date(body.date),
        tradingVolume: body.tradingVolume,
        tvl: body.tvl,
        stakingAmount: body.stakingAmount,
        participantCount: body.participantCount,
        luminaPrice: body.luminaPrice,
        abnormalTx: body.abnormalTx || false,
        notes: body.notes,
      },
    });

    return NextResponse.json(metric, { status: 201 });
  } catch (error) {
    console.error("Error creating daily metric:", error);
    return NextResponse.json(
      { error: "Failed to create daily metric" },
      { status: 500 }
    );
  }
}
