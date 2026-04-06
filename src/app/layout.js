import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinCoach AI",
  description:
    "An AI-powered financial coach that provides personalized advice and guidance to help you achieve your financial goals.",
};

export default function RootLayout({ hildrenc }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="min-h-full flex flex-col">
          {/* header */}
          <Header />
          {/* main content */}
          <main className="min-h-screen">{children}</main>
          {/* footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>
                &copy; {new Date().getFullYear()} FinCoach AI. All rights
                reserved.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
