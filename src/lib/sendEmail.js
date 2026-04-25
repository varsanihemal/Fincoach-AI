import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, react }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      react,
    });

    if (error) {
      console.error("Email send error:", error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("sendEmail error:", error);
    throw error;
  }
}