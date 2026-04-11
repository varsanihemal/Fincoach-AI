import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#06090f] flex items-center justify-center relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-blue-700/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-16 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[60px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        {/* Giant 404 */}
        <div
          className="text-[180px] font-black leading-none tracking-[-0.06em] select-none mb-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 80px rgba(24,95,165,0.3)",
          }}
        >
          404
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-700/15 border border-blue-700/30 px-4 py-1.5 rounded-full mb-5 -mt-6 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-400">
            Page not found
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[32px] font-extrabold tracking-tight text-white mb-3">
          You've gone off the map
        </h1>

        {/* Subtext */}
        <p className="text-[15px] text-slate-500 leading-relaxed max-w-sm mx-auto mb-10">
          This page doesn't exist — or maybe it moved. Head back to your{" "}
          <span className="text-blue-400">financial dashboard</span> and stay on track.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
              boxShadow: "0 0 0 1px rgba(91,168,232,0.3), 0 8px 24px rgba(24,95,165,0.3)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6 2L2 7l4 5M2 7h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm text-slate-400 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-all"
          >
            Go to dashboard →
          </Link>
        </div>
      </div>

      {/* Animated bar chart decoration */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-1.5">
        {[
          { h: "h-5", delay: "delay-0", dim: true },
          { h: "h-9", delay: "delay-100", dim: true },
          { h: "h-12", delay: "delay-200", dim: false },
          { h: "h-7", delay: "delay-300", dim: true },
          { h: "h-4", delay: "delay-500", dim: true },
        ].map((bar, i) => (
          <div
            key={i}
            className={`w-2 ${bar.h} rounded-t-sm animate-pulse ${bar.delay} ${
              bar.dim ? "bg-blue-700/20" : "bg-blue-600/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
}