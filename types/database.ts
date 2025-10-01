export interface FinancialRecord {
  id: number;
  date: Date;
  type: "revenue" | "expense";
  category?: string;
  amount: number;
  description?: string;
  createdAt: Date;
}

export interface LiquidityPair {
  id: number;
  date: Date;
  pairName?: string;
  liquidityUsd?: number;
  volume24h?: number;
  status?: "충분" | "주의" | "긴급";
  actionNeeded?: string;
  createdAt: Date;
}

export interface Issue {
  id: number;
  date: Date;
  type?: string;
  severity?: "긴급" | "높음" | "보통" | "낮음";
  description?: string;
  actionTaken?: string;
  assignee?: string;
  status?: "발견" | "조사중" | "해결중" | "완료";
  resolvedAt?: Date;
  createdAt: Date;
}

export interface WeeklyReport {
  id: number;
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  totalVolume?: number;
  newUsers?: number;
  tvlChange?: number;
  stakingGrowth?: number;
  keyIssues?: string;
  nextWeekPlan?: string;
  createdAt: Date;
}
