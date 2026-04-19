// components/layout/Sidebar.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare } from "lucide-react";
import { SidebarUserInfo } from "./SidebarUserInfo";

export default function Sidebar() {
  const previousChats = [
    "Assignment 1: OS",
    "Midterm Reasoning",
    "Physics Theory",
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex-col h-full hidden lg:flex shadow-sm">
      <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
          <PlusCircle size={18} /> New Analysis
        </button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
          Recent History
        </h4>
        <div className="space-y-2">
          {previousChats.map((chat, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group border border-transparent hover:border-blue-200"
            >
              <MessageSquare
                size={16}
                className="text-slate-400 group-hover:text-blue-600 transition-colors"
              />
              <span className="truncate font-medium">{chat}</span>
            </button>
          ))}
        </div>
      </ScrollArea>

      <SidebarUserInfo />
    </aside>
  );
}
