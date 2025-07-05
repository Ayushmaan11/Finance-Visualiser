"use client";

import { Transaction } from "@/app/page";

type Props = {
  transactions: Transaction[];
  darkMode?: boolean;
};

export default function SummaryCards({ transactions, darkMode = false }: Props) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(total);

  const byCategory = transactions.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const recent = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  // Card styling classes
  const cardBaseClasses = "p-4 shadow rounded-lg transition-colors duration-300";
  const cardLightClasses = "bg-white border border-gray-200";
  const cardDarkClasses = "bg-gray-800 border-gray-700";
  
  // Text styling classes
  const titleLightClasses = "text-gray-500";
  const titleDarkClasses = "text-gray-400";
  const valueLightClasses = "text-gray-800";
  const valueDarkClasses = "text-gray-100";
  const dateLightClasses = "text-gray-500";
  const dateDarkClasses = "text-gray-400";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-4xl">
      {/* Total Spent Card */}
      <div className={`${cardBaseClasses} ${darkMode ? cardDarkClasses : cardLightClasses}`}>
        <h3 className={`text-sm ${darkMode ? titleDarkClasses : titleLightClasses}`}>
          Total Spent
        </h3>
        <p className={`text-xl font-bold ${darkMode ? valueDarkClasses : valueLightClasses}`}>
          {formattedTotal}
        </p>
      </div>

      {/* Top Category Card */}
      <div className={`${cardBaseClasses} ${darkMode ? cardDarkClasses : cardLightClasses}`}>
        <h3 className={`text-sm ${darkMode ? titleDarkClasses : titleLightClasses}`}>
          Top Category
        </h3>
        <p className={`text-xl font-bold ${darkMode ? valueDarkClasses : valueLightClasses}`}>
          {topCategory}
        </p>
      </div>

      {/* Most Recent Card */}
      <div className={`${cardBaseClasses} ${darkMode ? cardDarkClasses : cardLightClasses}`}>
        <h3 className={`text-sm ${darkMode ? titleDarkClasses : titleLightClasses}`}>
          Most Recent
        </h3>
        <p className={`text-sm ${darkMode ? valueDarkClasses : valueLightClasses}`}>
          {recent?.description || "-"}
        </p>
        <p className={`text-xs ${darkMode ? dateDarkClasses : dateLightClasses}`}>
          {recent?.date ? new Date(recent.date).toLocaleDateString() : "-"}
        </p>
      </div>
    </div>
  );
}