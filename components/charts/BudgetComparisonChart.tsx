"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Budget, Transaction } from "@/app/page";

type Props = {
  budgets: Budget[];
  transactions: Transaction[];
    darkMode?: boolean; // Optional prop for dark mode styling
};

export default function BudgetComparisonChart({ budgets, transactions }: Props) {
  // Group transactions by category and sum totals
  const actualByCategory: Record<string, number> = {};
  transactions.forEach((tx) => {
    actualByCategory[tx.category] = (actualByCategory[tx.category] || 0) + tx.amount;
  });

  // Merge with budget data
  const data = budgets.map((budget) => ({
    category: budget.category,
    budgeted: budget.amount,
    spent: actualByCategory[budget.category] || 0,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgeted" fill="#34d399" name="Budgeted" />
          <Bar dataKey="spent" fill="#f87171" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
