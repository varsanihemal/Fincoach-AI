import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-8 pt-28 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1.5px] bg-blue-700" />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">Our story</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">About FinCoach</h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          FinCoach AI was built with one belief — everyone deserves a personal financial advisor, not just people who can afford one.
        </p>

        <div className="space-y-8">
          {[
            {
              title: "The problem we're solving",
              body: "Most people have no real idea where their money goes. Banks give you statements, not insights. Spreadsheets are powerful but nobody keeps them up to date. FinCoach bridges that gap — it tracks everything automatically and speaks to you in plain language about your finances.",
            },
            {
              title: "How AI changes the game",
              body: "FinCoach uses Gemini AI to give you personalised financial advice based on your actual data — not generic tips. Ask it anything: can I afford this trip? Where am I overspending? Am I on track? It knows your numbers and answers honestly.",
            },
            {
              title: "Built for real people",
              body: "FinCoach is designed for people who want to be smarter with money but don't want to become accountants. The interface is clean, the insights are human, and the AI never judges — it just helps.",
            },
            {
              title: "Privacy first",
              body: "Your financial data never leaves our secure infrastructure. We use industry-standard encryption, and your data is never used to train AI models or shared with third parties.",
            },
          ].map((s) => (
            <div key={s.title} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-3">{s.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-700/20 to-teal-500/10 border border-blue-700/30 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready to take control?</h2>
          <p className="text-slate-400 text-sm mb-5">Join thousands of people already using FinCoach to manage their money smarter.</p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#185FA5,#1a7cc7)", boxShadow: "0 0 0 1px rgba(91,168,232,0.25)" }}>
            Get started free
          </Link>
        </div>
      </div>
    </div>
  );
}