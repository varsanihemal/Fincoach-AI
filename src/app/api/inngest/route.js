import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlerts, sendMonthlyInsights } from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [checkBudgetAlerts, sendMonthlyInsights],
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";