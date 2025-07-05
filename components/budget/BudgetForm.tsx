"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  "Food",
  "Rent",
  "Entertainment",
  "Transport",
  "Bills",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

export default function BudgetForm({ onSuccess, darkMode=false}: { onSuccess?: () => void; darkMode?: boolean }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        amount: parseFloat(amount),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setAmount("");
      setCategory("");
      onSuccess?.();
    } else {
      alert("Failed to save budget");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className={`space-y-4 p-4 border rounded-xl shadow max-w-md w-full ${
    darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900"
  }`}
>
      <h2 className="text-lg font-semibold">Set Category Budget</h2>

      <select
          className={`w-full p-2 rounded border ${
    darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
  }`}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Input
        type="number"
        placeholder="Budget Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Budget"}
      </Button>
    </form>
  );
}
