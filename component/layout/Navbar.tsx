// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { UserProfile } from "./UserProfile";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
          ERA
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900">
            Explainable Reasoning Analysis
          </span>
          <span className="text-xs text-slate-500">Answer Analysis System</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link href="/chat" className="text-slate-600 hover:text-blue-600 transition-colors">Submit Answer</Link>
        <Link href="/history" className="text-slate-600 hover:text-blue-600 transition-colors">History</Link>
      </div>
      <div className="flex items-center gap-3">
        <UserProfile />
      </div>
    </nav>
  );
}
