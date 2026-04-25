"use client";
import { useState } from "react";
import { X } from "lucide-react";
import AddTransactionForm from "./AddTransactionForm";

const TransactionDrawer = ({ accounts, defaultAccountId, trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger element */}
      <div onClick={() => setOpen(true)}>{trigger}</div>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#06090f] border-l border-white/[0.08] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] sticky top-0 bg-[#06090f] z-10">
              <div>
                <h2 className="text-base font-bold text-white">Add transaction</h2>
                <p className="text-xs text-slate-500 mt-0.5">Record a new income or expense</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5">
              <AddTransactionForm
                accounts={accounts}
                defaultAccountId={defaultAccountId}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionDrawer;