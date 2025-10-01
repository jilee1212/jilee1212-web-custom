"use client";

import { useState } from "react";
import { DollarSign, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const revenueData = [
  { name: "LP 수수료", value: 45000 },
  { name: "스테이킹 수수료", value: 32000 },
  { name: "거래 수수료", value: 23000 },
];

const expenseData = [
  { name: "마케팅", value: 15000 },
  { name: "운영비", value: 8000 },
  { name: "개발비", value: 12000 },
  { name: "보안 감사", value: 5000 },
];

const COLORS = ["#2196F3", "#4CAF50", "#FF9800", "#F44336", "#9C27B0"];

export default function FinancePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("2024-01");

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
  const netIncome = totalRevenue - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">재무 관리</h1>
          <p className="text-neutral-500 mt-1">수익 및 비용 추적</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          기록 추가
        </button>
      </div>

      {/* Month Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          조회 월
        </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-500">총 수익</span>
            <TrendingUp className="w-5 h-5 text-success-600" />
          </div>
          <p className="text-3xl font-bold text-success-600">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-neutral-500 mt-2">전월 대비 +12.5%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-500">총 비용</span>
            <TrendingDown className="w-5 h-5 text-danger-600" />
          </div>
          <p className="text-3xl font-bold text-danger-600">${totalExpense.toLocaleString()}</p>
          <p className="text-sm text-neutral-500 mt-2">전월 대비 +5.3%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-500">순이익</span>
            <DollarSign className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-primary-600">${netIncome.toLocaleString()}</p>
          <p className="text-sm text-neutral-500 mt-2">순이익률 {((netIncome / totalRevenue) * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">수익 구성</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">비용 구성</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">최근 거래</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">날짜</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">유형</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">카테고리</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">금액</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-neutral-700">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 text-sm">2024-01-15</td>
                <td className="py-3 px-4 text-sm">
                  <span className="px-2 py-1 bg-success-50 text-success-700 rounded text-xs">수익</span>
                </td>
                <td className="py-3 px-4 text-sm">LP 수수료</td>
                <td className="py-3 px-4 text-sm text-success-600">+$15,234</td>
                <td className="py-3 px-4 text-sm">일일 LP 수수료</td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 text-sm">2024-01-14</td>
                <td className="py-3 px-4 text-sm">
                  <span className="px-2 py-1 bg-danger-50 text-danger-700 rounded text-xs">비용</span>
                </td>
                <td className="py-3 px-4 text-sm">마케팅</td>
                <td className="py-3 px-4 text-sm text-danger-600">-$5,000</td>
                <td className="py-3 px-4 text-sm">소셜 미디어 광고</td>
              </tr>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 text-sm">2024-01-13</td>
                <td className="py-3 px-4 text-sm">
                  <span className="px-2 py-1 bg-success-50 text-success-700 rounded text-xs">수익</span>
                </td>
                <td className="py-3 px-4 text-sm">거래 수수료</td>
                <td className="py-3 px-4 text-sm text-success-600">+$8,456</td>
                <td className="py-3 px-4 text-sm">일일 거래 수수료</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
