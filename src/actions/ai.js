"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function chatWithAI(userMessage, chatHistory = []) {
  try {
    const { userId } = await auth();
    // Instead of throwing an error, return a friendly prompt
    if (!userId) {
      return { 
        success: true, 
        message: "I'd love to help you with that! Please Sign In so I can access your financial data and give you accurate advice. 🔑" 
      };
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    const [accounts, transactions, budget] = await Promise.all([
      db.account.findMany({
        where: { userId: user.id },
        include: { _count: { select: { transactions: true } } },
      }),
      db.transaction.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
        take: 10,
      }),
      db.budget.findUnique({ where: { userId: user.id } }),
    ]);

    const serializedAccounts = accounts.map((a) => ({
      name: a.name,
      type: a.type,
      balance: a.balance.toNumber(),
      isDefault: a.isDefault,
      transactionCount: a._count.transactions,
    }));

    const serializedTransactions = transactions.map((t) => ({
      type: t.type,
      amount: t.amount.toNumber(),
      category: t.category,
      description: t.description,
      date: t.date.toISOString().split("T")[0],
      isRecurring: t.isRecurring,
    }));

    const totalBalance = serializedAccounts.reduce((s, a) => s + a.balance, 0);

    const now = new Date();
    const thisMonthTxs = serializedTransactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const monthlyIncome = thisMonthTxs
      .filter((t) => t.type === "INCOME")
      .reduce((s, t) => s + t.amount, 0);

    const monthlyExpenses = thisMonthTxs
      .filter((t) => t.type === "EXPENSE")
      .reduce((s, t) => s + t.amount, 0);

    const spendingByCategory = thisMonthTxs
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const financialContext = `
You are FinCoach AI, a personal financial advisor. You have access to the user's real financial data.
Be conversational, specific, and honest. Always reference their actual numbers. Keep responses concise.
Use emojis sparingly. Never give generic advice — always reference their specific situation.

USER: ${user.name}
TOTAL BALANCE: $${totalBalance.toFixed(2)}
ACCOUNTS: ${serializedAccounts.map((a) => `${a.name} (${a.type}): $${a.balance.toFixed(2)}${a.isDefault ? " [Default]" : ""}`).join(", ")}
MONTHLY BUDGET: ${budget ? `$${Number(budget.amount).toFixed(2)}` : "Not set"}
THIS MONTH INCOME: $${monthlyIncome.toFixed(2)}
THIS MONTH EXPENSES: $${monthlyExpenses.toFixed(2)}
NET THIS MONTH: $${(monthlyIncome - monthlyExpenses).toFixed(2)}
SPENDING BY CATEGORY: ${Object.entries(spendingByCategory).map(([k, v]) => `${k}: $${v.toFixed(2)}`).join(", ") || "No expenses yet"}
RECENT TRANSACTIONS: ${serializedTransactions.slice(0, 8).map((t) => `${t.date} ${t.type} $${t.amount.toFixed(2)} ${t.category}${t.description ? ` (${t.description})` : ""}`).join(" | ")}
    `.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const history = chatHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: financialContext }],
        },
        {
          role: "model",
          parts: [{ text: `Got it! I have full access to ${user.name}'s financial data and I'm ready to help.` }],
        },
        ...history,
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return { success: true, message: response.text() };
  } catch (error) {
    console.error("AI chat error:", error);
    throw new Error(error.message ?? "Failed to get AI response");
  }
}