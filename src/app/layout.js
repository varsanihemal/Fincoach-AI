import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinCoach AI",
  description:
    "An AI-powered financial coach that provides personalized advice and guidance to help you achieve your financial goals.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="min-h-full flex flex-col">
          {/* header */}
          <Header />
          {/* main content */}
          <main className="min-h-screen">{children}</main>
          {/* footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
