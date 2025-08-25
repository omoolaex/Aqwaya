"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <nav>
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>

        <Button asChild>
          <Link href="/auth/register">Sign Up</Link>
        </Button>
      </nav>
    </main>
  );
}
