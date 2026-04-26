import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Wallet, PiggyBank } from "lucide-react";
import Link from "next/link";
import TransactionTable from "./_components/transaction-table";

export const dynamic = "force-dynamic";

const iconMap = {
  CHECKING: Wallet,
  SAVINGS: PiggyBank,
};


const AccountPage = async ({ params }) => {
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) return notFound();

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });

  const account = await db.account.findUnique({
    where: { id, userId: user.id },
    include: {
      transactions: {
        orderBy: { date: "desc" },
        take: 20,
      },
      _count: { select: { transactions: true } },
    },
  });

  if (!account) return notFound();

  // ✅ Serialize Decimal fields here
  const serializedTransactions = account.transactions.map((tx) => ({
    ...tx,
    amount: tx.amount.toNumber(),
  }));

  const Icon = iconMap[account.type] ?? Wallet;

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

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-16">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#185FA5,#1a7cc7)" }}
          >
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                {account.name}
              </h1>
              {account.isDefault && (
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-700/20 border border-blue-700/30 text-blue-400">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 capitalize mt-0.5">
              {account.type.toLowerCase()} account ·{" "}
              {account._count.transactions} transactions
            </p>
          </div>

          <div className="ml-auto text-right">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
              Current balance
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-white">
              ${Number(account.balance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>

        <TransactionTable transactions={serializedTransactions} />
      </div>
    </div>
  );
};

export default AccountPage;