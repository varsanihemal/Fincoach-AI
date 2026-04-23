import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinCoach AI",
  description: "An AI-powered financial coach that provides personalized advice and guidance to help you achieve your financial goals.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="min-h-full flex flex-col bg-[#06090f]">
          <Header />
          <Toaster theme="dark" />
          <main className="min-h-screen bg-[#06090f]">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}