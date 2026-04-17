import Navbar from "@/component/layout/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Search } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function HomePage() {
  return (
    <div
      className={`${inter.className} min-h-screen bg-gradient-to-b from-white via-slate-50 to-white`}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Explainable Reasoning <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
              Analysis of Subjective Answers
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
            Intelligent answer checking system for students that provides
            detailed feedback, identifies key concepts, and explains the
            reasoning behind every evaluation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat" className="cursor-pointer">
              <Button
                size="lg"
                className="h-14 px-10 text-lg gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Submit Answer <ArrowRight size={20} />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 text-lg border-slate-300 hover:bg-slate-100 transition-all duration-300 cursor-pointer"
            >
              View History
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y bg-white">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Everything you need to evaluate and improve your answers with
            clarity and precision.
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="text-blue-600" />}
            title="OCR Support"
            description="Upload handwritten answers and automatically extract text with high accuracy."
          />
          <FeatureCard
            icon={<Zap className="text-blue-600" />}
            title="Detailed Scoring"
            description="Get precise scoring with insights into strengths and areas for improvement."
          />
          <FeatureCard
            icon={<CheckCircle2 className="text-blue-600" />}
            title="Explainable Steps"
            description="Understand exactly how your answer was evaluated step by step."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-slate-900">{title}</h3>

      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
