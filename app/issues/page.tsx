"use client";

import { useState } from "react";
import { AlertCircle, Plus, Filter } from "lucide-react";

type IssueStatus = "발견" | "조사중" | "해결중" | "완료";
type IssueSeverity = "긴급" | "높음" | "보통" | "낮음";

interface Issue {
  id: number;
  date: string;
  type: string;
  severity: IssueSeverity;
  description: string;
  actionTaken: string;
  assignee: string;
  status: IssueStatus;
}

const mockIssues: Issue[] = [
  {
    id: 1,
    date: "2024-01-15",
    type: "보안",
    severity: "긴급",
    description: "비정상적인 대량 거래 감지",
    actionTaken: "거래 일시 중지 및 조사 진행 중",
    assignee: "보안팀",
    status: "조사중",
  },
  {
    id: 2,
    date: "2024-01-14",
    type: "버그",
    severity: "높음",
    description: "스테이킹 보상 계산 오류",
    actionTaken: "긴급 패치 배포 완료",
    assignee: "개발팀",
    status: "완료",
  },
  {
    id: 3,
    date: "2024-01-13",
    type: "유동성",
    severity: "보통",
    description: "LUMINA/USDT 페어 유동성 부족",
    actionTaken: "유동성 공급 인센티브 계획 수립",
    assignee: "운영팀",
    status: "해결중",
  },
  {
    id: 4,
    date: "2024-01-12",
    type: "UI/UX",
    severity: "낮음",
    description: "모바일 화면 레이아웃 깨짐",
    actionTaken: "수정 완료 및 배포",
    assignee: "프론트엔드팀",
    status: "완료",
  },
];

export default function IssuesPage() {
  const [issues] = useState<Issue[]>(mockIssues);
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | "전체">("전체");
  const [selectedSeverity, setSelectedSeverity] = useState<IssueSeverity | "전체">("전체");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredIssues = issues.filter((issue) => {
    const statusMatch = selectedStatus === "전체" || issue.status === selectedStatus;
    const severityMatch = selectedSeverity === "전체" || issue.severity === selectedSeverity;
    return statusMatch && severityMatch;
  });

  const getSeverityColor = (severity: IssueSeverity) => {
    switch (severity) {
      case "긴급":
        return "bg-danger-50 text-danger-700 border-danger-200";
      case "높음":
        return "bg-warning-50 text-warning-700 border-warning-200";
      case "보통":
        return "bg-primary-50 text-primary-700 border-primary-200";
      case "낮음":
        return "bg-neutral-100 text-neutral-700 border-neutral-300";
    }
  };

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case "발견":
        return "bg-danger-100 text-danger-700";
      case "조사중":
        return "bg-warning-100 text-warning-700";
      case "해결중":
        return "bg-primary-100 text-primary-700";
      case "완료":
        return "bg-success-100 text-success-700";
    }
  };

  const statusCount = {
    발견: issues.filter((i) => i.status === "발견").length,
    조사중: issues.filter((i) => i.status === "조사중").length,
    해결중: issues.filter((i) => i.status === "해결중").length,
    완료: issues.filter((i) => i.status === "완료").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">이슈 트래커</h1>
          <p className="text-neutral-500 mt-1">문제 추적 및 관리</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-danger-500 text-white rounded-lg hover:bg-danger-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          이슈 등록
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">발견</span>
            <span className="text-2xl font-bold text-danger-600">{statusCount.발견}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">조사중</span>
            <span className="text-2xl font-bold text-warning-600">{statusCount.조사중}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">해결중</span>
            <span className="text-2xl font-bold text-primary-600">{statusCount.해결중}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">완료</span>
            <span className="text-2xl font-bold text-success-600">{statusCount.완료}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-neutral-500" />
          <div className="flex-1 flex gap-4">
            <div>
              <label className="text-sm text-neutral-500 mb-1 block">상태</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as IssueStatus | "전체")}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="전체">전체</option>
                <option value="발견">발견</option>
                <option value="조사중">조사중</option>
                <option value="해결중">해결중</option>
                <option value="완료">완료</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-neutral-500 mb-1 block">심각도</label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as IssueSeverity | "전체")}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="전체">전체</option>
                <option value="긴급">긴급</option>
                <option value="높음">높음</option>
                <option value="보통">보통</option>
                <option value="낮음">낮음</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <div key={issue.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-danger-500" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-neutral-100 text-neutral-700">
                      #{issue.id}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-neutral-100 text-neutral-700">
                      {issue.type}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded border-2 ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {issue.description}
                  </h3>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                {issue.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-neutral-500">날짜:</span>
                <span className="ml-2 text-neutral-900">{issue.date}</span>
              </div>
              <div>
                <span className="text-neutral-500">담당자:</span>
                <span className="ml-2 text-neutral-900">{issue.assignee}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">조치 내용:</p>
              <p className="text-sm text-neutral-900">{issue.actionTaken}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors">
                상세 보기
              </button>
              <button className="px-4 py-2 bg-neutral-200 text-neutral-700 text-sm rounded-lg hover:bg-neutral-300 transition-colors">
                수정
              </button>
              {issue.status !== "완료" && (
                <button className="px-4 py-2 bg-success-500 text-white text-sm rounded-lg hover:bg-success-600 transition-colors">
                  완료 처리
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <AlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">해당하는 이슈가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
