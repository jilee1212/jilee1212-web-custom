import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: 이슈 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");

    const where: any = {};
    if (status) where.status = status;
    if (severity) where.severity = severity;

    const issues = await prisma.issue.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

// POST: 이슈 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const issue = await prisma.issue.create({
      data: {
        date: new Date(body.date),
        type: body.type,
        severity: body.severity,
        description: body.description,
        actionTaken: body.actionTaken,
        assignee: body.assignee,
        status: body.status || "발견",
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}
