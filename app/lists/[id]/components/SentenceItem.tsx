"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Volume2 } from "lucide-react";
import { handleSpeak } from "@/lib/speak";
import { useTranslate } from "@/lib/translate";
import { List, SentenceListItem } from "@/types/list";
import { useListStore } from "@/store/useListStore";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

interface SentenceItemProps {
  item: SentenceListItem;
  index: number;
  showTranslations: Record<number, boolean>;
  setShowTranslations: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
  list: List;
}

export default function SentenceItem({
  item,
  index,
  showTranslations,
  setShowTranslations,
  list,
}: SentenceItemProps) {
  const t = useTranslate();
  const { removeItemFromList } = useListStore();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { sentence, translation, word } = item.content;

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-800">{word}</h3>
          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => handleSpeak(sentence)}
              className="bg-indigo-600 text-white hover:bg-indigo-500 min-w-9"
            >
              <Volume2 size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDelete((prev) => !prev)}
              className="hover:text-red-500 text-slate-400 bg-slate-50 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-700">{sentence}</p>

          {showTranslations[index] && translation && (
            <p className="text-indigo-600 text-sm">{translation}</p>
          )}

          {showTranslations[index] && (
            <Button
              size="sm"
              variant="ghost"
              className="w-max p-0 mt-1 h-auto text-yellow-500 hover:text-yellow-400 hover:bg-transparent"
              onClick={() =>
                setShowTranslations((prev) => ({
                  ...prev,
                  [index]: !prev[index],
                }))
              }
            >
              {t("WORDS_SHOW_TRANSLATION")}
            </Button>
          )}
        </div>
      </CardContent>
      <DeleteDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          removeItemFromList(list.id, item.id);
          setShowDelete(false);
        }}
      />
    </Card>
  );
}
