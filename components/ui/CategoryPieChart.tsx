"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Transaction } from "@/app/page";

type Props = {
    transactions: Transaction[];
    darkMode?: boolean;
}

const COLORS = [
  "#3b82f6", "#f97316", "#10b981", "#f43f5e", "#a855f7",
  "#facc15", "#14b8a6", "#6366f1", "#ef4444"
];

export default function CategoryPieChart({ transactions, darkMode = false }: Props) {
  const grouped = transactions.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  return (
    <div className={`w-full max-w-2xl mt-8 p-6 rounded-lg shadow ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}>
        Spending by Category
      </h2>
      {chartData.length ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                borderRadius: "0.5rem",
                color: darkMode ? "#f3f4f6" : "#111827"
              }}
            />
            <Legend 
              wrapperStyle={{
                color: darkMode ? "#f3f4f6" : "#111827"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
          No data yet.
        </p>
      )}
    </div>
  );
}