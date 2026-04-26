import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  { title: "Information we collect", body: "We collect information you provide directly — your name, email address, and financial transaction data you enter manually. We also collect usage data such as pages visited and features used to improve the product. We do not collect your bank credentials or connect to your bank accounts directly." },
  { title: "How we use your information", body: "Your data is used solely to provide the FinCoach service — displaying your financial overview, generating AI insights, and sending budget alerts. We never sell your data to third parties. We never use your financial data to train AI models." },
  { title: "Data storage and security", body: "All data is stored in encrypted PostgreSQL databases hosted on Supabase infrastructure in the United States. Data in transit is encrypted using TLS 1.3. Authentication is handled by Clerk, which is SOC 2 Type II certified." },
  { title: "AI and your data", body: "When you use the FinCoach AI chat feature, a summary of your financial data is sent to Google's Gemini API to generate responses. This data is subject to Google's API data usage policies. We send only aggregated summaries — never raw transaction IDs or personally identifiable information beyond what's necessary." },
  { title: "Your rights", body: "You may request deletion of your account and all associated data at any time by contacting support@fincoach.ai. Upon request, we will delete all personal data within 30 days. You may also export your transaction data at any time from your account settings." },
  { title: "Cookies", body: "FinCoach uses strictly necessary cookies for authentication session management. We do not use tracking cookies, advertising cookies, or third-party analytics cookies." },
  { title: "Changes to this policy", body: "We may update this policy as the product evolves. We will notify users of material changes via email. Continued use of FinCoach after changes constitutes acceptance of the updated policy." },
];

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Privacy Policy</h1>
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