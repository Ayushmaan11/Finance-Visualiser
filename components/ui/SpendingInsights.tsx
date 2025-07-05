"use client";

import { Budget, Transaction } from "@/app/page";
import { FiCheckCircle, FiAlertCircle, FiXCircle } from "react-icons/fi";

type Props = {
  budgets: Budget[];
  transactions: Transaction[];
  darkMode?: boolean;
};

export default function SpendingInsights({ budgets, transactions, darkMode = false }: Props) {
  const insights = budgets.map((budget) => {
    const spent = transactions
      .filter((tx) => tx.category === budget.category)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const percentage = (spent / budget.amount) * 100;
    let status = "";
    if (percentage < 80) status = "under";
    else if (percentage <= 100) status = "near";
    else status = "over";

    return {
      ...budget,
      spent,
      percentage,
      status,
    };
  });

  return (
    <div className={`rounded-xl shadow-lg p-6 mt-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}>
      <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
      {insights.length === 0 ? (
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No budgets available to analyze.</p>
      ) : (
        <ul className="space-y-3">
          {insights.map((item) => (
            <li key={item.category} className="flex justify-between items-center">
              <span className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                {item.category}: ₹{item.spent.toFixed(2)} / ₹{item.amount.toFixed(2)} ({item.percentage.toFixed(0)}%)
              </span>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                item.status === "under"
                  ? "text-green-500"
                  : item.status === "near"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}>
                {item.status === "under" && <FiCheckCircle />}
                {item.status === "near" && <FiAlertCircle />}
                {item.status === "over" && <FiXCircle />}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)} budget
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
