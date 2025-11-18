"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WordData, ExampleSentence } from "@/types/word";
import { ArrowRight, ArrowLeft, Heart, Repeat, Volume2 } from "lucide-react";
import { TranslateIcon } from "@phosphor-icons/react";
import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";
import AddToListMenu from "@/components/AddToListMenu";
import { handleSpeak } from "@/lib/speak";

export default function TranslatePage() {
  const { level } = useParams<{ level: string }>();
  const t = useTranslate();

  const [sentences, setSentences] = useState<ExampleSentence[]>([]);
  const [index, setIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [direction, setDirection] = useState<"en-tr" | "tr-en">("en-tr");

  useEffect(() => {
    const loadExamples = async () => {
      const res = await fetch(`/data/levels/${level}.json`, {
        cache: "no-store",
      });
      const words: WordData[] = await res.json();

      const allExamples = words.flatMap((w) => {
        return w.examples.map((example) => ({
          ...example,
          word: w.word,
        }));
      });

      const shuffled = allExamples.sort(() => 0.5 - Math.random());
      setSentences(shuffled);
      setIndex(0);
    };

    loadExamples();
  }, [level]);

  const current = sentences[index];
  const total = sentences.length;

  if (!current)
    return (
      <div className="flex items-center justify-center h-[70vh] text-slate-500">
        {t("TRANSLATE_LOADING")}
      </div>
    );

  const handleNext = () => {
    if (index + 1 < total) {
      setIndex((prev) => prev + 1);
      setShowTranslation(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setShowTranslation(false);
    }
  };

  const sentence = direction === "en-tr" ? current.en : current.tr;
  const translation = direction === "en-tr" ? current.tr : current.en;

  return (
    <section id="translate">
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title={t("TRANSLATE_TITLE")} />
      </div>

      <div className="flex justify-center items-center mb-6">
        <Button
          className="text-xs [&_svg]:size-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-none transition-all active:scale-90"
          onClick={() =>
            setDirection(direction === "en-tr" ? "tr-en" : "en-tr")
          }
        >
          {direction === "en-tr" ? "tr" : "en"}
          <Repeat width={12} height={12} className="text-yellow-300" />
          {direction === "en-tr" ? "en" : "tr"}
        </Button>
      </div>

      <Card className="border-2 border-indigo-200 shadow-none">
        <CardContent className="p-6 flex flex-col items-center">
          <p className="text-lg text-slate-900 font-medium text-center">
            {sentence}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <AddToListMenu
              current={{
                word: current.word,
                sentence: current.en,
                translation: current.tr,
              }}
              type="sentence"
            />

            <Button
              onClick={() => handleSpeak(current.en)}
              className="group flex items-center gap-2 text-xs bg-white border border-slate-200 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-none px-3"
            >
              <Volume2 className="w-4 h-4 text-indigo-600 group-hover:text-white" />
              {t("VOICE")}
            </Button>
            <Button
              size="icon"
              className="group flex items-center gap-2 text-xs bg-white border border-slate-200 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-none"
            >
              <Heart className="w-4 h-4 text-indigo-600 group-hover:text-white" />
            </Button>
          </div>
          {showTranslation && (
            <p className="text-base text-indigo-600 text-center border-t border-slate-200 pt-6 mt-6 w-full">
              {translation}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="absolute w-full left-0 bottom-4 grid grid-cols-2 gap-4 mt-6 px-3">
        <div className="col-span-2 mx-auto">
          {!showTranslation && (
            <Button
              onClick={() => setShowTranslation(true)}
              className="rounded-full bg-yellow-300 hover:bg-yellow-400 text-indigo-600 font-bold mt-6 h-auto py-3 px-6 shadow-none"
            >
              <TranslateIcon className="text-indigo-600" />
              {t("TRANSLATE_SHOW")}
            </Button>
          )}
        </div>
        <Button
          onClick={handlePrev}
          disabled={index === 0}
          className="bg-white w-full text-slate-900 font-bold rounded-full px-2 py-6 hover:bg-slate-50 shadow-none transition-all active:scale-95"
        >
          <ArrowLeft width={16} className="text-indigo-600" />
          {t("TRANSLATE_PREVIOUS")}
        </Button>

        <Button
          onClick={handleNext}
          disabled={index + 1 >= total}
          className="bg-indigo-600 w-full text-white font-bold rounded-full px-2 py-6 hover:bg-indigo-500 shadow-none transition-all active:scale-95"
        >
          {index + 1 === total - 1 ? t("TRANSLATE_LAST") : t("TRANSLATE_NEXT")}
          <ArrowRight width={16} className="text-yellow-300" />
        </Button>
      </div>

      <p className="text-center text-sm text-slate-500 mt-6">
        {index + 1} / {total} {t("TRANSLATE_SENTENCE_COUNT")}
      </p>
    </section>
  );
}
