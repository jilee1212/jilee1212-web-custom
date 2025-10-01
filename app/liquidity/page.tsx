"use client";

import { Droplet, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

const liquidityPairs = [
  {
    id: 1,
    pairName: "LUMINA/BNB",
    liquidityUsd: 1234567,
    volume24h: 456789,
    status: "충분",
    actionNeeded: null,
  },
  {
    id: 2,
    pairName: "LUMINA/BUSD",
    liquidityUsd: 987654,
    volume24h: 234567,
    status: "주의",
    actionNeeded: "유동성 추가 고려",
  },
  {
    id: 3,
    pairName: "LUMINA/USDT",
    liquidityUsd: 345678,
    volume24h: 123456,
    status: "긴급",
    actionNeeded: "즉시 유동성 추가 필요",
  },
];

const stakingPools = [
  {
    id: 1,
    poolName: "LUMINA Single Staking",
    totalStaked: 5678901,
    apy: 45.5,
    participants: 1234,
  },
  {
    id: 2,
    poolName: "LUMINA-BNB LP Staking",
    totalStaked: 3456789,
    apy: 78.3,
    participants: 567,
  },
];

export default function LiquidityPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "충분":
        return "bg-success-50 text-success-700 border-success-200";
      case "주의":
        return "bg-warning-50 text-warning-700 border-warning-200";
      case "긴급":
        return "bg-danger-50 text-danger-700 border-danger-200";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "충분":
        return <CheckCircle className="w-5 h-5" />;
      case "주의":
        return <AlertTriangle className="w-5 h-5" />;
      case "긴급":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">유동성 추적</h1>
        <p className="text-neutral-500 mt-1">유동성 페어 및 스테이킹 현황</p>
      </div>

      {/* Liquidity Pairs */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Droplet className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold">유동성 페어</h2>
        </div>

        <div className="space-y-4">
          {liquidityPairs.map((pair) => (
            <div
              key={pair.id}
              className={`border-2 rounded-lg p-4 ${getStatusColor(pair.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(pair.status)}
                    <h3 className="text-lg font-semibold">{pair.pairName}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm opacity-75">유동성</p>
                      <p className="text-lg font-semibold">
                        ${pair.liquidityUsd.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">24시간 거래량</p>
                      <p className="text-lg font-semibold">
                        ${pair.volume24h.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {pair.actionNeeded && (
                    <div className="mt-3 pt-3 border-t border-current opacity-50">
                      <p className="text-sm font-medium">⚠ {pair.actionNeeded}</p>
                    </div>
                  )}
                </div>

                <div className={`px-3 py-1 rounded-full text-sm font-medium border-2`}>
                  {pair.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staking Pools */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">스테이킹 풀</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stakingPools.map((pool) => (
            <div key={pool.id} className="border border-neutral-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {pool.poolName}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">총 스테이킹</span>
                  <span className="text-lg font-semibold text-neutral-900">
                    {pool.totalStaked.toLocaleString()} LUMINA
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">APY</span>
                  <span className="text-lg font-semibold text-success-600">
                    {pool.apy}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">참여자</span>
                  <span className="text-lg font-semibold text-neutral-900">
                    {pool.participants.toLocaleString()}명
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                상세 보기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">알림 설정</h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-neutral-900">유동성 부족 알림</p>
              <p className="text-sm text-neutral-500">유동성이 $500k 이하로 떨어지면 알림</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-neutral-900">거래량 급증 알림</p>
              <p className="text-sm text-neutral-500">24시간 거래량이 평균 대비 50% 이상 증가 시 알림</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
            <div>
              <p className="font-medium text-neutral-900">APY 변동 알림</p>
              <p className="text-sm text-neutral-500">APY가 10% 이상 변동 시 알림</p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
