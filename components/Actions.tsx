"use client";

import AddToListMenu from "./AddToListMenu";
import { Button } from "./ui/button";
import { SentenceContent, WordContent } from "@/types/list";
import { handleSpeak } from "@/lib/speak";
import { useTranslate } from "@/lib/translate";
import { useListStore } from "@/store/useListStore";
import { useUserStore } from "@/store/useUserStore";
import { StarIcon, StarOffIcon, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WordProps {
  type: "word";
  current: WordContent;
}

interface SentenceProps {
  type: "sentence";
  current: SentenceContent;
}

type Props = WordProps | SentenceProps;

export default function Actions({ type, current }: Props) {
  const t = useTranslate();
  const { user } = useUserStore();
  const { toggleFavorite, isFavorite } = useListStore();

  if (!user) return;

  const isWordItem = type === "word";
  let content = current;

  if (isWordItem) {
    content = {
      word: current.word,
      meanings: current.meanings,
    };
  } else {
    content = {
      word: current.word,
      sentence: current.sentence,
      translation: current.translation,
    };
  }

  const isFav = isFavorite({
    type: type,
    content: content,
  });

  return (
    <div className="flex items-center justify-center gap-3">
      {isWordItem ? (
        <AddToListMenu
          type="word"
          current={{
            word: current.word,
            meanings: [current.meanings[0]],
          }}
        />
      ) : (
        <AddToListMenu
          type="sentence"
          current={{
            word: current.word,
            sentence: current.sentence,
            translation: current.translation,
          }}
        />
      )}

      <Button
        onClick={() =>
          handleSpeak(isWordItem ? current.word : current.sentence)
        }
        className="group flex items-center gap-2 text-xs bg-white border border-slate-200 text-slate-900 hover:bg-initial shadow-none px-3 transition-all active:scale-90"
      >
        <Volume2 className="w-4 h-4 text-indigo-600" />
        {t("VOICE")}
      </Button>

      <Button
        size="icon"
        onClick={() =>
          toggleFavorite(user.id, {
            type: type,
            content: content,
          })
        }
        className={cn(
          "group flex items-center gap-2 text-xs border hover:bg-initial shadow-none transition-all active:scale-90",
          isFav
            ? "bg-indigo-600 border-indigo-600 text-white "
            : "bg-white border-slate-200 text-indigo-600"
        )}
      >
        {isFav ? (
          <StarOffIcon className="w-4 h-4" />
        ) : (
          <StarIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
