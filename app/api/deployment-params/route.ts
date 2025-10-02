import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const params = await prisma.deploymentParameter.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(params);
  } catch (error) {
    console.error("Error fetching deployment parameters:", error);
    return NextResponse.json(
      { error: "Failed to fetch deployment parameters" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const param = await prisma.deploymentParameter.create({
      data: {
        contractInfoId: data.contractInfoId,
        parameterName: data.parameterName,
        parameterValue: data.parameterValue,
        description: data.description,
        category: data.category,
      },
    });
    return NextResponse.json(param, { status: 201 });
  } catch (error) {
    console.error("Error creating deployment parameter:", error);
    return NextResponse.json(
      { error: "Failed to create deployment parameter" },
      { status: 500 }
    );
  }
}
