"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { handleSpeak } from "@/lib/speak";
import { ArrowRight, Volume2 } from "lucide-react";
import { LearnedWord } from "@/types/word";
import { useProgressStore } from "@/store/useProgressStore";
import { useUserStore } from "@/store/useUserStore";
import { useParams } from "next/navigation";
import { SealCheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslate } from "@/lib/translate";

interface Props {
  item: LearnedWord;
}

function LearnedWordItem({ item }: Props) {
  const { level } = useParams<{ level: string }>();
  const t = useTranslate();
  const { user } = useUserStore();
  const { toggleLearned } = useProgressStore();
  const [showMeaning, setShowMeaning] = useState<boolean>(false);

  if (!user) return;

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardContent className="p-4 flex flex-col gap-2">
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

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                toggleLearned(user.id, level!, item.word, item.meanings)
              }
              className="hover:text-white text-white bg-green-500 hover:bg-green-400"
            >
              <SealCheckIcon />
            </Button>
          </div>
        </div>

        {item.meanings.length > 0 &&
          (!showMeaning ? (
            <Button
              size="sm"
              variant="ghost"
              className="w-max p-0 mt-1 h-auto text-yellow-500 hover:text-yellow-400 hover:bg-transparent"
              onClick={() => setShowMeaning(true)}
            >
              {t("WORDS_SHOW_TRANSLATION")}
            </Button>
          ) : (
            <ul className="text-slate-900 text-sm list-none">
              {item.meanings.map((mean, index) => (
                <li key={index} className="text-sm flex items-center gap-1">
                  <ArrowRight height={14} className="text-indigo-600" />
                  {mean}
                </li>
              ))}
            </ul>
          ))}
      </CardContent>
    </Card>
  );
}

export default LearnedWordItem;
