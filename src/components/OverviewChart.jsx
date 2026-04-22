"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f1620] border border-white/[0.08] rounded-xl px-4 py-3 text-xs">
      <div className="font-semibold text-slate-300 mb-2">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-slate-400 capitalize">{p.name}:</span>
          <span className="font-semibold text-slate-200">
            ${Number(p.value).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  );
};

const OverviewChart = ({ transactions }) => {
  const [activeBar, setActiveBar] = useState(null);

  // Build monthly income/expense data for current year
  const currentYear = new Date().getFullYear();

  const monthlyData = MONTHS.map((month, i) => {
    const monthTxs = transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d.getFullYear() === currentYear && d.getMonth() === i;
    });
    const income = monthTxs
      .filter((tx) => tx.type === "INCOME")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expense = monthTxs
      .filter((tx) => tx.type === "EXPENSE")
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { month, income, expense };
  });

  // Only show months up to current month
  const currentMonth = new Date().getMonth();
  const visibleData = monthlyData.slice(0, currentMonth + 1);

  const totalIncome = visibleData.reduce((s, d) => s + d.income, 0);
  const totalExpense = visibleData.reduce((s, d) => s + d.expense, 0);
  const net = totalIncome - totalExpense;

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-slate-600 text-sm">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total income", value: totalIncome, color: "text-teal-400" },
          { label: "Total expenses", value: totalExpense, color: "text-red-400" },
          { label: "Net", value: net, color: net >= 0 ? "text-teal-400" : "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
              {s.label}
            </div>
            <div className={`text-lg font-extrabold tracking-tight ${s.color}`}>
              {net < 0 && s.label === "Net" ? "-" : ""}$
              {Math.abs(s.value).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={visibleData} barGap={4} barCategoryGap="30%">
          <XAxis
            dataKey="month"
            tick={{ fill: "#4a5568", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#4a5568", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="income" name="income" radius={[4, 4, 0, 0]} fill="#5dcaa5" />
          <Bar dataKey="expense" name="expense" radius={[4, 4, 0, 0]} fill="#f09595" />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 justify-center">
        {[
          { color: "#5dcaa5", label: "Income" },
          { color: "#f09595", label: "Expense" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
            <span className="text-xs text-slate-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewChart;