"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function UserProfile() {
  return (
    <>
      <SignedIn>
        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="outline" className="border-slate-300 hover:bg-slate-100">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md">
              Get Started
            </Button>
          </Link>
        </div>
      </SignedOut>
    </>
  );
}
