"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ 
  onSuccess, 
  darkMode = false 
}: { 
  onSuccess?: () => void; 
  darkMode?: boolean 
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = [
    "Food", "Rent", "Entertainment",
    "Transport", "Bills", "Shopping",
    "Health", "Education", "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify({ 
          amount: parseFloat(amount), 
          date, 
          description,
          category 
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setAmount("");
        setDate("");
        setDescription("");
        setCategory("");
        onSuccess?.();
      } else {
        throw new Error("Failed to add transaction");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-4 p-4 border rounded-xl shadow max-w-md w-full transition-colors duration-300 ${
        darkMode 
          ? "bg-gray-800 border-gray-700" 
          : "bg-white border-gray-200"
      }`}
    >
      <h2 className={`text-xl font-semibold ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}>
        Add Transaction
      </h2>

      <Input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className={darkMode ? "dark" : ""}
      />

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className={darkMode ? "dark" : ""}
      />

      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className={darkMode ? "dark" : ""}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
          darkMode
            ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 text-gray-100"
            : "bg-white border-gray-300 focus:ring-blue-500 text-gray-700"
        }`}
      >
        <option value="" disabled className={darkMode ? "bg-gray-700" : ""}>
          Select Category
        </option>
        {categories.map((cat) => (
          <option 
            key={cat} 
            value={cat}
            className={darkMode ? "bg-gray-700 hover:bg-gray-600" : ""}
          >
            {cat}
          </option>
        ))}
      </select>

      <Button 
        type="submit" 
        disabled={loading}
        className={`w-full ${
          darkMode 
            ? "bg-indigo-600 hover:bg-indigo-700" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}