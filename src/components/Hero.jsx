import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  heroContent,
  stats,
  dashboardCards,
  bars,
  features,
} from "@/data/landing";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#06090f] min-h-screen">
      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-blue-700/20 blur-[80px] pointer-events-none" />
      <div className="absolute top-16 -right-16 w-[420px] h-[420px] rounded-full bg-teal-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 left-[40%] w-[380px] h-[380px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-28 pb-20 grid grid-cols-2 gap-16 items-center min-h-screen">
        {/* ── LEFT ── */}
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-blue-700/15 border border-blue-700/30 px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-blue-400">
              AI-Powered Finance
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[54px] font-extrabold leading-[1.05] tracking-[-0.04em] text-white mb-5">
            Your money,
            <br />
            finally{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg,#5ba8e8 0%,#5dcaa5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              under control
            </span>
          </h1>

          <p className="text-[16px] text-slate-400 leading-[1.8] max-w-[440px] mb-9">
            FinCoach tracks every dollar, forecasts your future, and gives you
            personalised AI advice — in one beautifully simple dashboard.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mb-11">
            <Link href="/sign-up">
              <button
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
                  boxShadow:
                    "0 0 0 1px rgba(91,168,232,0.3), 0 8px 24px rgba(24,95,165,0.4)",
                }}
              >
                Get started free
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </Link>
          </div>

          {/* Avatars + trust */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex">
              {[
                { i: "JK", from: "#185FA5", to: "#378ADD" },
                { i: "AM", from: "#0F6E56", to: "#1D9E75" },
                { i: "SR", from: "#854F0B", to: "#BA7517" },
                { i: "TL", from: "#534AB7", to: "#7F77DD" },
              ].map((av, idx) => (
                <div
                  key={av.i}
                  className="w-7 h-7 rounded-full border-2 border-[#06090f] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg,${av.from},${av.to})`,
                    marginRight: idx < 3 ? "-8px" : "0",
                  }}
                >
                  {av.i}
                </div>
              ))}
            </div>
            <span className="text-sm text-slate-500 ml-3">
              <strong className="text-slate-200 font-semibold"></strong> Built
              for people who want clarity & control over their finances
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-0 border-t border-white/5 pt-8">
            {[
              { val: "Track everything", label: "Income & expenses" },
              { val: "Plan ahead", label: "Goals & forecasting" },
              { val: "Stay consistent", label: "Build better habits" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 ${i > 0 ? "pl-7 border-l border-white/5" : ""} ${i < 2 ? "pr-7" : ""}`}
              >
                <div className="text-[16px] font-extrabold tracking-tight text-white">
                  {s.val}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="relative pt-6 pb-10">
          {/* Floating notification */}
          <div className="absolute -top-4 -right-5 z-20 bg-[#0f1620] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[210px]">
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5 1.5a4 4 0 014 4c0 2.5.5 3.5 1 4.5H3.5c.5-1 1-2 1-4.5a4 4 0 014-4z"
                  stroke="#5dcaa5"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M6 12a1.5 1.5 0 003 0"
                  stroke="#5dcaa5"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Savings goal reached!
              </div>
              <div className="text-[11px] text-slate-500">
                Emergency fund · $5,000
              </div>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
                  }}
                >
                  HC
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-slate-200">
                    Harold's finances
                  </div>
                  <div className="text-[11px] text-slate-600">Demo account</div>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 bg-white/5 border border-white/[0.08] px-2.5 py-1 rounded-lg">
                Apr 2026
              </span>
            </div>

            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
              Net worth
            </div>
            <div className="text-[38px] font-extrabold tracking-tight text-white leading-none">
              $48,230
            </div>
            <div className="inline-flex items-center gap-1.5 bg-teal-900/30 border border-teal-700/30 text-teal-400 text-[11px] font-semibold px-3 py-1 rounded-full mt-2 mb-5">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path
                  d="M1 6.5L4.5 2.5l3.5 4"
                  stroke="#5dcaa5"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +8.4% this month
            </div>

            {/* Bars */}
            <div className="flex items-end gap-1 h-16 mb-1.5">
              {bars.map((b) => (
                <div
                  key={b.month}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: b.height,
                    background: b.active
                      ? "linear-gradient(180deg,#378ADD,#185FA5)"
                      : "rgba(24,95,165,0.2)",
                  }}
                />
              ))}
            </div>
            <div className="flex gap-1 mb-5">
              {bars.map((b) => (
                <div
                  key={b.month}
                  className={`flex-1 text-center text-[10px] ${b.active ? "text-blue-400 font-bold" : "text-slate-700"}`}
                >
                  {b.month}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {dashboardCards.slice(0, 2).map((c) => (
                <div
                  key={c.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3"
                >
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1.5">
                    {c.label}
                  </div>
                  <div className="text-[18px] font-extrabold tracking-tight text-slate-200">
                    {c.value}
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${
                      c.up
                        ? "bg-teal-900/30 border border-teal-700/30 text-teal-400"
                        : "bg-red-900/20 border border-red-700/20 text-red-400"
                    }`}
                  >
                    {c.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating goal */}
          <div
            className="absolute -bottom-6 -left-5 z-20 rounded-2xl px-4 py-3 min-w-[185px] border border-blue-900/40"
            style={{ background: "linear-gradient(135deg,#0d1b2e,#0a1520)" }}
          >
            <div className="text-[10px] font-semibold tracking-widest uppercase text-blue-900/80 mb-1">
              Active goal
            </div>
            <div className="text-sm font-bold text-slate-200 mb-2.5">
              House down payment
            </div>
            <div className="bg-white/5 rounded-full h-1.5 mb-1.5">
              <div
                className="h-1.5 rounded-full w-[68%]"
                style={{ background: "linear-gradient(90deg,#185FA5,#5ba8e8)" }}
              />
            </div>
            <div className="text-[11px] text-slate-600">
              <span className="text-blue-400 font-bold">68%</span> · $34k of
              $50k
            </div>
          </div>

          {/* Feature strip */}
          <div className="grid grid-cols-3 gap-3 mt-16">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-700/15 border border-blue-700/20 flex items-center justify-center mb-2.5">
                  {
                    [
                      <svg
                        key="0"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <rect
                          x="2"
                          y="8"
                          width="3"
                          height="6"
                          rx="1"
                          fill="#5ba8e8"
                        />
                        <rect
                          x="6.5"
                          y="5"
                          width="3"
                          height="9"
                          rx="1"
                          fill="#5ba8e8"
                        />
                        <rect
                          x="11"
                          y="2"
                          width="3"
                          height="12"
                          rx="1"
                          fill="#5ba8e8"
                        />
                      </svg>,
                      <svg
                        key="1"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="5.5"
                          stroke="#5ba8e8"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M8 5v3.5l2 1.5"
                          stroke="#5ba8e8"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>,
                      <svg
                        key="2"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2 11L6 7l3 2.5L14 4"
                          stroke="#5ba8e8"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <circle cx="14" cy="4" r="1.5" fill="#5ba8e8" />
                      </svg>,
                    ][i]
                  }
                </div>
                <div className="text-[12px] font-bold text-slate-300 mb-1">
                  {f.title}
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
