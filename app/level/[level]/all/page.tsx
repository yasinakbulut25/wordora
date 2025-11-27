"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useTranslate } from "@/lib/translate";
import { Levels, useLevelsStore } from "@/store/useLevelsStore";
import { useProgressStore } from "@/store/useProgressStore";
import { WordData } from "@/types/word";
import LevelHeader from "@/components/LevelHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WordList } from "./WordList";

export default function AllWordsPage() {
  const { level } = useParams<{ level: Levels }>();
  const { levels } = useLevelsStore();
  const wordsData: WordData[] = levels[level];
  const { isLearned } = useProgressStore();
  const t = useTranslate();

  const LOAD_COUNT = 20;

  const [activeTab, setActiveTab] = useState<string>("all");

  // Her tab için ayrı sayfa limiti tutuyoruz (böylece sekme değiştirince kaybolmaz)
  const [limits, setLimits] = useState({
    all: LOAD_COUNT,
    unlearned: LOAD_COUNT,
    learned: LOAD_COUNT,
  });

  // 1. ÖNCE VERİYİ AYIRIYORUZ (Henüz slice yapmadan)
  const { allPool, unlearnedPool, learnedPool } = useMemo(() => {
    if (!wordsData) return { allPool: [], unlearnedPool: [], learnedPool: [] };

    const unlearned = wordsData.filter((w) => !isLearned(w.word));
    const learned = wordsData.filter((w) => isLearned(w.word));

    return {
      allPool: wordsData,
      unlearnedPool: unlearned,
      learnedPool: learned,
    };
  }, [wordsData, isLearned]);

  const currentPool =
    activeTab === "learned"
      ? learnedPool
      : activeTab === "unlearned"
      ? unlearnedPool
      : allPool;

  const currentLimit = limits[activeTab as keyof typeof limits];

  const visibleWords = currentPool.slice(0, currentLimit);
  const hasMore = currentLimit < currentPool.length;

  const handleLoadMore = () => {
    setLimits((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof limits] + LOAD_COUNT,
    }));
  };

  if (!wordsData) return null;

  return (
    <section id="all">
      <div className="mb-6">
        <LevelHeader href={`/level/${level}`} title={t("MODE_ALL_TITLE")} />
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <h1 className="text-xl font-bold text-slate-900 flex flex-col items-center gap-3">
          <span className="min-w-max bg-indigo-600 py-1.5 px-3 text-white rounded-xl">
            Level {level?.toUpperCase()}
          </span>
          {t("MODE_ALL_TITLE")}
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-white p-2 h-auto rounded-xl shadow sticky top-24 z-20">
          <TabsTrigger
            value="all"
            className="p-2 text-slate-500 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg"
          >
            {t("LIST_TABS_ALL")}
          </TabsTrigger>
          <TabsTrigger
            value="unlearned"
            className="p-2 text-slate-500 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg"
          >
            {t("LIST_TABS_UNLEARNED")}
          </TabsTrigger>
          <TabsTrigger
            value="learned"
            className="p-2 text-slate-500 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg"
          >
            {t("LIST_TABS_LEARNED")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <WordList words={visibleWords} />
        </TabsContent>

        <TabsContent value="unlearned">
          <WordList
            words={visibleWords}
            emptyText={t("LIST_UNLEARNED_EMPTY")}
          />
        </TabsContent>

        <TabsContent value="learned">
          <WordList words={visibleWords} emptyText={t("LIST_LEARNED_EMPTY")} />
        </TabsContent>
      </Tabs>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 h-auto rounded-xl"
            onClick={handleLoadMore}
          >
            <Plus />
            {t("LOAD_MORE")}
          </Button>
        </div>
      )}
    </section>
  );
}
