import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const wallets = await prisma.walletInfo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(wallets);
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const wallet = await prisma.walletInfo.create({
      data: {
        name: data.name,
        address: data.address,
        type: data.type,
        purpose: data.purpose,
        network: data.network || "BSC",
        isActive: data.isActive ?? true,
        notes: data.notes,
      },
    });
    return NextResponse.json(wallet, { status: 201 });
  } catch (error) {
    console.error("Error creating wallet:", error);
    return NextResponse.json(
      { error: "Failed to create wallet" },
      { status: 500 }
    );
  }
}
