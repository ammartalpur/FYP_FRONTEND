// components/chat/ResultDisplay.tsx
export default function ResultDisplay({
  score,
  reasoning,
}: {
  score: string;
  reasoning: string;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg">
          <span className="text-sm opacity-80 uppercase tracking-widest">
            Score
          </span>
          <span className="text-4xl font-black">{score}</span>
        </div>
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
            <span className="text-blue-600">✨</span> Reasoning & Feedback
          </h3>
          <p className="text-slate-600 leading-relaxed italic">&ldquo;{reasoning}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
