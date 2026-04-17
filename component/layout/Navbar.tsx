// components/layout/Navbar.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          ERA
        </div>
        <span className="text-xl font-bold text-slate-900">
          Explainable Reasoning Analysis
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link href="/" className="text-blue-600">
          Home
        </Link>
        <Link href="/chat">Submit Answer</Link>
        <Link href="/history">History</Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Clerk Sign Up Button Placeholder */}
        <Button variant="outline">Sign In</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
      </div>
    </nav>
  );
}
