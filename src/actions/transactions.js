"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) serialized.balance = obj.balance.toNumber();
  if (obj.amount) serialized.amount = obj.amount.toNumber();
  return serialized;
};

export async function createTransaction(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) throw new Error("User not found");

    const account = await db.account.findUnique({
      where: { id: data.accountId, userId: user.id },
    });
    if (!account) throw new Error("Account not found");

    const amountFloat = parseFloat(data.amount);
    if (isNaN(amountFloat)) throw new Error("Invalid amount");

    // Update account balance
    const balanceChange = data.type === "EXPENSE" ? -amountFloat : amountFloat;

    const [transaction] = await db.$transaction([
      db.transaction.create({
        data: {
          type: data.type,
          amount: amountFloat,
          description: data.description || "",
          date: new Date(data.date),
          category: data.category,
          isRecurring: data.isRecurring || false,
          recurringInterval: data.isRecurring ? data.recurringInterval : null,
          status: "COMPLETED",
          userId: user.id,
          accountId: data.accountId,
        },
      }),
      db.account.update({
        where: { id: data.accountId },
        data: { balance: { increment: balanceChange } },
      }),
    ]);

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);
    return { success: true, transaction: serializeTransaction(transaction) };
  } catch (error) {
    console.error("createTransaction error:", error);
    throw new Error(error.message ?? "Failed to create transaction");
  }
}

export async function scanReceipt(base64Image) {
  try {
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze this receipt image and extract the following information in JSON format only. No markdown, no explanation, just raw JSON:
{
  "amount": number (total amount, no currency symbol),
  "date": "YYYY-MM-DD" (date of transaction),
  "description": "string" (merchant name or description),
  "category": "string" (one of: FOOD, TRANSPORT, ENTERTAINMENT, SHOPPING, UTILITIES, HEALTH, OTHER),
  "type": "EXPENSE"
}
If you cannot determine a value, use null.`;

    const result = await model.generateContent([
      { inlineData: { mimeType: "image/jpeg", data: base64Image } },
      prompt,
    ]);

    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return { success: true, data: parsed };
  } catch (error) {
    console.error("scanReceipt error:", error);
    throw new Error("Failed to scan receipt");
  }
}