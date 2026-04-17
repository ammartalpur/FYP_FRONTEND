// components/chat/ChatMessage.tsx
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  score?: string;
}

export default function ChatMessage({
  role,
  content,
  score,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex w-full gap-4 p-6 rounded-2xl mb-4 transition-all",
        isAssistant
          ? "bg-blue-50/50 border border-blue-100"
          : "bg-white border border-slate-100 shadow-sm",
      )}
    >
      {/* Icon Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          isAssistant
            ? "bg-blue-600 text-white"
            : "bg-slate-200 text-slate-600",
        )}
      >
        {isAssistant ? <Sparkles size={18} /> : <User size={18} />}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
            {isAssistant ? "ERA Analysis" : "Your Answer"}
          </span>
          {score && isAssistant && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
              SCORE: {score}
            </span>
          )}
        </div>

        <div
          className={cn(
            "text-slate-700 leading-relaxed",
            isAssistant ? "font-medium" : "font-normal",
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
