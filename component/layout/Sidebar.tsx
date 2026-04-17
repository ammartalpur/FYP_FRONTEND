// components/layout/Sidebar.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const previousChats = [
    "Assignment 1: OS",
    "Midterm Reasoning",
    "Physics Theory",
  ];

  return (
    <aside className="w-70 bg-white border-r flex-col h-full hidden lg:flex">
      <div className="p-4 border-b">
        <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700">
          <PlusCircle size={18} /> New Analysis
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Recent History
        </h4>
        <div className="space-y-2">
          {previousChats.map((chat, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group"
            >
              <MessageSquare
                size={16}
                className="text-slate-400 group-hover:text-blue-500"
              />
              <span className="truncate">{chat}</span>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
            AT
          </div>
          <div className="text-xs truncate">
            <p className="font-bold text-slate-800">Ammar Talpur</p>
            <p className="text-slate-500">24CS021</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
