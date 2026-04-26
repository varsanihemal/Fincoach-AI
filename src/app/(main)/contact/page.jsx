import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-8 pt-28 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1.5px] bg-blue-700" />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">
            Get in touch
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Contact us
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          Have a question, found a bug, or just want to say hi? We would love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="mailto:your@email.com"
            className="bg-white/[0.03] border border-white/[0.07] hover:border-blue-700/40 hover:bg-white/[0.06] rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Mail size={18} />
            </div>
            <div className="text-sm font-bold text-white mb-1">Email</div>
            <div className="text-sm text-slate-400 group-hover:text-blue-400 transition-colors">
              hemalvarsani123@gmail.com
            </div>
          </a>

          <a
            href="tel:+1234567890"
            className="bg-white/[0.03] border border-white/[0.07] hover:border-teal-700/40 hover:bg-white/[0.06] rounded-2xl p-6 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400">
              <Phone size={18} />
            </div>
            <div className="text-sm font-bold text-white mb-1">Phone</div>
            <div className="text-sm text-slate-400 group-hover:text-teal-400 transition-colors">
              +1 (431) 668-0244
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}