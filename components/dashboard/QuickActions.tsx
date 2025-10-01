import { Plus, FileText, RefreshCcw, Download } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">빠른 액션</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/daily"
          className="flex flex-col items-center gap-2 p-4 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-medium">일일 데이터 입력</span>
        </Link>

        <Link
          href="/issues"
          className="flex flex-col items-center gap-2 p-4 bg-danger-50 text-danger-600 rounded-lg hover:bg-danger-100 transition-colors"
        >
          <FileText className="w-6 h-6" />
          <span className="text-sm font-medium">이슈 등록</span>
        </Link>

        <button className="flex flex-col items-center gap-2 p-4 bg-success-50 text-success-600 rounded-lg hover:bg-success-100 transition-colors">
          <RefreshCcw className="w-6 h-6" />
          <span className="text-sm font-medium">데이터 새로고침</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-warning-50 text-warning-600 rounded-lg hover:bg-warning-100 transition-colors">
          <Download className="w-6 h-6" />
          <span className="text-sm font-medium">리포트 다운로드</span>
        </button>
      </div>
    </div>
  );
}
