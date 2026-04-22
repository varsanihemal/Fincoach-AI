// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "fincoach", name: "FinCoach",
    retryFunction: async (attempt, error) => {
        console.error(`Inngest function failed on attempt ${attempt}:`, error);
        // Retry up to 3 times with exponential backoff
        if (attempt < 3) {
            const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
            await new Promise((resolve) => setTimeout(resolve, delay));
            return true; // Retry
        }
        return false; // Don't retry
    },
 });