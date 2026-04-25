"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./ui/select";
import {
  ArrowUpRight, ArrowDownRight, Loader2, ScanLine, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { createTransaction, scanReceipt } from "@/actions/transactions";

const CATEGORIES = {
  EXPENSE: ["FOOD", "TRANSPORT", "ENTERTAINMENT", "SHOPPING", "UTILITIES", "HEALTH", "OTHER"],
  INCOME: ["SALARY", "FREELANCE", "INVESTMENT", "GIFT", "OTHER"],
};

const AddTransactionForm = ({ accounts, defaultAccountId, onSuccess }) => {
  const fileRef = useRef(null);
  const [scanPreview, setScanPreview] = useState(null);

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      date: new Date().toISOString().split("T")[0],
      accountId: defaultAccountId || accounts?.[0]?.id || "",
      isRecurring: false,
    },
  });

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const categories = CATEGORIES[type] || CATEGORIES.EXPENSE;

  const { fn: createFn, loading: createLoading, data: createResult } = useFetch(createTransaction);
  const { fn: scanFn, loading: scanLoading } = useFetch(scanReceipt);

  useEffect(() => {
    if (createResult?.success) {
      toast.success("Transaction added!");
      reset();
      setScanPreview(null);
      onSuccess?.();
    }
  }, [createResult]);

  const onSubmit = async (data) => {
    await createFn(data);
  };

  const handleScanReceipt = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target.result.split(",")[1];
      setScanPreview(event.target.result);

      const result = await scanFn(base64);
      if (result?.success && result.data) {
        const { amount, date, description, category, type: txType } = result.data;
        if (amount) setValue("amount", String(amount));
        if (date) setValue("date", date);
        if (description) setValue("description", description);
        if (category) setValue("category", category);
        if (txType) setValue("type", txType);
        toast.success("Receipt scanned! Review and submit.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">

      {/* AI Receipt Scanner */}
      <div
        className="relative flex items-center justify-between bg-gradient-to-r from-blue-700/20 to-teal-500/10 border border-blue-700/30 rounded-2xl px-5 py-4 cursor-pointer hover:from-blue-700/30 transition-all"
        onClick={() => fileRef.current?.click()}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#185FA5,#5dcaa5)" }}
          >
            {scanLoading
              ? <Loader2 size={18} className="text-white animate-spin" />
              : <ScanLine size={18} className="text-white" />}
          </div>
          <div>
            <div className="text-sm font-bold text-white">AI Receipt Scanner</div>
            <div className="text-xs text-slate-500">
              {scanLoading ? "Scanning receipt..." : "Upload a receipt to auto-fill the form"}
            </div>
          </div>
        </div>
        {scanPreview && (
          <div className="flex items-center gap-2">
            <img src={scanPreview} alt="Receipt" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setScanPreview(null); }}
              className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X size={11} />
            </button>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleScanReceipt}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Type toggle */}
        <div className="grid grid-cols-2 gap-2">
          {["EXPENSE", "INCOME"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setValue("type", t); setValue("category", ""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                type === t
                  ? t === "EXPENSE"
                    ? "bg-red-500/20 border-red-500/40 text-red-300"
                    : "bg-teal-500/20 border-teal-500/40 text-teal-300"
                  : "bg-white/[0.02] border-white/[0.06] text-slate-400"
              }`}
            >
              {t === "EXPENSE"
                ? <ArrowDownRight size={15} />
                : <ArrowUpRight size={15} />}
              {t}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount")}
              className="bg-white/[0.03] border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10 pl-7"
            />
          </div>
          {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
        </div>

        {/* Account */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">Account</label>
          <Select
            value={watch("accountId")}
            onValueChange={(val) => setValue("accountId", val)}
          >
            <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-slate-200 rounded-xl h-10">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1620] border-white/[0.08]">
              {accounts?.map((acc) => (
                <SelectItem key={acc.id} value={acc.id} className="text-slate-200">
                  {acc.name} (${Number(acc.balance).toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.accountId && <p className="text-xs text-red-400">{errors.accountId.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">Category</label>
          <Select
            value={watch("category")}
            onValueChange={(val) => setValue("category", val)}
          >
            <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-slate-200 rounded-xl h-10">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1620] border-white/[0.08]">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-slate-200">
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">Date</label>
          <Input
            type="date"
            {...register("date")}
            className="bg-white/[0.03] border-white/[0.08] text-slate-200 rounded-xl h-10"
          />
          {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Description <span className="text-slate-700 normal-case tracking-normal">(optional)</span>
          </label>
          <Input
            placeholder="e.g. Grocery run at Walmart"
            {...register("description")}
            className="bg-white/[0.03] border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10"
          />
        </div>

        {/* Recurring toggle */}
        <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-slate-300">Recurring transaction</div>
            <div className="text-xs text-slate-600 mt-0.5">Repeat this transaction automatically</div>
          </div>
          <Switch
            checked={isRecurring}
            onCheckedChange={(val) => setValue("isRecurring", val)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        {/* Recurring interval */}
        {isRecurring && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">Repeat every</label>
            <Select
              value={watch("recurringInterval")}
              onValueChange={(val) => setValue("recurringInterval", val)}
            >
              <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-slate-200 rounded-xl h-10">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1620] border-white/[0.08]">
                {["DAILY", "WEEKLY", "MONTHLY", "YEARLY"].map((i) => (
                  <SelectItem key={i} value={i} className="text-slate-200">
                    {i.charAt(0) + i.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={createLoading}
          className="w-full h-10 rounded-xl text-sm font-bold text-white border-0 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
            boxShadow: "0 0 0 1px rgba(91,168,232,0.25)",
            opacity: createLoading ? 0.6 : 1,
          }}
        >
          {createLoading ? <><Loader2 size={15} className="animate-spin" /> Adding...</> : "Add transaction"}
        </Button>
      </form>
    </div>
  );
};

export default AddTransactionForm;