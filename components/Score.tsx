"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "./ui/button";

interface ScoreProps {
  title: string;
  results: {
    correct: number;
    wrong: number;
  };
  score: string | number;
  backHref: string;
}

export default function Score({ title, results, score, backHref }: ScoreProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center py-4">
      <div className="relative mb-8">
        <h1 className="relative text-3xl font-extrabold bg-gradient-to-r text-indigo-600 mb-2">
          Tebrikler!
        </h1>
        <p className="text-slate-700 text-base">{title}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 transform transition hover:scale-105">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
              <Check className="text-white" />
            </div>
            <span className="text-sm font-medium text-green-700 mb-1">
              Doğru
            </span>
            <span className="text-4xl font-bold text-green-600">
              {results.correct}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-400 rounded-2xl p-6 transform transition hover:scale-105">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
              <X className="text-white" />
            </div>
            <span className="text-sm font-medium text-red-700 mb-1">
              Yanlış
            </span>
            <span className="text-4xl font-bold text-red-600">
              {results.wrong}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mb-10">
        <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-200 rounded-3xl p-8">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-white/80 text-sm font-bold mb-2">
              Final Skorun
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-white">{score}</span>
              <span className="text-3xl font-bold text-white/70">/100</span>
            </div>
            <span className="text-white/90 text-base mt-3 font-medium">
              {Number(score) >= 90
                ? "🏆 Mükemmel!"
                : Number(score) >= 70
                ? "⭐ Harika!"
                : Number(score) >= 50
                ? "👍 İyi!"
                : "💪 Geliştir!"}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.push(backHref)}
        className="bg-indigo-600 w-full text-white font-bold rounded-full px-2 py-6 hover:bg-indigo-500 transition-all active:scale-90"
      >
        Ana Menü
        <ArrowRight width={16} className="text-yellow-300" />
      </Button>
    </div>
  );
}
