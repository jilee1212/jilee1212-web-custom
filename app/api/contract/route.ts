import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: 컨트랙트 정보 조회
export async function GET() {
  try {
    const contracts = await prisma.contractInfo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contracts);
  } catch (error) {
    console.error("Error fetching contract info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contract info" },
      { status: 500 }
    );
  }
}

// POST: 새 컨트랙트 정보 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const contract = await prisma.contractInfo.create({
      data: {
        name: body.name,
        contractType: body.contractType,
        contractAddress: body.contractAddress,
        network: body.network || "BSC",
        deployedAt: body.deployedAt ? new Date(body.deployedAt) : null,
        bscscanUrl: body.bscscanUrl,
        rewardPerBlock: body.rewardPerBlock,
        bonusEndBlock: body.bonusEndBlock ? BigInt(body.bonusEndBlock) : null,
        depositFee: body.depositFee || 0,
        poolLimitPerUser: body.poolLimitPerUser ? BigInt(body.poolLimitPerUser) : BigInt(0),
        adminWallet: body.adminWallet,
        isVerified: body.isVerified ?? false,
        notes: body.notes,
      },
    });

    return NextResponse.json(contract, { status: 201 });
  } catch (error) {
    console.error("Error creating contract info:", error);
    return NextResponse.json(
      { error: "Failed to create contract info" },
      { status: 500 }
    );
  }
}

// PUT: 컨트랙트 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Contract ID is required" },
        { status: 400 }
      );
    }

    const contract = await prisma.contractInfo.update({
      where: { id: body.id },
      data: {
        name: body.name,
        contractType: body.contractType,
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
        notes: body.notes,
      },
    });

    return NextResponse.json(contract);
  } catch (error) {
    console.error("Error updating contract info:", error);
    return NextResponse.json(
      { error: "Failed to update contract info" },
      { status: 500 }
    );
  }
}
