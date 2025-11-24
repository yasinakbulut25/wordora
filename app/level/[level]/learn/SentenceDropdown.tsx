"use client";

import { useState } from "react";
import {
  FolderPlus,
  MoreVerticalIcon,
  StarIcon,
  StarOffIcon,
  Volume2,
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
import { handleSpeak } from "@/lib/speak";
import { Example } from "@/types/word";
import AddToListMenu from "@/components/AddToListMenu";
import { useListStore } from "@/store/useListStore";
import { useUserStore } from "@/store/useUserStore";

interface Props {
  example: Example;
  word: string;
}

export default function SentenceDropdown({ example, word }: Props) {
  const t = useTranslate();
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);
  const { user } = useUserStore();
  const { isFavorite, toggleFavorite } = useListStore();

  if (!user) return;

  const isFav = isFavorite({
    type: "sentence",
    content: {
      word: word,
      sentence: example.en,
      translation: example.tr,
    },
  });

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Open menu"
            size="icon"
            className="bg-slate-50 shadow-none border-slate-100 h-auto w-auto p-1 text-slate-500"
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
              onSelect={() => handleSpeak(example.en)}
            >
              <Volume2 className="text-indigo-600" /> {t("VOICE")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-xs py-3 cursor-pointer"
              onSelect={() =>
                toggleFavorite(user.id, {
                  type: "sentence",
                  content: {
                    word: word,
                    sentence: example.en,
                    translation: example.tr,
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
          word: word,
          sentence: example.en,
          translation: example.tr,
        }}
        type="sentence"
      />
    </>
  );
}
