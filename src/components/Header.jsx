import React from "react";
import { Show } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 fixded top-0 left-0 right-0 bg-white shadow z-10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/"><Image src={} alt="fincoach logo" height={60} width={200} className="h-12 w-auro object-contain" /></Link>
      </nav>
      
      <nav>
        <Show when="signed-out">
        <SignInButton forceRedirectUrl="/dashboard">
          <Button variant="outline">Login</Button>
        </SignInButton>
        <SignUpButton forceRedirectUrl="/dashboard">
          <Button variant="default">Sign Up</Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
      </nav>
    </header>
  );
};

export default Header;
