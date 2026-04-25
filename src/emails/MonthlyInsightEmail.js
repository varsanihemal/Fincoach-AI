import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Row, Column, Hr,
} from "@react-email/components";

export default function MonthlyInsightEmail({
  userName = "there",
  month = "January",
  year = 2026,
  totalIncome = 0,
  totalExpenses = 0,
  netSavings = 0,
  topCategories = [],
  budgetAmount = null,
  percentageUsed = null,
}) {
  const savingsRate = totalIncome > 0
    ? ((netSavings / totalIncome) * 100).toFixed(0)
    : 0;

  return (
    <Html>
      <Head />
      <Preview>📊 Your {month} financial summary is ready</Preview>
      <Body style={{ backgroundColor: "#06090f", fontFamily: "system-ui, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>

          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Heading style={{ color: "#5ba8e8", fontSize: "24px", fontWeight: "800", margin: "0 0 8px" }}>
              FinCoach AI
            </Heading>
            <Text style={{ color: "#4a5568", fontSize: "13px", margin: 0 }}>
              Monthly Financial Insight — {month} {year}
            </Text>
          </Section>

          <Text style={{ color: "#e2e8f0", fontSize: "16px", margin: "0 0 24px" }}>
            Hi {userName} 👋 Here's your financial summary for {month}.
          </Text>

          {/* Summary stats */}
          <Section style={{
            backgroundColor: "#0d1b2e",
            border: "1px solid #1e3a5f",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
          }}>
            <Row>
              <Column style={{ textAlign: "center", padding: "0 8px" }}>
                <Text style={{ color: "#4a5568", fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Income</Text>
                <Text style={{ color: "#5dcaa5", fontSize: "22px", fontWeight: "800", margin: 0 }}>
                  ${Number(totalIncome).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
              </Column>
              <Column style={{ textAlign: "center", padding: "0 8px" }}>
                <Text style={{ color: "#4a5568", fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Expenses</Text>
                <Text style={{ color: "#f09595", fontSize: "22px", fontWeight: "800", margin: 0 }}>
                  ${Number(totalExpenses).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
              </Column>
              <Column style={{ textAlign: "center", padding: "0 8px" }}>
                <Text style={{ color: "#4a5568", fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>Saved</Text>
                <Text style={{ color: netSavings >= 0 ? "#5dcaa5" : "#f09595", fontSize: "22px", fontWeight: "800", margin: 0 }}>
                  {netSavings < 0 ? "-" : ""}${Math.abs(netSavings).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Savings rate */}
          <Section style={{
            backgroundColor: "#0a1520",
            border: "1px solid #1e3a5f",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "24px",
          }}>
            <Text style={{ color: "#8892a4", fontSize: "13px", margin: "0 0 4px" }}>
              Savings rate this month
            </Text>
            <Text style={{ color: "#5ba8e8", fontSize: "28px", fontWeight: "800", margin: 0 }}>
              {savingsRate}%
            </Text>
          </Section>

          {/* Top categories */}
          {topCategories.length > 0 && (
            <Section style={{
              backgroundColor: "#0d1b2e",
              border: "1px solid #1e3a5f",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
            }}>
              <Text style={{ color: "#4a5568", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 16px" }}>
                Top spending categories
              </Text>
              {topCategories.map(([category, amount], i) => (
                <Row key={category} style={{ marginBottom: "12px" }}>
                  <Column>
                    <Text style={{ color: "#e2e8f0", fontSize: "13px", margin: 0 }}>
                      {i + 1}. {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                    </Text>
                  </Column>
                  <Column style={{ textAlign: "right" }}>
                    <Text style={{ color: "#f09595", fontSize: "13px", fontWeight: "700", margin: 0 }}>
                      ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          )}

          {/* Budget summary */}
          {budgetAmount && percentageUsed !== null && (
            <Section style={{
              backgroundColor: percentageUsed >= 100 ? "#2d1515" : "#0a1520",
              border: `1px solid ${percentageUsed >= 100 ? "#7f2020" : "#1e3a5f"}`,
              borderRadius: "12px",
              padding: "16px 20px",
              marginBottom: "24px",
            }}>
              <Text style={{ color: "#8892a4", fontSize: "13px", margin: "0 0 4px" }}>
                Budget used this month
              </Text>
              <Text style={{
                color: percentageUsed >= 100 ? "#f09595" : percentageUsed >= 80 ? "#fbbf24" : "#5dcaa5",
                fontSize: "24px", fontWeight: "800", margin: 0,
              }}>
                {percentageUsed.toFixed(0)}% of ${Number(budgetAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </Section>
          )}

          <Hr style={{ borderColor: "#1e3a5f", marginBottom: "20px" }} />
          <Text style={{ color: "#2a3a4a", fontSize: "11px", textAlign: "center", margin: 0 }}>
            FinCoach AI · Monthly insights are sent on the 1st of each month.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}