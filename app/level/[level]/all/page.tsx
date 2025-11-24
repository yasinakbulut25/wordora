"use client";

import { useParams } from "next/navigation";
import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";
import { Levels, useLevelsStore } from "@/store/useLevelsStore";
import { WordCard } from "./WordCard";
import { WordData } from "@/types/word";

export default function AllWordsPage() {
  const { level } = useParams<{ level: Levels }>();
  const { levels } = useLevelsStore();
  const wordsData: WordData[] = levels[level];
  const t = useTranslate();

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
        {wordsData.map((item, index) => (
          <WordCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}
