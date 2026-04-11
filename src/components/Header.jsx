"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
// import { checkUser } from "@/lib/checkUser";

const FinCoachLogo = () => (
  <svg width="160" height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" x="0" y="2" rx="7" fill="#185FA5" />
    <rect x="6" y="24" width="6" height="10" fill="#fff" opacity="0.5" />
    <rect x="15" y="18" width="6" height="16" fill="#fff" opacity="0.75" />
    <rect x="24" y="12" width="6" height="22" fill="#fff" />
    <polyline
      points="6,24 15,16 24,10 30,7"
      stroke="#FAC775"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text x="44" y="28" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="600" fill="#fff">
      Fin
    </text>
    <text x="72" y="28" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="400" fill="#5ba8e8">
      Coach
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