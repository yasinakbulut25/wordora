"use client";

import { useState } from "react";
import { ArrowRight, Volume2 } from "lucide-react";
import { useTranslate } from "@/lib/translate";
import { handleSpeak } from "@/lib/speak";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Example, WordData } from "@/types/word";
import { useProgressStore } from "@/store/useProgressStore";
import { useUserStore } from "@/store/useUserStore";
import WordDropdown from "./WordDropdown";
import { cn } from "@/lib/utils";
import { TextAaIcon, TranslateIcon } from "@phosphor-icons/react";
import SentenceDropdown from "../learn/SentenceDropdown";

export function WordCard({ item }: { item: WordData }) {
  const t = useTranslate();
  const { user } = useUserStore();
  const { isLearned } = useProgressStore();

  const [showTranslate, setShowTranslate] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showTranslations, setShowTranslations] = useState<
    Record<number, boolean>
  >({});

  if (!user) return;

  const learned = isLearned(item.word);

  return (
    <Card
      className={cn(
        "relative border-2 shadow-none",
        learned ? "border-green-500" : "border-slate-200"
      )}
    >
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-800">{item.word}</h3>

          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => handleSpeak(item.word)}
              className="bg-indigo-600 text-white hover:bg-indigo-500 min-w-9"
            >
              <Volume2 size={18} />
            </Button>
            <WordDropdown item={item} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowTranslate((prev) => !prev)}
            className="w-full text-center bg-slate-50 p-2 mt-1 h-auto text-slate-600 hover:text-indigo-500 hover:bg-slate-100 border border-slate-200"
          >
            <TranslateIcon className="text-indigo-600" />
            {showTranslate ? t("WORDS_HIDE_MEANING") : t("WORDS_SHOW_MEANING")}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowExamples((prev) => !prev)}
            className="w-full text-center bg-slate-50 p-2 mt-1 h-auto text-slate-600 hover:text-indigo-500 hover:bg-slate-100 border border-slate-200"
          >
            <TextAaIcon className="text-indigo-600" />
            {t("WORDS_EXAMPLES")}
          </Button>
        </div>

        {showTranslate && (
          <ul className="text-slate-900 text-sm space-y-1 list-none">
            {item.meanings.map((m, i) => (
              <li key={i} className="text-base flex items-center gap-1">
                <ArrowRight height={14} className="text-indigo-600" /> {m}
              </li>
            ))}
          </ul>
        )}

        {showExamples && (
          <>
            <div className="flex flex-col gap-3">
              {item.examples.map((ex: Example, i: number) => (
                <div
                  key={i}
                  className="border border-slate-100 rounded-xl p-3 bg-slate-50 flex flex-col gap-1"
                >
                  <div className="flex itemc-center justify-between gap-1">
                    <p className="text-slate-900 text-sm">{ex.en}</p>
                    <SentenceDropdown example={ex} word={item.word} />
                  </div>
                  {showTranslations[i] && (
                    <p className="text-indigo-600 text-sm">{ex.tr}</p>
                  )}
                  {!showTranslations[i] && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-max p-0 mt-1 h-auto text-yellow-500 hover:text-yellow-400 hover:bg-transparent"
                      onClick={() =>
                        setShowTranslations((prev) => ({
                          ...prev,
                          [i]: !prev[i],
                        }))
                      }
                    >
                      {t("WORDS_SHOW_TRANSLATION")}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
