"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WordItem from "./WordItem";
import SentenceItem from "./SentenceItem";
import { useTranslate } from "@/lib/translate";
import { isSentenceItem, isWordItem, List } from "@/types/list";

interface ListTabsProps {
  list: List;
  showTranslations: Record<number, boolean>;
  setShowTranslations: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
}

export default function ListTabs({
  list,
  showTranslations,
  setShowTranslations,
}: ListTabsProps) {
  const t = useTranslate();
  const words = list.items.filter(isWordItem);
  const sentences = list.items.filter(isSentenceItem);

  return (
    <Tabs defaultValue="all" className="relative w-full">
      <TabsList className="grid grid-cols-3 mb-4 bg-white p-2 h-auto rounded-xl shadow sticky top-24">
        <TabsTrigger
          className="p-2 text-slate-500 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-none rounded-lg"
          value="all"
        >
          {t("LIST_TABS_ALL")}
        </TabsTrigger>
        <TabsTrigger
          className="p-2 text-slate-500 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-none rounded-lg"
          value="word"
        >
          {t("LIST_TABS_WORD")}
        </TabsTrigger>
        <TabsTrigger
          className="p-2 text-slate-500 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-none rounded-lg"
          value="sentence"
        >
          {t("LIST_TABS_SENTENCE")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {list.items.length === 0 ? (
          <p className="text-slate-500 text-center">{t("LIST_EMPTY_DESC")}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {list.items.map((item, index) => {
              if (isWordItem(item)) {
                return <WordItem key={item.id} item={item} list={list} />;
              }

              if (isSentenceItem(item)) {
                return (
                  <SentenceItem
                    key={item.id}
                    item={item}
                    index={index}
                    list={list}
                    showTranslations={showTranslations}
                    setShowTranslations={setShowTranslations}
                  />
                );
              }
              return;
            })}
          </div>
        )}
      </TabsContent>

      <TabsContent value="word">
        {words.length === 0 ? (
          <p className="text-slate-500 text-center">
            {t("LIST_WORD_EMPTY_DESC")}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {words.map((item) => (
              <WordItem key={item.id} item={item} list={list} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="sentence">
        {sentences.length === 0 ? (
          <p className="text-slate-500 text-center">
            {t("LIST_SENTENCE_EMPTY_DESC")}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {sentences.map((item, index: number) => (
              <SentenceItem
                key={item.id}
                item={item}
                index={index}
                list={list}
                showTranslations={showTranslations}
                setShowTranslations={setShowTranslations}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
