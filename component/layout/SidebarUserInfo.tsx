"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export function SidebarUserInfo() {
  const { user } = useUser();

  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.emailAddresses[0]?.emailAddress || "User";
    
  const initials = user
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`
    : "HA";

  return (
    <>
      <SignedIn>
        <div className="p-4 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
              {initials}
            </div>
            <div className="text-xs truncate flex-1 min-w-0">
              <p className="font-bold text-slate-900 truncate">{displayName}</p>
              <p className="text-slate-600 font-semibold">
                {user?.username || user?.emailAddresses[0]?.emailAddress?.split("@")[0] || "User"}
              </p>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="p-4 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
              HA
            </div>
            <div className="text-xs truncate flex-1 min-w-0">
              <p className="font-bold text-slate-900 truncate">Hasnain Ali</p>
              <p className="text-slate-600 font-semibold">22CS068</p>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
