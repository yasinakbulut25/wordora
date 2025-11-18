"use client";

import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";
import { useProgressStore } from "@/store/useProgressStore";
import { useParams } from "next/navigation";
import LearnedWordItem from "./LearnedWordItem";

export default function LearnedWords() {
  const t = useTranslate();
  const { level } = useParams<{ level: string }>();
  const { learned } = useProgressStore();
  const levelLearnedList = learned.filter((w) => w.level === level);

  return (
    <div>
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title={t("MODE_LEARNED_TITLE")} />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-xl font-bold text-slate-900 flex flex-col items-center gap-2">
          <span className="min-w-max bg-indigo-600 py-1.5 px-2.5 text-white rounded-xl">
            Level {level?.toUpperCase()}
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {levelLearnedList.length > 0 ? (
          levelLearnedList.map((word) => (
            <LearnedWordItem key={word.id} item={word} />
          ))
        ) : (
          <p className="text-slate-500 text-sm text-center">
            {t("MODE_LEARNED_EMPTY")}
          </p>
        )}
      </div>
    </div>
  );
}
