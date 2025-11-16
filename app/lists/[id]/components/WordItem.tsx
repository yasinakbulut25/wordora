"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { handleSpeak } from "@/lib/speak";
import { ArrowRight, Trash2, Volume2 } from "lucide-react";

interface WordItemProps {
  item: {
    id: string;
    word: string;
    meaning?: string;
  };
  onConfirm: (id: string) => void;
}

export default function WordItem({ item, onConfirm }: WordItemProps) {
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
              onClick={() => onConfirm(item.id)}
              className="hover:text-red-500 text-slate-400 bg-slate-50 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        {item.meaning && (
          <ul className="text-slate-900 text-sm list-none">
            <li className="text-sm flex items-center gap-1">
              <ArrowRight height={14} className="text-indigo-600" />
              {item.meaning}
            </li>
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
