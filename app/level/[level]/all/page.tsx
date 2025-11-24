"use client";

import { useParams } from "next/navigation";
import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";
import { Levels, useLevelsStore } from "@/store/useLevelsStore";
import { WordCard } from "./WordCard";
import { WordData } from "@/types/word";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AllWordsPage() {
  const { level } = useParams<{ level: Levels }>();
  const { levels } = useLevelsStore();
  const wordsData: WordData[] = levels[level];
  const t = useTranslate();

  const loadCount = 50;
  const [limit, setLimit] = useState(loadCount);

  const visibleWords = useMemo(() => {
    return wordsData.slice(0, limit);
  }, [wordsData, limit]);

  const hasMore = limit < wordsData.length;

  if (!wordsData) return null;

  return (
    <section id="all">
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title={t("MODE_ALL_TITLE")} />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex flex-col items-center gap-2">
          <span className="min-w-max bg-indigo-600 py-1.5 px-3 text-white rounded-xl">
            Level {level?.toUpperCase()}
          </span>
          {t("MODE_ALL_TITLE")}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {visibleWords.map((item, index) => (
          <WordCard key={index} item={item} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 h-auto rounded-xl"
            onClick={() => setLimit((prev) => prev + loadCount)}
          >
            <Plus />
            {t("LOAD_MORE")}
          </Button>
        </div>
      )}
    </section>
  );
}
