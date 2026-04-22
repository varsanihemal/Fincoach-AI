import Link from "next/link";
import { Wallet, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";

const iconMap = {
  CHECKING: Wallet,
  SAVINGS: PiggyBank,
};

const AccountCard = ({ account }) => {
  const Icon = iconMap[account.type] ?? Wallet;
  const isPositive = account.balance >= 0;

  return (
    <Link href={`/account/${account.id}`}>
      <div className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer">

        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#185FA5,#1a7cc7)" }}
            >
              <Icon size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-200">{account.name}</div>
              <div className="text-[11px] text-slate-600 capitalize">
                {account.type.toLowerCase()}
              </div>
            </div>
          </div>

          {/* Default badge */}
          {account.isDefault && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-700/20 border border-blue-700/30 text-blue-400">
              Default
            </span>
          )}
        </div>

        {/* Balance */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
            Balance
          </div>
          <div className="text-2xl font-extrabold tracking-tight text-white">
            ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
          <div className="text-[11px] text-slate-600">
            {account._count.transactions} transaction{account._count.transactions !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
            View account
            <ArrowUpRight size={12} />
          </div>
        </div>

      </div>
    </Link>
  );
};

export default AccountCard;