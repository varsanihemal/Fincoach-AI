import { seedTransactions } from "@/actions/seed";

export async function GET(request) {
    const result = await seedTransactions();
    return Response.json(result);
}