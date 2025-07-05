"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import CategoryPieChart from "@/components/ui/CategoryPieChart";
import SummaryCards from "@/components/ui/SummaryCards";
import BudgetForm from "@/components/budget/BudgetForm";
import BudgetComparisonChart from "@/components/charts/BudgetComparisonChart";
import SpendingInsights from "@/components/ui/SpendingInsights";
import { FiTrendingUp, FiPieChart, FiDollarSign, FiMoon, FiSun } from "react-icons/fi";

export type Budget = {
  _id?: string;
  category: string;
  amount: number;
};

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("transactions");
  const [darkMode, setDarkMode] = useState(false);

  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  

  return (
    <main className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-800"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Finance Tracker
            </motion.h1>
            <p className={`mt-1 ${darkMode ? "text-indigo-200" : "text-indigo-600"}`}>
              Manage your budget and expenses in one place
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-white text-gray-700"} shadow-md hover:shadow-lg transition-all`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Animated Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={`inline-flex rounded-lg p-1 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
            {["transactions", "budgets", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${
                  activeTab === tab
                    ? darkMode 
                      ? "bg-indigo-700 text-white" 
                      : "bg-indigo-600 text-white"
                    : darkMode 
                      ? "text-gray-300 hover:bg-gray-700" 
                      : "text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {tab === "transactions" && <FiDollarSign />}
                {tab === "budgets" && <FiTrendingUp />}
                {tab === "analytics" && <FiPieChart />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Animated Content Switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "transactions" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <FiDollarSign className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Add Transaction</span>
                    </h2>
                    <TransactionForm onSuccess={fetchTransactions} darkMode={darkMode} />
                  </motion.div>

                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <FiTrendingUp className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Quick Stats</span>
                    </h2>
                    <SummaryCards transactions={transactions} darkMode={darkMode} />
                  </motion.div>
                </div>

                <div className="lg:col-span-2">
                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <FiDollarSign className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Recent Transactions</span>
                    </h2>
                    <TransactionList
                      transactions={transactions}
                      onDelete={fetchTransactions}
                      loading={loading}
                      darkMode={darkMode}
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === "budgets" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <FiTrendingUp className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Set Budget</span>
                    </h2>
                    <BudgetForm onSuccess={fetchBudgets} darkMode={darkMode} />
                  </motion.div>

                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <FiPieChart className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Budget Summary</span>
                    </h2>
                    <div className="space-y-4">
                      {budgets.length > 0 ? (
                        budgets.map((budget) => (
                          <div 
                            key={budget.category} 
                            className="flex justify-between items-center p-3 rounded-lg hover:bg-opacity-50 transition-colors"
                            style={{
                              background: darkMode 
                                ? "linear-gradient(90deg, rgba(49,46,129,0.3) 0%, rgba(79,70,229,0.1) 100%)" 
                                : "linear-gradient(90deg, rgba(224,231,255,0.6) 0%, rgba(199,210,254,0.3) 100%)"
                            }}
                          >
                            <span className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                              {budget.category}
                            </span>
                            <span className={`font-bold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                              ${budget.amount.toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No budgets set yet</p>
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className="lg:col-span-2">
                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <FiTrendingUp className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Budget vs Actual</span>
                    </h2>
                    <BudgetComparisonChart 
                      budgets={budgets} 
                      transactions={transactions} 
                      darkMode={darkMode} 
                    />
                    <SpendingInsights 
  budgets={budgets} 
  transactions={transactions} 
  darkMode={darkMode} 
/>

                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <FiTrendingUp className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Monthly Spending</span>
                    </h2>
                    <MonthlyBarChart transactions={transactions} darkMode={darkMode} />
                  </motion.div>

                  <motion.div 
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <FiPieChart className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                      <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Spending by Category</span>
                    </h2>
                    <CategoryPieChart transactions={transactions} darkMode={darkMode} />
                  </motion.div>
                </div>

                <motion.div 
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"} border`}
                >
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <FiTrendingUp className={darkMode ? "text-indigo-400" : "text-indigo-600"} />
                    <span className={darkMode ? "text-indigo-300" : "text-indigo-800"}>Budget Performance</span>
                  </h2>
                  <BudgetComparisonChart 
                    budgets={budgets} 
                    transactions={transactions} 
                    darkMode={darkMode} 
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className={darkMode ? "text-indigo-400" : "text-indigo-600"}>
            &copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </main>
  );
}