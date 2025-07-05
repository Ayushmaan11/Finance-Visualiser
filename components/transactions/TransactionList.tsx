"use client";

import { Transaction } from "@/app/page";
import { Button } from "@/components/ui/button";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: () => void;
  loading: boolean;
  darkMode?: boolean;
}

export default function TransactionList({
  transactions,
  onDelete,
  loading,
  darkMode = false
}: TransactionListProps) {
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.ok) onDelete();
    else alert("Failed to delete");
  };

  if (loading) return <p className={`mt-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading transactions...</p>;
  if (!transactions.length) return <p className={`mt-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>No transactions yet.</p>;

  return (
    <div className="mt-8 w-full max-w-md space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className={`flex justify-between items-center p-4 border rounded-lg shadow transition-colors ${
            darkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          }`}
        >
          <div>
            <p className={`font-medium ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}>
              ₹{tx.amount.toLocaleString('en-IN')}
            </p>
            <p className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              {tx.description}
            </p>
            <p className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {new Date(tx.date).toLocaleDateString()}
            </p>
            <p className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              Category: {tx.category || "Uncategorised"}
            </p>
          </div>
          <Button 
            variant="destructive" 
            onClick={() => handleDelete(tx._id)}
            className={darkMode ? "bg-red-700 hover:bg-red-800" : ""}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}