import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, FileText } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-8 pt-28 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1.5px] bg-blue-700" />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">Get in touch</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Contact us</h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-12">
          Have a question, found a bug, or just want to say hi? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <Mail size={18} />, title: "Email support", desc: "support@fincoach.ai", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/20" },
            { icon: <MessageCircle size={18} />, title: "AI Chat", desc: "Use the chat bubble on any page", color: "text-teal-400", bg: "bg-teal-500/15 border-teal-500/20" },
            { icon: <FileText size={18} />, title: "Documentation", desc: "guides and FAQs", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/20" },
          ].map((c) => (
            <div key={c.title} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 border ${c.bg} ${c.color}`}>
                {c.icon}
              </div>
              <div className="text-sm font-bold text-white mb-1">{c.title}</div>
              <div className="text-xs text-slate-500">{c.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-5">Send a message</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1.5 block">Name</label>
                <input type="text" placeholder="Your name" className="w-full bg-white/[0.03] border border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10 px-3 text-sm outline-none focus:border-blue-700/50 transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1.5 block">Email</label>
                <input type="email" placeholder="you@email.com" className="w-full bg-white/[0.03] border border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10 px-3 text-sm outline-none focus:border-blue-700/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1.5 block">Message</label>
              <textarea rows={4} placeholder="How can we help?" className="w-full bg-white/[0.03] border border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-700/50 transition-all resize-none" />
            </div>
            <button className="w-full h-10 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#185FA5,#1a7cc7)", boxShadow: "0 0 0 1px rgba(91,168,232,0.25)" }}>
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}