"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/component/layout/Sidebar";
import Navbar from "@/component/layout/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Download, ChevronDown, ChevronUp } from "lucide-react";

interface HistoryEntry {
  timestamp: string;
  request: {
    student_answer: string;
    custom_question: string;
    custom_reference_answer: string;
  };
  response?: {
    analysis: string;
    score?: string;
  };
  error?: string;
  status: "success" | "error";
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/data/api-responses.json");
      if (response.ok) {
        const data = await response.json();
        setHistory(Array.isArray(data) ? data.reverse() : []);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadHistory = () => {
    const dataStr = JSON.stringify(history.reverse(), null, 2);
    const element = document.createElement("a");
    element.href = URL.createObjectURL(
      new Blob([dataStr], { type: "application/json" })
    );
    element.download = `history-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const deleteEntry = async (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    // Update the data file
    try {
      await fetch("/api/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          data: updatedHistory,
        }),
      });
    } catch (error) {
      console.error("Error updating history:", error);
    }
  };

  const clearAllHistory = async () => {
    if (
      !confirm(
        "Are you sure you want to delete all history? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await fetch("/api/history", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "clear-all" }),
      });
      setHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full relative">
        <Navbar />

        {/* MAIN CONTENT */}
        <ScrollArea className="flex-1 px-6 py-8">
          <div className="max-w-5xl mx-auto">
            {/* HEADER */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-slate-900">
                  Analysis History
                </h1>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={downloadHistory}
                    disabled={history.length === 0}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={18} />
                    Download All
                  </Button>
                  <Button
                    onClick={clearAllHistory}
                    disabled={history.length === 0}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
              <p className="text-slate-600">
                {history.length === 0
                  ? "No analysis history yet"
                  : `${history.length} ${history.length === 1 ? "analysis" : "analyses"} saved`}
              </p>
            </div>

            {/* LOADING STATE */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block">
                  <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
                </div>
                <p className="text-slate-600 mt-4">Loading history...</p>
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && history.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  No History Yet
                </h2>
                <p className="text-slate-600 mb-6">
                  Your analysis history will appear here once you submit your
                  first answer.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                  <a href="/chat">Go to Chat</a>
                </Button>
              </div>
            )}

            {/* HISTORY LIST */}
            {!loading && history.length > 0 && (
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* HEADER */}
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === index ? null : index)
                      }
                      className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              entry.status === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {entry.status === "success" ? "✓ Success" : "✗ Error"}
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {truncateText(entry.request.custom_question, 80)}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {truncateText(entry.request.student_answer, 100)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 ml-4">
                        {entry.status === "success" &&
                          entry.response?.score && (
                            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-md">
                              Score: {entry.response.score}
                            </div>
                          )}
                        {expandedId === index ? (
                          <ChevronUp className="text-slate-400" size={20} />
                        ) : (
                          <ChevronDown className="text-slate-400" size={20} />
                        )}
                      </div>
                    </button>

                    {/* EXPANDED CONTENT */}
                    {expandedId === index && (
                      <div className="border-t border-slate-200 p-5 bg-gradient-to-b from-slate-50/50 to-slate-50 space-y-4">
                        {/* QUESTION */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                            Question
                          </h4>
                          <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                            {entry.request.custom_question}
                          </p>
                        </div>

                        {/* REFERENCE ANSWER */}
                        {entry.request.custom_reference_answer && (
                          <div>
                            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                              Reference Answer
                            </h4>
                            <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                              {entry.request.custom_reference_answer}
                            </p>
                          </div>
                        )}

                        {/* STUDENT ANSWER */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                            Your Answer
                          </h4>
                          <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                            {entry.request.student_answer}
                          </p>
                        </div>

                        {/* ANALYSIS RESULT */}
                        {entry.status === "success" && entry.response?.analysis ? (
                          <div>
                            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                              Analysis
                            </h4>
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg max-h-96 overflow-y-auto">
                              <div
                                className="text-sm text-slate-700 prose prose-sm"
                                dangerouslySetInnerHTML={{
                                  __html: entry.response.analysis
                                    .replace(/\n/g, "<br />")
                                    .replace(/##\s+/g, "<h3 class='font-bold mt-3 mb-2'>")
                                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                                }}
                              />
                            </div>
                          </div>
                        ) : entry.status === "error" ? (
                          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <p className="text-sm text-red-700 font-medium">
                              ✗ Error: {entry.error || "Unknown error occurred"}
                            </p>
                          </div>
                        ) : null}

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                          <Button
                            onClick={() => deleteEntry(index)}
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
