"use client";

import { useState } from "react";
import { FolderPlus, Heart, MoreVerticalIcon, Volume2 } from "lucide-react";

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

interface Props {
  example: Example;
  word: string;
}

export default function SentenceDropdown({ example, word }: Props) {
  const t = useTranslate();
  const [showAddToListMenu, setShowAddToListMenu] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Open menu"
            size="icon"
            className="bg-slate-100 shadow-none border-slate-200 h-auto w-auto p-1 text-slate-500"
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-44 border-slate-200 shadow-sm"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm"
              onSelect={() => setShowAddToListMenu(true)}
            >
              <FolderPlus className="text-indigo-600" />{" "}
              {t("ADD_TO_LIST_TITLE")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm"
              onSelect={() => handleSpeak(example.en)}
            >
              <Volume2 className="text-indigo-600" /> {t("VOICE")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-sm"
              onSelect={() => setShowAddToListMenu(true)}
            >
              <Heart className="text-indigo-600" /> {t("ADD_TO_FAVOURITES")}
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
