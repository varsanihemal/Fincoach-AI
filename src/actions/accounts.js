"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const account = await db.account.update({
      where: { id: accountId },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    console.error("updateDefaultAccount error:", error);
    throw new Error(error.message ?? "Failed to update default account");
  }
}

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

export async function getAccountWithTransactions(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const account = await db.account.findUnique({
      where: { id: accountId, userId: user.id },
      include: {
        transactions: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: { transactions: true }, // ← moved out of transactions include
        },
      },
    });

    if (!account) throw new Error("Account not found");

    return {
      ...serializeTransaction(account),
      transactions: account.transactions.map(serializeTransaction), // ← was unreachable
    };
  } catch (error) {
    console.error("getAccountWithTransactions error:", error);
    throw new Error(error.message ?? "Failed to fetch account");
  }
}

export async function bulkDeleteTransactions(transactionIds) {
  // ← was missing param
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Calculate how each account balance should change after deletion
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const amount = transaction.amount.toNumber(); // ← convert Decimal to number first
      const change = transaction.type === "EXPENSE" ? -amount : amount;
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    // Delete transactions and update balances atomically
    await db.$transaction(async (tx) => {
      // ← was db$transaction (missing dot)
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges,
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transactions[0]?.accountId}`);
    return { success: true };
  } catch (error) {
    console.error("bulkDeleteTransactions error:", error);
    throw new Error(error.message ?? "Failed to delete transactions");
  }
}
