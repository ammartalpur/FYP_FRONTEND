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

  const handleAnalyze = async (
    question: string,
    attachment: string,
    userAns: string,
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
      custom_reference_answer: attachment,
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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar />

        {/* MAIN CHAT AREA */}
        <ScrollArea className="flex-1 px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* EMPTY STATE */}
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                No messages yet. Submit an answer to begin analysis.
              </div>
            )}

            {/* MESSAGES */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg max-w-xl ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-white border"
                }`}
              >
                {msg.loading ? (
                  <div className="animate-pulse">Analyzing...</div>
                ) : (
                  <>
                    <p>{msg.content}</p>
                    {msg.score && (
                      <p className="text-sm mt-2 opacity-70">
                        Score: {msg.score}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* ERROR BAR */}
        {error && (
          <div className="text-red-500 text-sm px-6 py-2 border-t bg-red-50">
            {error}
          </div>
        )}

        {/* INPUT AREA */}
        <div className="bg-white border-t p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSubmit={handleAnalyze} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}