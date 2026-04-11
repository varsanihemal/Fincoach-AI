import React from "react";
import CreateAccount from "@/components/create-account";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#06090f] pt-20 px-8">

      {/* Grid lines background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back — here's your financial overview</p>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Budget progress */}
          <div className="col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 min-h-[200px]">
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">Budget progress</div>
            <p className="text-slate-600 text-sm">No budgets set yet.</p>
          </div>

          {/* Create account */}
          <div className="col-span-4">
            <CreateAccount />
          </div>

          {/* Overview */}
          <div className="col-span-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 min-h-[200px]">
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">Overview</div>
            <p className="text-slate-600 text-sm">No transactions yet.</p>
          </div>

          {/* Accounts grid */}
          <div className="col-span-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 min-h-[200px]">
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">Accounts</div>
            <p className="text-slate-600 text-sm">No accounts yet.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;