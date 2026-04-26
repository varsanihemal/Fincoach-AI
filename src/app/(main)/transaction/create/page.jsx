import { getAccounts } from "@/actions/accounts";
import AddTransactionForm from "@/components/AddTransactionForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const CreateTransactionPage = async () => {
  const accounts = await getAccounts();
  const defaultAccount = accounts.find((a) => a.isDefault);

  return (
    <div className="min-h-screen bg-[#06090f] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-6 pt-24 pb-16">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[1.5px] bg-blue-700" />
            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-500">
              New transaction
            </span>
          </div>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #fff 40%, #5ba8e8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Add Transaction
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Record a new income or expense
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <AddTransactionForm
            accounts={accounts}
            defaultAccountId={defaultAccount?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionPage;