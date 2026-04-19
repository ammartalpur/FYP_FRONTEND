// components/chat/ChatMessage.tsx
import { User, Sparkles, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  score?: string;
  attachmentName?: string;
}

export default function ChatMessage({
  role,
  content,
  score,
  attachmentName,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex w-full gap-4 p-5 rounded-xl mb-4 transition-all duration-200 hover:shadow-md",
        isAssistant
          ? "bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-200 shadow-sm"
          : "bg-white border border-slate-200 shadow-md",
      )}
    >
      {/* Icon Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white shadow-md",
          isAssistant
            ? "bg-gradient-to-br from-blue-600 to-blue-700"
            : "bg-gradient-to-br from-slate-600 to-slate-700",
        )}
      >
        {isAssistant ? <Sparkles size={18} /> : <User size={18} />}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
            {isAssistant ? "💡 ERA Analysis" : "👤 Your Answer"}
          </span>
          {score && isAssistant && (
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              SCORE: {score}
            </span>
          )}
        </div>

        <div
          className={cn(
            "text-slate-700 leading-relaxed text-sm whitespace-pre-wrap break-words max-w-2xl",
            isAssistant ? "font-medium" : "font-normal",
          )}
        >
          {content}
        </div>

        {/* Attachment Display */}
        {attachmentName && !isAssistant && (
          <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg w-fit">
            <Paperclip size={14} className="text-amber-600" />
            <span className="text-xs font-medium text-amber-700">{attachmentName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
