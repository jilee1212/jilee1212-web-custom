import MetricCard from "@/components/dashboard/MetricCard";
import ChartCard from "@/components/dashboard/ChartCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { TrendingUp, Droplet, Wallet, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">대시보드</h1>
        <p className="text-neutral-500 mt-1">LUMINA DEX 운영 현황</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="24시간 거래량"
          value="$1,234,567"
          change={12.5}
          icon={<TrendingUp className="w-6 h-6" />}
          color="primary"
        />
        <MetricCard
          title="Total TVL"
          value="$5,678,901"
          change={8.3}
          icon={<Droplet className="w-6 h-6" />}
          color="success"
        />
        <MetricCard
          title="스테이킹량"
          value="2,345,678 LUMINA"
          change={-2.1}
          icon={<Wallet className="w-6 h-6" />}
          color="warning"
        />
        <MetricCard
          title="LUMINA 가격"
          value="$0.1234"
          change={5.7}
          icon={<DollarSign className="w-6 h-6" />}
          color="primary"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="7일 거래량 추이" />
        <ChartCard title="TVL 추이" />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Issues */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">최근 이슈</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-danger-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-danger-700">긴급</span>
              <p className="text-neutral-900 mt-1">유동성 부족 경고 - LUMINA/BNB</p>
            </div>
            <span className="text-sm text-neutral-500">2시간 전</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-warning-700">주의</span>
              <p className="text-neutral-900 mt-1">가격 급등 감지 (+15%)</p>
            </div>
            <span className="text-sm text-neutral-500">5시간 전</span>
          </div>
        </div>
      </div>
    </div>
  );
}
