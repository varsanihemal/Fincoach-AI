import { checkUser } from "@/lib/checkUser";
import React from "react";
import DashboardPage from "./page";

const Dashboard = async () => {
  await checkUser();
  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[300px] h-[300px] rounded-full bg-violet-600/8 blur-[80px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-10 pb-16">

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[1.5px] bg-blue-700" />
            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">
              Overview
            </span>
          </div>
          <h1
            className="text-4xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #fff 40%, #5ba8e8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Your complete financial picture, at a glance.
          </p>
        </div>

        {/* Dashboard content */}
        <DashboardPage />

      </div>
    </div>
  );
};

export default Dashboard;