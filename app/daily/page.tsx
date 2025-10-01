"use client";

import { useState } from "react";
import { Calendar, Save, Download } from "lucide-react";

export default function DailyPage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    tradingVolume: "",
    tvl: "",
    stakingAmount: "",
    participantCount: "",
    luminaPrice: "",
    abnormalTx: false,
    notes: "",
  });

  const [checklist, setChecklist] = useState({
    checkTradingVolume: false,
    checkTvl: false,
    checkStaking: false,
    checkPrice: false,
    checkAbnormalTx: false,
    checkCommunity: false,
    checkLpBalance: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("데이터가 저장되었습니다!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">일일 모니터링</h1>
        <p className="text-neutral-500 mt-1">일일 지표 데이터 입력 및 관리</p>
      </div>

      {/* Data Entry Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold">데이터 입력</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                날짜
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                24시간 거래량 (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.tradingVolume}
                onChange={(e) => setFormData({ ...formData, tradingVolume: e.target.value })}
                placeholder="1234567.89"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                TVL (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.tvl}
                onChange={(e) => setFormData({ ...formData, tvl: e.target.value })}
                placeholder="5678901.23"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                스테이킹량 (LUMINA)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.stakingAmount}
                onChange={(e) => setFormData({ ...formData, stakingAmount: e.target.value })}
                placeholder="2345678.00"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                참여자 수
              </label>
              <input
                type="number"
                value={formData.participantCount}
                onChange={(e) => setFormData({ ...formData, participantCount: e.target.value })}
                placeholder="1234"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                LUMINA 가격 (USD)
              </label>
              <input
                type="number"
                step="0.000001"
                value={formData.luminaPrice}
                onChange={(e) => setFormData({ ...formData, luminaPrice: e.target.value })}
                placeholder="0.123456"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.abnormalTx}
                onChange={(e) => setFormData({ ...formData, abnormalTx: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-neutral-700">이상 거래 감지됨</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              메모
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="특이사항이나 주요 이벤트를 기록하세요..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              저장
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              <Download className="w-4 h-4" />
              CSV 내보내기
            </button>
          </div>
        </form>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">일일 체크리스트</h2>
        <div className="space-y-3">
          {Object.entries(checklist).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setChecklist({ ...checklist, [key]: e.target.checked })}
                className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-neutral-700">
                {key === "checkTradingVolume" && "거래량 확인"}
                {key === "checkTvl" && "TVL 확인"}
                {key === "checkStaking" && "스테이킹 현황 확인"}
                {key === "checkPrice" && "가격 변동 확인"}
                {key === "checkAbnormalTx" && "이상 거래 검토"}
                {key === "checkCommunity" && "커뮤니티 피드백 확인"}
                {key === "checkLpBalance" && "LP 잔고 확인"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">최근 기록</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">날짜</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">거래량</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">TVL</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">가격</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">변화율</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 text-sm">2024-01-15</td>
                <td className="py-3 px-4 text-sm">$1,234,567</td>
                <td className="py-3 px-4 text-sm">$5,678,901</td>
                <td className="py-3 px-4 text-sm">$0.1234</td>
                <td className="py-3 px-4 text-sm text-success-600">+5.7%</td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 text-sm">2024-01-14</td>
                <td className="py-3 px-4 text-sm">$1,100,000</td>
                <td className="py-3 px-4 text-sm">$5,400,000</td>
                <td className="py-3 px-4 text-sm">$0.1167</td>
                <td className="py-3 px-4 text-sm text-danger-600">-2.3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
