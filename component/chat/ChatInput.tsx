"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSubmit: (q: string, att: string, ans: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [question, setQuestion] = useState("");
  const [attachment, setAttachment] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  const canSubmit = question.trim() && userAnswer.trim() && !isLoading;

  const handleAction = () => {
    if (!canSubmit) return;

    onSubmit(question, attachment, userAnswer);

    // 🧼 Clear fields after submit (better chat UX)
    setQuestion("");
    setAttachment("");
    setUserAnswer("");
  };

  // ⌨️ Allow Enter to submit (without breaking multiline)
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAction();
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      {/* QUESTION */}
      <Textarea
        placeholder="Enter question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* REFERENCE / ATTACHMENT */}
      <Textarea
        placeholder="Enter reference answer (optional)"
        value={attachment}
        onChange={(e) => setAttachment(e.target.value)}
      />

      {/* USER ANSWER */}
      <Textarea
        placeholder="Write your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* UX HINT */}
      {!question.trim() || !userAnswer.trim() ? (
        <p className="text-xs text-gray-400">
          Question and answer are required to analyze
        </p>
      ) : null}

      {/* ACTION BAR */}
      <div className="flex gap-3 justify-end items-center pt-2 border-t">
        <Button
          className={`px-10 transition ${
            canSubmit
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleAction}
          disabled={!canSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Analyzing...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" />
              Analyze Answer
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
