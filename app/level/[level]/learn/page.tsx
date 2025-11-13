"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useProgressStore } from "@/store/useProgressStore";
import { Progress } from "@/components/ui/progress";
import { WordData, Example } from "@/types/word";
import {
  SealCheckIcon,
  TextAaIcon,
  TranslateIcon,
} from "@phosphor-icons/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { shuffleArray } from "@/lib/utils";
import LevelHeader from "@/components/LevelHeader";

export default function WordsPage() {
  const { level } = useParams<{ level: string }>();
  const { toggleLearned, getProgress, isLearned } = useProgressStore();

  const [words, setWords] = useState<WordData[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    const loadWords = async () => {
      const res = await fetch(`/data/levels/${level}.json`);
      const data: WordData[] = await res.json();
      const shuffled = shuffleArray(data);
      setWords(shuffled);
    };
    loadWords();
  }, [level]);

  const current = words[index];
  const total = words.length;
  const progress = getProgress(level!, total);

  if (!current) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-slate-500 flex items-center gap-2 text-sm">
          <Spinner className="text-indigo-600" /> Veriler yükleniyor...
        </p>
      </div>
    );
  }

  const learned = isLearned(level!, current.word);

  const handleNext = () => {
    setShowMeaning(false);
    setShowExamples(false);
    setShowTranslations({});
    setIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setShowMeaning(false);
    setShowExamples(false);
    setShowTranslations({});
    setIndex((prev) => (prev - 1) % total);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title="Kelimeleri Öğren" />
      </div>

      <h2 className="text-2xl font-semibold text-white w-max mx-auto bg-indigo-600 px-4 py-3 rounded-2xl">
        {current.word}
      </h2>

      <div className="my-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {level} seviyesi öğrenme
          </span>
          <span className="text-sm text-slate-500">{progress}%</span>
        </div>

        <Progress
          value={progress}
          className="h-2 mt-3 bg-slate-100"
          innerBg="bg-indigo-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button
          className={`flex flex-col text-xs items-center justify-center [&_svg]:size-6 ${
            showMeaning
              ? "bg-indigo-500 text-white hover:bg-indigo-500"
              : "bg-white text-indigo-500 hover:bg-transparent"
          } w-full border-2 border-indigo-500 shadow-none py-4 h-auto rounded-xl whitespace-normal`}
          onClick={() => setShowMeaning((prev) => !prev)}
        >
          <TranslateIcon />
          Çevirisini Göster
        </Button>

        <Button
          className={`flex flex-col text-xs items-center justify-center [&_svg]:size-6 ${
            showExamples
              ? "bg-yellow-400 text-white hover:bg-yellow-400"
              : "bg-white text-yellow-400 hover:bg-transparent"
          } w-full border-2 border-yellow-400 shadow-none py-4 h-auto rounded-xl whitespace-normal`}
          onClick={() => setShowExamples((prev) => !prev)}
        >
          <TextAaIcon />
          Örnek Cümleler
        </Button>

        <Button
          className={`flex flex-col text-xs items-center justify-center [&_svg]:size-6 ${
            learned
              ? "bg-green-500 text-white hover:bg-green-500"
              : "bg-white text-green-500 hover:bg-transparent"
          } w-full border-2 border-green-500 shadow-none py-4 h-auto rounded-xl whitespace-normal`}
          onClick={() => toggleLearned(level!, current.word)}
        >
          <SealCheckIcon />
          {learned ? "Kelime Öğrenildi" : "Öğrenildi İşaretle"}
        </Button>
      </div>

      {showMeaning && (
        <div className="mt-6">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-1 text-slate-900 mb-2">
            <TranslateIcon width={16} height={16} className="text-indigo-600" />
            Çeviri
          </h4>
          <ul className="text-slate-900 text-sm space-y-1 list-none">
            {current.meanings.map((m, i) => (
              <li key={i} className="text-base flex items-center gap-1">
                <ArrowRight height={14} className="text-indigo-600" /> {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showExamples && (
        <div className="mt-6">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-1 text-slate-900 mb-2">
            <TextAaIcon width={16} height={16} className="text-yellow-400" />
            Örnek Cümleler:
          </h4>
          <div className="flex flex-col gap-3">
            {current.examples.map((ex: Example, i: number) => (
              <div
                key={i}
                className="border border-slate-100 rounded-xl p-3 bg-slate-50 flex flex-col gap-1"
              >
                <p className="text-slate-900 text-sm">{ex.en}</p>

                {showTranslations[i] && (
                  <p className="text-indigo-600 text-sm">{ex.tr}</p>
                )}

                {!showTranslations[i] && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-max p-0 mt-1 h-auto text-yellow-500"
                    onClick={() =>
                      setShowTranslations((prev) => ({
                        ...prev,
                        [i]: !prev[i],
                      }))
                    }
                  >
                    Çeviriyi Göster
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={index !== 0 ? handlePrev : () => null}
          disabled={index === 0}
          className="bg-slate-100 w-full text-slate-900 font-bold mt-6 rounded-full px-2 py-6 hover:bg-slate-200 transition-all active:scale-90 shadow-none"
        >
          <ArrowLeft width={16} className="text-indigo-600" />
          Önceki Kelime
        </Button>

        <Button
          onClick={handleNext}
          className="bg-indigo-600 w-full text-white font-bold mt-6 rounded-full px-2 py-6 hover:bg-indigo-500 transition-all active:scale-90"
        >
          Sonraki Kelime
          <ArrowRight width={16} className="text-yellow-300" />
        </Button>
      </div>
    </div>
  );
}
