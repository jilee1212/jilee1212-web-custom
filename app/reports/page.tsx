"use client";

import { useState } from "react";
import { BarChart3, Download, Plus, ChevronDown, ChevronUp } from "lucide-react";

const weeklyReports = [
  {
    id: 1,
    weekNumber: 3,
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    totalVolume: 8765432,
    newUsers: 234,
    tvlChange: 12.5,
    stakingGrowth: 8.3,
    keyIssues: "• 거래량 급증 (신규 마케팅 캠페인 효과)\n• LP 유동성 부족 이슈 해결",
    nextWeekPlan: "• 새로운 스테이킹 풀 런칭\n• 파트너십 공지 예정",
  },
  {
    id: 2,
    weekNumber: 2,
    startDate: "2024-01-08",
    endDate: "2024-01-14",
    totalVolume: 7234567,
    newUsers: 189,
    tvlChange: 5.7,
    stakingGrowth: 4.2,
    keyIssues: "• 정상 운영\n• 소규모 버그 수정",
    nextWeekPlan: "• 마케팅 캠페인 시작\n• 커뮤니티 이벤트",
  },
];

export default function ReportsPage() {
  const [expandedReport, setExpandedReport] = useState<number | null>(1);

  const toggleReport = (id: number) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">주간 리포트</h1>
          <p className="text-neutral-500 mt-1">주간 성과 및 분석 리포트</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Plus className="w-4 h-4" />
          새 리포트 생성
        </button>
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {weeklyReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggleReport(report.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <BarChart3 className="w-6 h-6 text-primary-500" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Week {report.weekNumber} - {report.startDate} ~ {report.endDate}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    거래량: ${report.totalVolume.toLocaleString()} | 신규 사용자: {report.newUsers}명
                  </p>
                </div>
              </div>

              {expandedReport === report.id ? (
                <ChevronUp className="w-5 h-5 text-neutral-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-500" />
              )}
            </button>

            {/* Expanded Content */}
            {expandedReport === report.id && (
              <div className="px-6 pb-6 border-t border-neutral-200">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-sm text-primary-600 mb-1">총 거래량</p>
                    <p className="text-2xl font-bold text-primary-700">
                      ${(report.totalVolume / 1000000).toFixed(2)}M
                    </p>
                  </div>

                  <div className="bg-success-50 rounded-lg p-4">
                    <p className="text-sm text-success-600 mb-1">신규 사용자</p>
                    <p className="text-2xl font-bold text-success-700">
                      {report.newUsers}
                    </p>
                  </div>

                  <div className="bg-warning-50 rounded-lg p-4">
                    <p className="text-sm text-warning-600 mb-1">TVL 변화</p>
                    <p className="text-2xl font-bold text-warning-700">
                      +{report.tvlChange}%
                    </p>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-sm text-primary-600 mb-1">스테이킹 성장</p>
                    <p className="text-2xl font-bold text-primary-700">
                      +{report.stakingGrowth}%
                    </p>
                  </div>
                </div>

                {/* Key Issues */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                    주요 이슈
                  </h4>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <pre className="text-sm text-neutral-700 whitespace-pre-wrap font-sans">
                      {report.keyIssues}
                    </pre>
                  </div>
                </div>

                {/* Next Week Plan */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                    다음 주 계획
                  </h4>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <pre className="text-sm text-primary-700 whitespace-pre-wrap font-sans">
                      {report.nextWeekPlan}
                    </pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                    <Download className="w-4 h-4" />
                    PDF 다운로드
                  </button>

                  <button className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors">
                    수정
                  </button>

                  <button className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors">
                    공유
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">주간 비교</h2>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">거래량</span>
              <span className="text-sm font-medium text-neutral-900">
                Week 3: ${(weeklyReports[0].totalVolume / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-600">거래량</span>
              <span className="text-sm font-medium text-neutral-900">
                Week 2: ${(weeklyReports[1].totalVolume / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-400"
                style={{
                  width: `${(weeklyReports[1].totalVolume / weeklyReports[0].totalVolume) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
