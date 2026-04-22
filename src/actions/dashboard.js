"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  // Convert BigInt to number for balance field
  const serialized = { ...obj }; // Shallow copy of the object
  if (obj.balance) {
    // Check if balance field exists
    serialized.balance = obj.balance.toNumber(); // Convert BigInt to number
  }
  if (obj.amount) {
    // Check if amount field exists
    serialized.amount = obj.amount.toNumber(); // Convert BigInt to number
  }
  return serialized; // Return the serialized object
};

// what is serializeTransaction for?
// serializeTransaction is a helper function that takes an object
// (in this case, an account object) and converts any BigInt fields (specifically the balance field)
// to regular numbers. This is necessary because BigInt cannot be directly serialized to JSON, and converting
// it to a number allows it to be easily sent to the client or stored in a format that can be easily consumed.
// The function creates a shallow copy of the original object, checks if the balance field exists, and if it does,
// converts it from BigInt to a regular number before returning the modified object.

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    //convert balance to float before saving amount

    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    //check if its user first account, if so set it as primary
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      //update existing primary account to false
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        isDefault: shouldBeDefault,
        userId: user.id,
      },
    });
    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard"); //`\`/dashboard/${account.id}`); // Revalidate the dashboard path to update the UI with the new account
    return { success: true, account: serializedAccount }; // Return the created account
  } catch (error) {
    console.error("Create account error:", error);
    throw new Error(error.message ?? "Failed to create account");
  }
};

export async function getAccounts() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return [];

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    return accounts.map(serializeTransaction);
  } catch (error) {
    console.error("getAccounts error:", error);
    return [];
  }
}

export async function getDashboardData() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return null;

    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    return transactions.map(serializeTransaction);
  } catch (error) {
    console.error("getDashboardData error:", error);
    return [];
  }
}

export async function getBudgets() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return [];

    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // Get all expense transactions this month grouped by category
    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: { gte: startOfMonth, lte: endOfMonth },
      },
    });

    // Group spending by category
    const spendingByCategory = transactions.reduce((acc, tx) => {
      const category = tx.category || "OTHER";
      acc[category] = (acc[category] || 0) + tx.amount.toNumber();
      return acc;
    }, {});

    // Get budget if exists
    const budget = await db.budget.findUnique({
      where: { userId: user.id },
    });

    return {
      budget: budget ? serializeTransaction(budget) : null,
      spendingByCategory,
      totalSpent: Object.values(spendingByCategory).reduce((a, b) => a + b, 0),
    };
  } catch (error) {
    console.error("getBudgets error:", error);
    return { budget: null, spendingByCategory: {}, totalSpent: 0 };
  }
}

export async function setBudget(amount) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Upsert — create if doesn't exist, update if it does
    const budget = await db.budget.upsert({
      where: { userId: user.id },
      update: { amount: parseFloat(amount) },
      create: { userId: user.id, amount: parseFloat(amount) },
    });

    revalidatePath("/dashboard");
    return { success: true, budget: serializeTransaction(budget) };
  } catch (error) {
    console.error("setBudget error:", error);
    throw new Error(error.message ?? "Failed to set budget");
  }
}