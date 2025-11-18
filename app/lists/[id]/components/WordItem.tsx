"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { handleSpeak } from "@/lib/speak";
import { List, WordListItem } from "@/types/list";
import { ArrowRight, Trash2, Volume2 } from "lucide-react";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { useListStore } from "@/store/useListStore";

interface WordItemProps {
  item: WordListItem;
  list: List;
}

export default function WordItem({ list, item }: WordItemProps) {
  const { removeItemFromList } = useListStore();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  return (
    <Card className="border border-slate-200 shadow-none">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-800">
            {item.content.word}
          </h3>

          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => handleSpeak(item.content.word)}
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

        {item.content.meaning && (
          <ul className="text-slate-900 text-sm list-none">
            <li className="text-sm flex items-center gap-1">
              <ArrowRight height={14} className="text-indigo-600" />
              {item.content.meaning}
            </li>
          </ul>
        )}
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
