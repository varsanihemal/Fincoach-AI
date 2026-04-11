import z from "zod";

export const accountSchema = z.object({
    name: z.string().min(1, "Account name is required"),
    type: z.enum(["CHECKING", "SAVINGS"]),
    balance: z.string().min(1, "Balance is required").refine((value) => {
        const parsed = parseFloat(value);
        return !isNaN(parsed) && parsed >= 0;
    }, "Balance must be a valid non-negative number"),
    isDefault: z.boolean().default(false),
});