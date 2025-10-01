export interface DailyMetric {
  id: number;
  date: Date;
  tradingVolume?: number;
  tvl?: number;
  stakingAmount?: number;
  participantCount?: number;
  luminaPrice?: number;
  abnormalTx: boolean;
  notes?: string;
  createdAt: Date;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: "primary" | "success" | "warning" | "danger";
}
