"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function chatWithAI(userMessage, chatHistory = []) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Fetch user's complete financial context
    const [accounts, transactions, budget] = await Promise.all([
      db.account.findMany({
        where: { userId: user.id },
        include: { _count: { select: { transactions: true } } },
      }),
      db.transaction.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
        take: 50,
      }),
      db.budget.findUnique({ where: { userId: user.id } }),
    ]);

    // Serialize decimals
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
      recurringInterval: t.recurringInterval,
    }));

    // Calculate key financial metrics
    const totalBalance = serializedAccounts.reduce((s, a) => s + a.balance, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthTxs = serializedTransactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const monthlyIncome = thisMonthTxs
      .filter((t) => t.type === "INCOME")
      .reduce((s, t) => s + t.amount, 0);

    const monthlyExpenses = thisMonthTxs
      .filter((t) => t.type === "EXPENSE")
      .reduce((s, t) => s + t.amount, 0);

    const monthlySavings = monthlyIncome - monthlyExpenses;

    const spendingByCategory = thisMonthTxs
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const recurringExpenses = serializedTransactions
      .filter((t) => t.isRecurring && t.type === "EXPENSE")
      .reduce((s, t) => s + t.amount, 0);

    // Build the financial context string
    const financialContext = `
You are FinCoach AI, a personal financial advisor integrated into the FinCoach app.
You have access to the user's real financial data. Be conversational, helpful, honest, and specific.
Use actual numbers from their data in your responses. Keep responses concise but insightful.
Use emojis sparingly to make responses friendly. Never give generic advice — always reference their specific situation.

USER'S FINANCIAL SNAPSHOT:
- Name: ${user.name}
- Total balance across all accounts: $${totalBalance.toFixed(2)}
- Number of accounts: ${serializedAccounts.length}
- Monthly budget limit: ${budget ? `$${Number(budget.amount).toFixed(2)}` : "Not set"}

ACCOUNTS:
${serializedAccounts.map((a) => `- ${a.name} (${a.type}): $${a.balance.toFixed(2)}${a.isDefault ? " [Default]" : ""}`).join("\n")}

THIS MONTH'S SUMMARY:
- Income: $${monthlyIncome.toFixed(2)}
- Expenses: $${monthlyExpenses.toFixed(2)}
- Net savings: $${monthlySavings.toFixed(2)}
- Budget used: ${budget ? `${((monthlyExpenses / Number(budget.amount)) * 100).toFixed(0)}% of $${Number(budget.amount).toFixed(2)}` : "No budget set"}

SPENDING BY CATEGORY THIS MONTH:
${Object.entries(spendingByCategory).length > 0
  ? Object.entries(spendingByCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `- ${cat}: $${amt.toFixed(2)}`)
      .join("\n")
  : "No expenses this month"}

RECENT TRANSACTIONS (last 50):
${serializedTransactions.slice(0, 20).map((t) =>
  `- ${t.date} | ${t.type} | $${t.amount.toFixed(2)} | ${t.category}${t.description ? ` | ${t.description}` : ""}${t.isRecurring ? ` | Recurring ${t.recurringInterval}` : ""}`
).join("\n")}

RECURRING EXPENSES TOTAL: $${recurringExpenses.toFixed(2)}/month
    `.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build chat history for context
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
          parts: [{ text: `Got it! I have full access to ${user.name}'s financial data and I'm ready to help with any questions about their finances.` }],
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