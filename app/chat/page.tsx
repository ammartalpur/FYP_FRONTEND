"use client";

import { useState } from "react";
import Sidebar from "@/component/layout/Sidebar";
import Navbar from "@/component/layout/Navbar";
import ChatInput from "@/component/chat/ChatInput";
import ChatMessage from "@/component/chat/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";



export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleAnalyze = async (
    question: string,
    questionFile: File | null,
    userAns: string,
    answerFile: File | null,
  ) => {
    if (!question || !userAns) {
      setError("Please enter both question and answer.");
      return;
    }

    setError(null);

    // 1. Immediately show user message (better UX)
    const userMessage = {
      role: "user",
      content: userAns,
      attachmentName: answerFile?.name,
    };

    setMessages((prev) => [...prev, userMessage]);

    // 2. Show loading bubble in chat
    const loadingMessage = {
      role: "assistant",
      content: "Analyzing answer...",
      loading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);
    setIsLoading(true);

    const requestData = {
      student_answer: userAns,
      custom_question: question,
      custom_reference_answer: "", // Now optional - removed from UI
      question_file: questionFile?.name || null,
      answer_file: answerFile?.name || null,
    };

    try {
      const response = await fetch(
        "https://flyer-pretzel-sanitary.ngrok-free.dev/analyze_answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Server error");
      }

      // Save API response to JSON file
      try {
        const saveResponse = await fetch("/api/save-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request: requestData,
            response: data,
            status: "success",
          }),
        });

        const saveResult = await saveResponse.json();
        if (saveResponse.ok) {
          setSaveStatus(
            `✓ Data saved (${saveResult.totalEntries} entries)`
          );
          setTimeout(() => setSaveStatus(null), 3000);
        } else {
          console.warn("Save warning:", saveResult.error);
        }
      } catch (saveError) {
        console.error("Error saving data to file:", saveError);
      }

      // 3. Replace loading message with real response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                role: "assistant",
                content: data.analysis || "No analysis returned.",
                score: data.score ?? "N/A",
                loading: false,
              }
            : msg,
        ),
      );
    } catch (err: any) {
      // Save error to JSON file
      try {
        await fetch("/api/save-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request: requestData,
            error: err.message,
            status: "error",
          }),
        });
      } catch (saveError) {
        console.error("Error saving error data to file:", saveError);
      }

      // Replace loading message with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                role: "assistant",
                content: "Could not analyze answer. Please try again later.",
                error: true,
              }
            : msg,
        ),
      );

      setError(err.message || "Connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Navbar />

        {/* MAIN CHAT AREA */}
        <ScrollArea className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* EMPTY STATE */}
            {messages.length === 0 && (
              <div className="text-center mt-32 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg">
                  <Loader2 size={32} className="text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to ERA</h2>
                  <p className="text-slate-600 max-w-sm mx-auto">
                    Submit a question and your answer to get detailed AI-powered analysis and scoring.
                  </p>
                </div>
              </div>
            )}

            {/* MESSAGES */}
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
                score={msg.score}
                attachmentName={msg.attachmentName}
              />
            ))}
          </div>
        </ScrollArea>

        {/* STATUS BARS & INPUT - STICKY AT BOTTOM */}
        <div className="shrink-0 bg-gradient-to-b from-transparent to-white border-t border-slate-200">
          {/* ERROR BAR */}
          {error && (
            <div className="flex items-center gap-3 text-red-700 text-sm px-6 py-3 border-b border-red-200 bg-red-50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* SAVE STATUS BAR */}
          {saveStatus && (
            <div className="flex items-center gap-3 text-green-700 text-sm px-6 py-3 border-b border-green-200 bg-green-50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span className="font-medium">{saveStatus}</span>
            </div>
          )}

          {/* INPUT AREA */}
          <div className="bg-white p-6 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <ChatInput onSubmit={handleAnalyze} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}