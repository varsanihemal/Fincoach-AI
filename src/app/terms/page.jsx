import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  { title: "Acceptance of terms", body: "By using FinCoach, you agree to these Terms of Service. If you do not agree, please do not use the service. These terms apply to all users of the platform." },
  { title: "Description of service", body: "FinCoach is a personal finance management application that allows users to track income, expenses, and budgets, and receive AI-powered financial insights. The service is provided as-is and may change over time." },
  { title: "User responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials. You agree not to use FinCoach for any unlawful purpose. You are responsible for the accuracy of financial data you enter." },
  { title: "Financial advice disclaimer", body: "FinCoach provides general financial information and AI-generated insights for informational purposes only. Nothing in the application constitutes professional financial advice. Always consult a qualified financial advisor for major financial decisions." },
  { title: "Data and privacy", body: "Your use of FinCoach is also governed by our Privacy Policy. By using the service, you consent to the collection and use of your information as described therein." },
  { title: "Limitation of liability", body: "FinCoach is not liable for any financial decisions made based on information provided by the application. We provide tools and insights to help you understand your finances, but all financial decisions remain yours." },
  { title: "Termination", body: "You may terminate your account at any time. We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your data will be deleted in accordance with our Privacy Policy." },
  { title: "Changes to terms", body: "We may update these terms from time to time. We will notify users of material changes via email. Continued use of the service constitutes acceptance of the updated terms." },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative z-10 max-w-3xl mx-auto px-8 pt-28 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
          <ArrowLeft size={15} /> Back to home
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1.5px] bg-blue-700" />
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">Legal</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: April 2026</p>
        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.title} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white mb-2">{s.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}