"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
// import { checkUser } from "@/lib/checkUser";

const FinCoachLogo = () => (
  <svg width="160" height="44" viewBox="0 0 160 44" xmlns="http://www.w3.org/2000/svg">
    {/* Icon mark */}
    <rect width="40" height="40" x="0" y="2" rx="10" fill="#06090f" stroke="#1e3a5f" strokeWidth="1"/>

    {/* Rising bars */}
    <rect x="8"  y="28" width="6" height="10" rx="1.5" fill="#185FA5" opacity="0.4"/>
    <rect x="17" y="22" width="6" height="16" rx="1.5" fill="#185FA5" opacity="0.7"/>
    <rect x="26" y="15" width="6" height="23" rx="1.5" fill="#5ba8e8"/>

    {/* Trend line */}
    <polyline points="11,26 20,20 29,13"
      stroke="#5dcaa5" strokeWidth="2"
      fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="29" cy="13" r="2.5" fill="#5dcaa5"/>

    {/* Wordmark */}
    <text x="48" y="30"
      fontFamily="system-ui, sans-serif"
      fontSize="22" fontWeight="500" fill="#ffffff">
      Fin
    </text>
    <text x="76" y="30"
      fontFamily="system-ui, sans-serif"
      fontSize="22" fontWeight="400" fill="#5ba8e8">
      Coach
    </text>

    {/* AI badge */}
    <rect x="48" y="34" width="18" height="10" rx="3" fill="#185FA5" fillOpacity="0.2" stroke="#185FA5" strokeWidth="0.8"/>
    <text x="57" y="42"
      fontFamily="system-ui, sans-serif"
      fontSize="8" fontWeight="500" fill="#5ba8e8"
      textAnchor="middle">
      AI
    </text>
  </svg>
);

const Header = () => {
  // await checkUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 transition-all duration-300 ${
    scrolled
      ? "bg-[#06090f]/90 backdrop-blur-md border-b border-white/[0.06]"
      : "bg-[#06090f]/80 backdrop-blur-md border-b border-white/[0.04]"
  }`}
>
      <Link href="/" className="flex items-center">
        <FinCoachLogo />
      </Link>

      <nav className="flex items-center gap-3">
        <Show when="signed-in">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-2 border border-white/10"
            >
              <LayoutDashboard size={16} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          <Link href="/transaction/create">
            <Button
              className="flex items-center gap-2 text-white border-0"
              style={{
                background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
                boxShadow: "0 0 0 1px rgba(91,168,232,0.3)",
              }}
            >
              <PenBox size={16} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </Link>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-blue-700/40 ring-offset-2 ring-offset-[#06090f]",
              },
            }}
          />
        </Show>

        <Show when="signed-out">
          <SignInButton forceRedirectUrl="/dashboard">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
            >
              Sign In
            </Button>
          </SignInButton>

          <Link href="/sign-up">
            <Button
              className="text-white border-0"
              style={{
                background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
                boxShadow: "0 0 0 1px rgba(91,168,232,0.3)",
              }}
            >
              Get started free
            </Button>
          </Link>
        </Show>
      </nav>
    </header>
  );
};

export default Header;