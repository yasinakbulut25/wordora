"use client";

import { useState } from "react";
import {
  FolderPlus,
  MoreVerticalIcon,
  StarIcon,
  StarOffIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslate } from "@/lib/translate";
import { WordData } from "@/types/word";
import AddToListMenu from "@/components/AddToListMenu";
import { useListStore } from "@/store/useListStore";
import { useUserStore } from "@/store/useUserStore";
import { useProgressStore } from "@/store/useProgressStore";
import { SealCheckIcon } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { Levels } from "@/store/useLevelsStore";

interface Props {
  item: WordData;
}

export default function WordDropdown({ item }: Props) {
  const { level } = useParams<{ level: Levels }>();
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);
  const { user } = useUserStore();
  const { isFavorite, toggleFavorite } = useListStore();
  const { toggleLearned, isLearned } = useProgressStore();
  const t = useTranslate();

  if (!user) return;

  const isFav = isFavorite({
    type: "word",
    content: {
      word: item.word,
      meanings: item.meanings,
    },
  });

  const learned = isLearned(item.word);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Open menu"
            size="icon"
            className="bg-slate-50 shadow-none border-slate-100 h-auto text-slate-500 hover:text-slate-700"
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-44 border-slate-200 shadow-sm"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex items-center gap-2 text-xs py-3 cursor-pointer"
              onSelect={() => setShowAddToListMenu(true)}
            >
              <FolderPlus className="text-indigo-600" />{" "}
              {t("ADD_TO_LIST_TITLE")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-xs py-3 cursor-pointer"
              onSelect={() =>
                toggleLearned(user.id, level!, item.word, item.meanings)
              }
            >
              <SealCheckIcon
                className={`${learned ? "text-green-600" : "text-indigo-600"}`}
              />{" "}
              {learned ? t("WORDS_LEARNED") : t("WORDS_MARK_LEARNED")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-xs py-3 cursor-pointer"
              onSelect={() =>
                toggleFavorite(user.id, {
                  type: "word",
                  content: {
                    word: item.word,
                    meanings: item.meanings,
                  },
                })
              }
            >
              {isFav ? (
                <>
                  <StarOffIcon className="text-yellow-500" />{" "}
                  {t("REMOVE_FROM_FAVORITES")}
                </>
              ) : (
                <>
                  <StarIcon className="text-indigo-600" />{" "}
                  {t("ADD_TO_FAVORITES")}
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddToListMenu
        useCustomActionBtn={{
          isCustomOpen: showAddToListMenu,
          setCustomOpen: setShowAddToListMenu,
        }}
        current={{
          word: item.word,
          meanings: [item.meanings[0]],
        }}
        type="word"
      />
    </>
  );
}
