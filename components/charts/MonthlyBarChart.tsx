"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/app/page";

type Props = {
  transactions: Transaction[];
  darkMode?: boolean; // Optional prop for dark mode styling
};

export default function MonthlyBarChart({ transactions }: Props) {
  // Group transactions by month
  const monthlyData = transactions.reduce((acc: Record<string, number>, tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  // Convert to array for Recharts
  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="w-full max-w-2xl mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No data available for chart.</p>
      )}
    </div>
  );
}
