"use client";
import { accountSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Wallet, PiggyBank, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";

const accountTypes = [
  { value: "CHECKING", label: "Checking", icon: Wallet },
  { value: "SAVINGS", label: "Savings", icon: PiggyBank },
];

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CHECKING",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  // Success
  useEffect(() => {
    if (newAccount?.success) {
      toast.success("Account created successfully!");
      reset();
    }
  }, [newAccount, reset]);

  // Error
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  const selectedType = watch("type");
  const isDefault = watch("isDefault");

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  return (
    <div className="bg-[#06090f] border border-white/[0.08] rounded-2xl p-6 w-full">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#185FA5,#1a7cc7)" }}
          >
            <Wallet size={15} className="text-white" />
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">
            New account
          </h2>
        </div>
        <p className="text-xs text-slate-500 ml-10">
          Add a bank account to start tracking
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Account name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Account name
          </label>
          <Input
            placeholder="e.g., Main Checking"
            {...register("name")}
            className="bg-white/[0.03] border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10 focus:border-blue-700/50 focus:bg-white/[0.06] transition-all"
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Account type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Account type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {accountTypes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue("type", value)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                  selectedType === value
                    ? "bg-blue-700/20 border-blue-700/50 text-blue-300"
                    : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:border-white/10"
                }`}
              >
                <Icon size={14} />
                <span className="text-xs font-semibold">{label}</span>
              </button>
            ))}
          </div>
          {errors.type && (
            <p className="text-xs text-red-400">{errors.type.message}</p>
          )}
        </div>

        {/* Opening balance */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Opening balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("balance")}
              className="bg-white/[0.03] border-white/[0.08] text-slate-200 placeholder:text-slate-600 rounded-xl h-10 pl-7 focus:border-blue-700/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
          {errors.balance && (
            <p className="text-xs text-red-400">{errors.balance.message}</p>
          )}
        </div>

        {/* Set as default */}
        <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-slate-300">
              Set as default
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Use this account by default
            </div>
          </div>
          <Switch
            checked={isDefault}
            onCheckedChange={(val) => setValue("isDefault", val)}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={createAccountLoading}
          className="w-full h-10 rounded-xl text-sm font-bold text-white border-0 mt-2 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
            boxShadow: "0 0 0 1px rgba(91,168,232,0.25)",
            opacity: createAccountLoading ? 0.6 : 1,
          }}
        >
          {createAccountLoading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Creating...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;