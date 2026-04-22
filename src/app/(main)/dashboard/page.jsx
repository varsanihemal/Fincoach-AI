import React from "react";
import CreateAccount from "@/components/CreateAccount";
import AccountCard from "@/components/AccountCard";
import OverviewChart from "@/components/OverviewChart";
import BudgetProgress from "@/components/BudgetProgress";
import { getAccounts, getDashboardData, getBudgets } from "@/actions/dashboard";

const DashboardPage = async () => {
  const [accounts, transactions, budgetData] = await Promise.all([
    getAccounts(),
    getDashboardData(),
    getBudgets(),
  ]);

  return (
    <div className="min-h-screen bg-[#06090f] pt-20 px-8">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back — here's your financial overview
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Budget progress */}
          <div className="col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-5">
              Budget progress
            </div>
            <BudgetProgress budgetData={budgetData} />
          </div>

          {/* Create account */}
          <div className="col-span-4">
            <CreateAccount />
          </div>

          {/* Overview chart */}
          <div className="col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-semibold tracking-widest uppercase text-slate-600">
                Overview
              </div>
              <div className="text-xs text-slate-600">{new Date().getFullYear()}</div>
            </div>
            <OverviewChart transactions={transactions ?? []} />
          </div>

          {/* Accounts grid */}
          <div className="col-span-12">
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">
              Your accounts
            </div>
            {accounts.length === 0 ? (
              <p className="text-slate-600 text-sm">No accounts yet. Create one above.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;