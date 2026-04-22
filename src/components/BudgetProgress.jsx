"use client";
import { useState } from "react";
import { toast } from "sonner";
import { setBudget } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { Loader2, Pencil } from "lucide-react";

const CATEGORY_COLORS = {
  FOOD: { bar: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10" },
  TRANSPORT: { bar: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10" },
  ENTERTAINMENT: { bar: "bg-purple-500", text: "text-purple-400", bg: "bg-purple-500/10" },
  SHOPPING: { bar: "bg-pink-500", text: "text-pink-400", bg: "bg-pink-500/10" },
  UTILITIES: { bar: "bg-slate-400", text: "text-slate-400", bg: "bg-slate-400/10" },
  HEALTH: { bar: "bg-teal-500", text: "text-teal-400", bg: "bg-teal-500/10" },
  OTHER: { bar: "bg-slate-500", text: "text-slate-400", bg: "bg-slate-500/10" },
};

const BudgetProgress = ({ budgetData }) => {
  const { budget, spendingByCategory, totalSpent } = budgetData;
  const [editing, setEditing] = useState(false);
  const [inputAmount, setInputAmount] = useState(budget?.amount ?? "");

  const { fn: setBudgetFn, loading } = useFetch(setBudget);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputAmount || isNaN(parseFloat(inputAmount))) {
      toast.error("Enter a valid amount");
      return;
    }
    const result = await setBudgetFn(inputAmount);
    if (result?.success) {
      toast.success("Budget saved!");
      setEditing(false);
    }
  };

  // No budget — show set budget form
  if (!budget || editing) {
    return (
      <div className="flex flex-col gap-4">
        {editing && (
          <div className="text-xs text-slate-500">
            Current budget: ${Number(budget?.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="e.g. 3000"
              className="w-full bg-white/[0.03] border border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10 pl-7 pr-4 text-sm outline-none focus:border-blue-700/50 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-10 px-5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shrink-0"
            style={{
              background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
              boxShadow: "0 0 0 1px rgba(91,168,232,0.25)",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {editing ? "Update" : "Set budget"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="h-10 px-4 rounded-xl text-sm text-slate-400 bg-white/[0.03] border border-white/[0.06]"
            >
              Cancel
            </button>
          )}
        </form>
        {!editing && (
          <p className="text-slate-700 text-xs">
            Set a monthly budget to track your spending progress.
          </p>
        )}
      </div>
    );
  }

  const totalBudget = Number(budget.amount);
  const overallPct = Math.min((totalSpent / totalBudget) * 100, 100);
  const isOverBudget = totalSpent > totalBudget;
  const categories = Object.entries(spendingByCategory).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-5">

      {/* Overall budget bar */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-slate-300">Monthly budget</div>
            <div className="text-xs text-slate-600 mt-0.5">
              ${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })} of $
              {totalBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })} spent
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-lg font-extrabold tracking-tight ${isOverBudget ? "text-red-400" : "text-teal-400"}`}>
              {overallPct.toFixed(0)}%
            </div>
            {/* Edit button */}
            <button
              onClick={() => { setInputAmount(budget.amount); setEditing(true); }}
              className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Pencil size={11} />
            </button>
          </div>
        </div>
        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isOverBudget ? "bg-red-500" : "bg-teal-500"}`}
            style={{ width: `${overallPct}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-xs text-red-400 mt-2">
            Over budget by ${(totalSpent - totalBudget).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        )}
      </div>

      {/* Per category breakdown */}
      {categories.length === 0 ? (
        <p className="text-slate-600 text-sm">No expenses this month yet.</p>
      ) : (
        <div className="space-y-3">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">
            By category
          </div>
          {categories.map(([category, spent]) => {
            const colors = CATEGORY_COLORS[category.toUpperCase()] || CATEGORY_COLORS.OTHER;
            const pct = Math.min((spent / totalBudget) * 100, 100);
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    ${spent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    <span className="text-slate-600 font-normal ml-1">
                      ({pct.toFixed(0)}%)
                    </span>
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;