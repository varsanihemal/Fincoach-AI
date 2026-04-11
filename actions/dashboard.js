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
    throw new Error("Failed to create account");
  }
}
