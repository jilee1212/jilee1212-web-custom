import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const wallet = await prisma.walletInfo.update({
      where: { id: parseInt(params.id) },
      data: {
        name: data.name,
        address: data.address,
        type: data.type,
        purpose: data.purpose,
        network: data.network,
        isActive: data.isActive,
        notes: data.notes,
      },
    });
    return NextResponse.json(wallet);
  } catch (error) {
    console.error("Error updating wallet:", error);
    return NextResponse.json(
      { error: "Failed to update wallet" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.walletInfo.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wallet:", error);
    return NextResponse.json(
      { error: "Failed to delete wallet" },
      { status: 500 }
    );
  }
}
