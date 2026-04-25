import React from "react";
import CreateAccount from "@/components/CreateAccount";
import AccountCard from "@/components/AccountCard";
import OverviewChart from "@/components/OverviewChart";
import BudgetProgress from "@/components/BudgetProgress";
import TransactionDrawer from "@/components/TransactionDrawer";
import { getAccounts, getDashboardData, getBudgets } from "@/actions/dashboard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DashboardPage = async () => {
  const [accounts, transactions, budgetData] = await Promise.all([
    getAccounts(),
    getDashboardData(),
    getBudgets(),
  ]);

  const defaultAccount = accounts.find((a) => a.isDefault);

  return (
    <div className="grid grid-cols-12 gap-6">

      {/* Budget Progress */}
      <div className="col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-5">
          Budget Progress
        </div>
        <BudgetProgress budgetData={budgetData} />
      </div>

      {/* Create Account */}
      <div className="col-span-4">
        <CreateAccount />
      </div>

      {/* Overview Chart */}
      <div className="col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-xs font-semibold tracking-widest uppercase text-slate-600">
            Overview
          </div>
          <div className="text-xs text-slate-600">
            {new Date().getFullYear()}
          </div>
        </div>
        <OverviewChart transactions={transactions ?? []} />
      </div>

      {/* Add Transaction Button */}
      <div className="col-span-4 flex items-start justify-end">
        <TransactionDrawer
          accounts={accounts}
          defaultAccountId={defaultAccount?.id}
          trigger={
            <Button
              className="flex items-center gap-2 text-white border-0"
              style={{
                background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
                boxShadow: "0 0 0 1px rgba(91,168,232,0.25)",
              }}
            >
              <Plus size={16} />
              Add Transaction
            </Button>
          }
        />
      </div>

      {/* Accounts Grid */}
      <div className="col-span-12">
        <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">
          Your Accounts
        </div>

        {accounts.length === 0 ? (
          <p className="text-slate-600 text-sm">
            No accounts yet. Create one above.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;