"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WordData } from "@/types/word";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, Check, Circle, X } from "lucide-react";
import LevelHeader from "@/components/LevelHeader";
import Score from "@/components/Score";
import { useTranslate } from "@/lib/translate";
import Actions from "@/components/Actions";

type QuizQuestion = {
  word: string;
  meanings: string[];
  correct: string;
  options: string[];
};

export default function QuizPage() {
  const { level } = useParams<{ level: string }>();
  const t = useTranslate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [results, setResults] = useState<{ correct: number; wrong: number }>({
    correct: 0,
    wrong: 0,
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      const res = await fetch(`/data/levels/${level}.json`, {
        cache: "no-store",
      });
      const data: WordData[] = await res.json();

      const randomWords = data.sort(() => 0.5 - Math.random()).slice(0, 10);

      const questions = randomWords.map((word) => {
        const allMeanings = data.flatMap((w) => w.meanings);
        const wrongOptions = allMeanings
          .filter((m) => !word.meanings.includes(m))
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        const correctOption = word.meanings[0];
        const options = [...wrongOptions, correctOption].sort(
          () => 0.5 - Math.random()
        );

        return {
          word: word.word,
          meanings: word.meanings,
          correct: correctOption,
          options,
        };
      });

      setQuestions(questions);
    };

    loadWords();
  }, [level]);

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (opt: string) => {
    if (selected) return;

    setSelected(opt);

    const isCorrect = opt === current.correct;

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

  if (finished) {
    const total = questions.length;
    const score = Math.round((results.correct / total) * 100);

    return (
      <Score
        title={t("QUIZ_FINISHED_TITLE")}
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
          <Spinner className="text-indigo-600" /> {t("QUIZ_LOADING")}
        </p>
      </div>
    );

  return (
    <section id="quiz">
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title={t("QUIZ_TITLE")} />
      </div>

      <h2 className="text-2xl font-semibold text-white w-max mx-auto bg-indigo-600 px-4 py-3 rounded-2xl">
        {current.word}
      </h2>

      <div className="my-4">
        <Actions
          type="word"
          current={{
            word: current.word,
            meanings: current.meanings,
          }}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">
          {t("QUIZ_QUESTION")} {currentIndex + 1}/10
        </span>
        <span className="text-sm text-slate-500">
          {t("QUIZ_LEVEL")}: {level}
        </span>
      </div>

      <Progress
        value={progress}
        className="h-3 mb-6 bg-white"
        innerBg="bg-indigo-600"
      />

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
            ? t("QUIZ_SHOW_RESULTS")
            : t("QUIZ_NEXT_QUESTION")}
          <ArrowRight width={16} className="text-yellow-300" />
        </Button>
      )}
    </section>
  );
}
