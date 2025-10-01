"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "Mon", value: 1200000 },
  { date: "Tue", value: 1400000 },
  { date: "Wed", value: 1100000 },
  { date: "Thu", value: 1600000 },
  { date: "Fri", value: 1800000 },
  { date: "Sat", value: 2100000 },
  { date: "Sun", value: 1900000 },
];

interface ChartCardProps {
  title: string;
}

export default function ChartCard({ title }: ChartCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
          <XAxis dataKey="date" stroke="#9E9E9E" />
          <YAxis stroke="#9E9E9E" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #EEEEEE",
              borderRadius: "8px"
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2196F3"
            strokeWidth={2}
            dot={{ fill: "#2196F3", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
