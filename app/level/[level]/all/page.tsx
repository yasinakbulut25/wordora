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

  const loadCount = 20;
  const [limit, setLimit] = useState(loadCount);

  const visibleWords = useMemo(() => {
    return wordsData.slice(0, limit);
  }, [wordsData, limit]);

  const learnedWords = visibleWords.filter((w) => isLearned(w.word));
  const unlearnedWords = visibleWords.filter((w) => !isLearned(w.word));

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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-white p-2 h-auto rounded-xl shadow sticky top-24">
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
            words={unlearnedWords}
            emptyText={t("LIST_UNLEARNED_EMPTY")}
          />
        </TabsContent>

        <TabsContent value="learned">
          <WordList words={learnedWords} emptyText={t("LIST_LEARNED_EMPTY")} />
        </TabsContent>
      </Tabs>

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
