import { inngest } from "@/lib/inngest/client";
import { db } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import BudgetAlertEmail from "@/emails/BudgetAlertEmail";
import MonthlyInsightEmail from "@/emails/MonthlyInsightEmail";

// ── 1. Check budget alerts (runs daily at 6am) ──────────────
export const checkBudgetAlerts = inngest.createFunction(
  {
    id: "check-budget-alerts",
    name: "Check Budget Alerts",
    triggers: [{ cron: "0 6 * * *" }],
  },
  async ({ step }) => {
    const budgets = await step.run("get-budgets", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: { where: { isDefault: true } },
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;

      await step.run(`check-budget-${budget.id}`, async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: { gte: startOfMonth, lte: endOfMonth },
          },
          _sum: { amount: true },
        });

        const totalExpenses = expenses._sum.amount
          ? expenses._sum.amount.toNumber()
          : 0;

        const budgetAmount = Number(budget.amount);
        const percentageUsed = (totalExpenses / budgetAmount) * 100;

        const shouldAlert =
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), now));

        if (shouldAlert) {
          await sendEmail({
            to: budget.user.email,
            subject:
              percentageUsed >= 100
                ? "🚨 You've exceeded your monthly budget — FinCoach"
                : `⚠️ You've used ${percentageUsed.toFixed(0)}% of your budget — FinCoach`,
            react: BudgetAlertEmail({
              userName: budget.user.name,
              budgetAmount,
              totalExpenses,
              percentageUsed,
              accountName: defaultAccount.name,
            }),
          });

          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: now },
          });
        }
      });
    }
  }
);

// ── 2. Monthly insights (runs 1st of every month at 8am) ────
export const sendMonthlyInsights = inngest.createFunction(
  {
    id: "send-monthly-insights",
    name: "Send Monthly Insights",
    triggers: [{ cron: "0 8 1 * *" }],
  },
  async ({ step }) => {
    const users = await step.run("get-users", async () => {
      return await db.user.findMany({
        include: {
          accounts: { where: { isDefault: true } },
          budgets: true,
        },
      });
    });

    for (const user of users) {
      await step.run(`send-insight-${user.id}`, async () => {
        const now = new Date();
        // Last month
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        const monthName = lastMonth.toLocaleString("default", { month: "long" });
        const year = lastMonth.getFullYear();

        const transactions = await db.transaction.findMany({
          where: {
            userId: user.id,
            date: { gte: lastMonth, lte: endOfLastMonth },
          },
        });

        if (transactions.length === 0) return;

        const totalIncome = transactions
          .filter((t) => t.type === "INCOME")
          .reduce((s, t) => s + t.amount.toNumber(), 0);

        const totalExpenses = transactions
          .filter((t) => t.type === "EXPENSE")
          .reduce((s, t) => s + t.amount.toNumber(), 0);

        const netSavings = totalIncome - totalExpenses;

        const spendingByCategory = transactions
          .filter((t) => t.type === "EXPENSE")
          .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount.toNumber();
            return acc;
          }, {});

        const topCategories = Object.entries(spendingByCategory)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const budget = user.budgets?.[0];
        const budgetAmount = budget ? Number(budget.amount) : null;
        const percentageUsed = budgetAmount
          ? (totalExpenses / budgetAmount) * 100
          : null;

        await sendEmail({
          to: user.email,
          subject: `📊 Your ${monthName} financial summary — FinCoach`,
          react: MonthlyInsightEmail({
            userName: user.name,
            month: monthName,
            year,
            totalIncome,
            totalExpenses,
            netSavings,
            topCategories,
            budgetAmount,
            percentageUsed,
          }),
        });
      });
    }
  }
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getFullYear() !== currentDate.getFullYear() ||
    lastAlertDate.getMonth() !== currentDate.getMonth()
  );
}