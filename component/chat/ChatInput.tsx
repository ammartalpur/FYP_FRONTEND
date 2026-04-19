"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  onSubmit: (q: string, qFile: File | null, ans: string, aFile: File | null) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [question, setQuestion] = useState("");
  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerFile, setAnswerFile] = useState<File | null>(null);

  const canSubmit = question.trim() && userAnswer.trim() && !isLoading;

  const handleAction = () => {
    if (!canSubmit) return;

    onSubmit(question, questionFile, userAnswer, answerFile);

    // 🧼 Clear fields after submit (better chat UX)
    setQuestion("");
    setQuestionFile(null);
    setUserAnswer("");
    setAnswerFile(null);
  };

  const handleQuestionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setQuestionFile(e.target.files[0]);
    }
  };

  const handleAnswerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAnswerFile(e.target.files[0]);
    }
  };

  // ⌨️ Allow Enter to submit (without breaking multiline)
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleAction();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5 max-h-96 overflow-y-auto">
      {/* LABELS AND INPUTS */}
      <div className="space-y-5">
        {/* QUESTION */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Question <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Enter the exam/assignment question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-3 text-sm"
          />
          
          {/* QUESTION FILE UPLOAD */}
          <div className="flex gap-2 items-center mt-2">
            <label className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg cursor-pointer transition-colors">
              <Paperclip size={16} className="text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Attach file</span>
              <input
                type="file"
                onChange={handleQuestionFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              />
            </label>
            {questionFile && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-300 rounded-lg">
                <span className="text-xs font-medium text-green-700">{questionFile.name}</span>
                <button
                  onClick={() => setQuestionFile(null)}
                  className="text-green-600 hover:text-green-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* USER ANSWER */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Your Answer <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Write your answer here. Press Ctrl+Enter to submit..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-3 text-sm min-h-32"
          />
          
          {/* ANSWER FILE UPLOAD */}
          <div className="flex gap-2 items-center mt-2">
            <label className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg cursor-pointer transition-colors">
              <Paperclip size={16} className="text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Attach file</span>
              <input
                type="file"
                onChange={handleAnswerFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              />
            </label>
            {answerFile && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-300 rounded-lg">
                <span className="text-xs font-medium text-green-700">{answerFile.name}</span>
                <button
                  onClick={() => setAnswerFile(null)}
                  className="text-green-600 hover:text-green-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* UX HINT */}
      {!question.trim() || !userAnswer.trim() ? (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
          <p className="text-xs text-amber-800 font-medium">
            Question and answer are required to analyze
          </p>
        </div>
      ) : null}

      {/* ACTION BAR */}
      <div className="flex gap-3 justify-between items-center pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          {canSubmit ? (
            <span className="text-green-600 font-medium">✓ Ready to analyze</span>
          ) : (
            <span>Fill in required fields to continue</span>
          )}
        </div>
        <Button
          className={`px-6 py-2 font-semibold rounded-lg transition-all flex items-center gap-2 ${
            canSubmit
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          }`}
          onClick={handleAction}
          disabled={!canSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Analyze Answer</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
