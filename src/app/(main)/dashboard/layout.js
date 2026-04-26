import { checkUser } from "@/lib/checkUser";
import { getAccounts, getBudgets, getDashboardData } from "@/actions/dashboard";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  await checkUser();

  const [accounts, transactions, budgetData] = await Promise.all([
    getAccounts(),
    getDashboardData(),
    getBudgets(),
  ]);

  const totalBalance = accounts.reduce((s, a) => s + Number(a.balance), 0);

  const now = new Date();
  const thisMonth = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const monthlyIncome = thisMonth
    .filter((tx) => tx.type === "INCOME")
    .reduce((s, tx) => s + tx.amount, 0);

  const monthlyExpenses = thisMonth
    .filter((tx) => tx.type === "EXPENSE")
    .reduce((s, tx) => s + tx.amount, 0);

  const savingsRate = monthlyIncome > 0
    ? (((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100).toFixed(0)
    : 0;

  const stats = [
    {
      label: "Total balance",
      value: `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      sub: `across ${accounts.length} account${accounts.length !== 1 ? "s" : ""}`,
      color: "text-white",
      icon: <Wallet size={14} className="text-blue-400" />,
    },
    {
      label: "Income this month",
      value: `$${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      sub: "total received",
      color: "text-teal-400",
      icon: <ArrowUpRight size={14} className="text-teal-400" />,
    },
    {
      label: "Expenses this month",
      value: `$${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      sub: "total spent",
      color: "text-red-400",
      icon: <ArrowDownRight size={14} className="text-red-400" />,
    },
    {
      label: "Savings rate",
      value: `${savingsRate}%`,
      sub: "of income saved",
      color: Number(savingsRate) >= 20 ? "text-teal-400" : "text-amber-400",
      icon: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-violet-600/8 blur-[80px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-700/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-8">

        {/* ── Hero header ── */}
        <div className="pt-24 pb-10">
          <div className="flex items-start justify-between gap-8 flex-wrap">

            {/* Left — title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-blue-700" />
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">
                  Overview
                </span>
              </div>
              <h1
                className="text-[42px] font-extrabold tracking-[-0.03em] leading-none mb-3"
                style={{
                  background: "linear-gradient(135deg, #fff 40%, #5ba8e8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Your complete financial picture, at a glance.
              </p>
            </div>

            {/* Right — stat cards */}
            <div className="flex items-center gap-3 flex-wrap">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4 min-w-[150px]"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    {s.icon}
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">
                      {s.label}
                    </span>
                  </div>
                  <div className={`text-xl font-extrabold tracking-tight ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Page content ── */}
        <div className="pb-16">{children}</div>

      </div>
    </div>
  );
}