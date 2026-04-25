import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CHECKING", "SAVINGS"]),
  balance: z.string().min(1, "Balance is required"),
  isDefault: z.boolean().default(false),
});

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  accountId: z.string().min(1, "Account is required"),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]).optional(),
});