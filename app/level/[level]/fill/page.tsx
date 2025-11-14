"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { WordData } from "@/types/word";
import { ArrowRight, Check, Circle, X } from "lucide-react";
import LevelHeader from "@/components/LevelHeader";
import Score from "@/components/Score";

type FillQuestion = {
  sentence: string;
  correct: string;
  options: string[];
  translation: string;
};

export default function FillPage() {
  const { level } = useParams<{ level: string }>();

  const [questions, setQuestions] = useState<FillQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0 });
  const [finished, setFinished] = useState(false);

  // 🔹 Soru verilerini yükle
  useEffect(() => {
    const loadQuestions = async () => {
      const res = await fetch(`/data/levels/${level}.json`, {
        cache: "no-store",
      });
      const words: WordData[] = await res.json();

      const allExamples = words.flatMap((w) =>
        w.examples.map((ex) => ({ ...ex, word: w.word }))
      );

      // 10 rastgele örnek seç
      const random = allExamples.sort(() => 0.5 - Math.random()).slice(0, 10);

      // Boşluk oluştur
      const fillQuestions = random.map((ex) => {
        const wordInSentence = ex.en
          .split(" ")
          .find((w) =>
            ex.word
              ? w.toLowerCase().includes(ex.word.toLowerCase())
              : w.length > 3
          );
        const missing = wordInSentence || ex.word;
        const sentence = ex.en.replace(
          new RegExp(`\\b${missing}\\b`, "i"),
          "_____"
        );

        const wrongOptions = words
          .map((w) => w.word)
          .filter((w) => w !== missing)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        const options = [...wrongOptions, missing].sort(
          () => 0.5 - Math.random()
        );

        return {
          sentence,
          correct: missing,
          options,
          translation: ex.tr,
        };
      });

      setQuestions(fillQuestions);
    };

    loadQuestions();
  }, [level]);

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // 🔹 Seçim işlemi
  const handleSelect = (choice: string) => {
    if (selected) return;
    setSelected(choice);

    const isCorrect = choice === current.correct;
    setResults((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (!isCorrect ? 1 : 0),
    }));
    setShowNext(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setShowNext(false);
    } else {
      setFinished(true);
    }
  };

  // 🔹 Sonuç ekranı
  if (finished) {
    const total = questions.length;
    const score = Math.round((results.correct / total) * 100);

    return (
      <Score
        title={"Alıştırmayı tamamladın 🎉"}
        results={results}
        score={score}
        backHref={`/level/${level}`}
      />
    );
  }

  if (!current)
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-slate-500 flex items-center gap-2 text-sm">
          <Spinner className="text-indigo-600" /> Sorular yükleniyor...
        </p>
      </div>
    );

  return (
    <section id="fill">
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title="Boşluk Doldurma" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">
          Soru {currentIndex + 1}/10
        </span>
        <span className="text-sm text-slate-500">Level: {level}</span>
      </div>

      <Progress
        value={progress}
        className="h-3 mb-6 bg-white"
        innerBg="bg-indigo-600"
      />

      <p className="text-center text-lg font-semibold text-slate-900 mb-4">
        {current.sentence}
      </p>
      <p className="text-center text-base text-indigo-500 mb-6">
        {current.translation}
      </p>

      <div className="space-y-3">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className={`w-full font-bold flex items-center justify-between p-4 rounded-xl border border-slate-100 transition-all duration-300 ${
              selected
                ? opt === current.correct
                  ? "bg-green-500 border-green-500 text-white"
                  : opt === selected
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-slate-50 border-slate-200"
                : "hover:bg-slate-50 bg-white border-slate-200"
            }`}
          >
            <span
              className={
                selected
                  ? opt === current.correct
                    ? "text-white"
                    : opt === selected
                    ? "text-white"
                    : "text-indigo-600"
                  : "text-indigo-600"
              }
            >
              {i === 0 ? "A" : i === 1 ? "B" : "C"}
            </span>
            {opt}
            {selected ? (
              opt === current.correct ? (
                <Check width={16} className="text-white" />
              ) : opt === selected ? (
                <X width={16} className="text-white" />
              ) : (
                <Circle width={16} className="text-slate-400" />
              )
            ) : (
              <Circle width={16} className="text-slate-400" />
            )}
          </button>
        ))}
      </div>

      {showNext && (
        <Button
          onClick={handleNext}
          className="bg-indigo-600 w-full text-white font-bold mt-6 rounded-full px-2 py-6 hover:bg-indigo-500 transition-all active:scale-90"
        >
          {currentIndex + 1 === questions.length
            ? "Sonuçları Gör"
            : "Sonraki Soru"}
          <ArrowRight width={16} className="text-yellow-300" />
        </Button>
      )}
    </section>
  );
}
