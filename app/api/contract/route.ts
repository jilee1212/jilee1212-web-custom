import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: 컨트랙트 정보 조회
export async function GET() {
  try {
    const contract = await prisma.contractInfo.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(contract);
  } catch (error) {
    console.error("Error fetching contract info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contract info" },
      { status: 500 }
    );
  }
}

// PUT: 컨트랙트 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 기존 컨트랙트 정보가 있는지 확인
    const existing = await prisma.contractInfo.findFirst();

    let contract;
    if (existing) {
      contract = await prisma.contractInfo.update({
        where: { id: existing.id },
        data: {
          contractAddress: body.contractAddress,
          network: body.network,
          deployedAt: body.deployedAt ? new Date(body.deployedAt) : null,
          bscscanUrl: body.bscscanUrl,
          rewardPerBlock: body.rewardPerBlock,
          bonusEndBlock: body.bonusEndBlock ? BigInt(body.bonusEndBlock) : null,
          depositFee: body.depositFee,
          poolLimitPerUser: body.poolLimitPerUser ? BigInt(body.poolLimitPerUser) : BigInt(0),
          adminWallet: body.adminWallet,
          isVerified: body.isVerified,
        },
      });
    } else {
      contract = await prisma.contractInfo.create({
        data: {
          contractAddress: body.contractAddress,
          network: body.network,
          deployedAt: body.deployedAt ? new Date(body.deployedAt) : null,
          bscscanUrl: body.bscscanUrl,
          rewardPerBlock: body.rewardPerBlock,
          bonusEndBlock: body.bonusEndBlock ? BigInt(body.bonusEndBlock) : null,
          depositFee: body.depositFee,
          poolLimitPerUser: body.poolLimitPerUser ? BigInt(body.poolLimitPerUser) : BigInt(0),
          adminWallet: body.adminWallet,
          isVerified: body.isVerified,
        },
      });
    }

    return NextResponse.json(contract);
  } catch (error) {
    console.error("Error updating contract info:", error);
    return NextResponse.json(
      { error: "Failed to update contract info" },
      { status: 500 }
    );
  }
}
