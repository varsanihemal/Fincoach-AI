import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Row, Column, Hr,
} from "@react-email/components";

export default function BudgetAlertEmail({
  userName = "there",
  budgetAmount = 0,
  totalExpenses = 0,
  percentageUsed = 0,
  accountName = "Default Account",
}) {
  const remaining = budgetAmount - totalExpenses;
  const isOver = percentageUsed >= 100;

  return (
    <Html>
      <Head />
      <Preview>
        {isOver
          ? `⚠️ You've exceeded your budget this month`
          : `⚠️ You've used ${percentageUsed.toFixed(0)}% of your monthly budget`}
      </Preview>
      <Body style={{ backgroundColor: "#06090f", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>

          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Heading style={{ color: "#5ba8e8", fontSize: "24px", fontWeight: "800", margin: "0 0 8px" }}>
              FinCoach AI
            </Heading>
            <Text style={{ color: "#4a5568", fontSize: "13px", margin: 0 }}>
              Your personal finance companion
            </Text>
          </Section>

          {/* Alert card */}
          <Section style={{
            backgroundColor: isOver ? "#2d1515" : "#1a1f2e",
            border: `1px solid ${isOver ? "#7f2020" : "#1e3a5f"}`,
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "24px",
          }}>
            <Text style={{ fontSize: "28px", margin: "0 0 8px", textAlign: "center" }}>
              {isOver ? "🚨" : "⚠️"}
            </Text>
            <Heading style={{
              color: isOver ? "#f09595" : "#5ba8e8",
              fontSize: "20px",
              fontWeight: "700",
              textAlign: "center",
              margin: "0 0 8px",
            }}>
              {isOver ? "Budget Exceeded!" : "Budget Alert"}
            </Heading>
            <Text style={{ color: "#8892a4", textAlign: "center", fontSize: "14px", margin: "0 0 24px" }}>
              Hi {userName}, you've used{" "}
              <strong style={{ color: "#fff" }}>{percentageUsed.toFixed(0)}%</strong>{" "}
              of your monthly budget on <strong style={{ color: "#fff" }}>{accountName}</strong>.
            </Text>

            <Hr style={{ borderColor: "#1e3a5f", margin: "0 0 24px" }} />

            {/* Stats */}
            <Row>
              <Column style={{ textAlign: "center", padding: "0 12px" }}>
                <Text style={{ color: "#4a5568", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
                  Monthly Budget
                </Text>
                <Text style={{ color: "#fff", fontSize: "20px", fontWeight: "800", margin: 0 }}>
                  ${Number(budgetAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
              </Column>
              <Column style={{ textAlign: "center", padding: "0 12px" }}>
                <Text style={{ color: "#4a5568", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
                  Total Spent
                </Text>
                <Text style={{ color: "#f09595", fontSize: "20px", fontWeight: "800", margin: 0 }}>
                  ${Number(totalExpenses).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
              </Column>
              <Column style={{ textAlign: "center", padding: "0 12px" }}>
                <Text style={{ color: "#4a5568", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
                  Remaining
                </Text>
                <Text style={{
                  color: remaining < 0 ? "#f09595" : "#5dcaa5",
                  fontSize: "20px", fontWeight: "800", margin: 0,
                }}>
                  {remaining < 0 ? "-" : ""}${Math.abs(remaining).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Progress bar */}
          <Section style={{ marginBottom: "24px" }}>
            <div style={{
              backgroundColor: "#1a1f2e",
              borderRadius: "8px",
              height: "8px",
              overflow: "hidden",
            }}>
              <div style={{
                backgroundColor: isOver ? "#ef4444" : percentageUsed >= 80 ? "#f59e0b" : "#5dcaa5",
                height: "8px",
                width: `${Math.min(percentageUsed, 100)}%`,
                borderRadius: "8px",
              }} />
            </div>
          </Section>

          <Text style={{ color: "#4a5568", fontSize: "13px", textAlign: "center", margin: "0 0 32px" }}>
            {isOver
              ? "You've gone over budget. Consider reviewing your expenses."
              : "You're approaching your limit. Keep an eye on your spending."}
          </Text>

          <Hr style={{ borderColor: "#1e3a5f", marginBottom: "20px" }} />
          <Text style={{ color: "#2a3a4a", fontSize: "11px", textAlign: "center", margin: 0 }}>
            FinCoach AI · You're receiving this because budget alerts are enabled.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}