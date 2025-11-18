"use client";

import { useState } from "react";
import { useListStore } from "@/store/useListStore";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Plus,
  FolderPlus,
  ListPlus,
  PackageOpen,
  ChevronRight,
  Minus,
  FolderPlusIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { useUserStore } from "@/store/useUserStore";
import { type ListItem, WordContent, SentenceContent } from "@/types/list";
import { useTranslate } from "@/lib/translate";

interface CustomActionProps {
  isCustomOpen: boolean;
  setCustomOpen: (val: boolean) => void;
}
interface WordProps {
  type: "word";
  current: WordContent;
  useCustomActionBtn?: CustomActionProps;
}

interface SentenceProps {
  type: "sentence";
  current: SentenceContent;
  useCustomActionBtn?: CustomActionProps;
}

type Props = WordProps | SentenceProps;

export default function AddToListMenu({
  current,
  type,
  useCustomActionBtn,
}: Props) {
  const t = useTranslate();
  const { user } = useUserStore();
  const { lists, createList, toggleItemInList } = useListStore();

  // 1. Dışarıdan kontrol edilmeyen durumlarda kullanılmak üzere yerel `open` durumunu tanımlayın.
  // Eğer `useCustomActionBtn` varsa, kontrol dışarıya ait demektir.
  const [localOpen, setLocalOpen] = useState(false);
  const [listName, setListName] = useState("");

  // 2. Drawer'ın durumunu hangi kaynaktan alacağını belirleyin:
  const open = useCustomActionBtn?.isCustomOpen ?? localOpen;

  // 3. Drawer'ın durumu değiştiğinde ne olacağını tanımlayın:
  const handleOpenChange = (newOpen: boolean) => {
    if (useCustomActionBtn) {
      // Dışarıdan kontrol ediliyorsa, dış durumu güncelleyin
      useCustomActionBtn.setCustomOpen(newOpen);
    } else {
      // Yerel olarak kontrol ediliyorsa, yerel durumu güncelleyin
      setLocalOpen(newOpen);
    }
    setListName(""); // Açılıp kapanırken list adını temizle
  };

  const makeContent = (): WordContent | SentenceContent => {
    if (type === "word") {
      return {
        word: current.word,
        meaning: current.meaning,
      };
    }

    return {
      word: current.word,
      sentence: current.sentence,
      translation: current.translation,
    };
  };

  const handleToggle = async (listId: string) => {
    if (!user) return;

    const newItem: Omit<ListItem, "id" | "created_at" | "list_id"> = {
      type,
      content: makeContent(),
    };

    await toggleItemInList(listId, newItem);
  };

  const handleCreateList = async () => {
    if (!listName.trim() || !user) return;

    const newList = await createList(user.id, listName.trim());

    if (newList) {
      const newItem: Omit<ListItem, "id" | "created_at" | "list_id"> = {
        type,
        content: makeContent(),
      };
      await toggleItemInList(newList.id, newItem);
    }

    setListName("");
  };

  const checkIsInList = (items: ListItem[]): boolean => {
    return items.some((i) => {
      const c = i.content;
      const nc = makeContent();

      if ("word" in c && "word" in nc) return c.word === nc.word;
      if ("sentence" in c && "sentence" in nc)
        return c.sentence === nc.sentence;

      return false;
    });
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      {!useCustomActionBtn && (
        <DrawerTrigger asChild>
          <Button
            size="icon"
            className="group flex items-center gap-2 text-xs bg-white border border-slate-200 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-none"
          >
            <FolderPlusIcon className="w-4 h-4 text-indigo-600 group-hover:text-white" />
          </Button>
        </DrawerTrigger>
      )}

      <DrawerContent className="px-5 pt-0 max-w-md mx-auto">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderPlus className="text-indigo-600" size={18} />
            {t("ADD_TO_LIST_TITLE")}
          </DrawerTitle>
          <DrawerDescription className="text-slate-500 text-xs text-left">
            {t("ADD_TO_LIST_DESC")}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-3 mt-3 max-h-[450px] overflow-auto">
          {lists.length > 0 ? (
            lists.map((list) => {
              const isAlready = checkIsInList(list.items);

              return (
                <Button
                  key={list.id}
                  variant="outline"
                  onClick={() => handleToggle(list.id)}
                  className={`justify-between w-full px-2 shadow-none transition-all ${
                    isAlready
                      ? "border-indigo-500 text-indigo-600 bg-indigo-50 hover:bg-indigo-50"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <ChevronRight className="text-indigo-500 w-4 h-4" />
                    {list.name}
                  </span>

                  {isAlready ? (
                    <Minus className="text-indigo-500 w-4 h-4" />
                  ) : (
                    <Plus className="text-indigo-500 w-4 h-4" />
                  )}
                </Button>
              );
            })
          ) : (
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <PackageOpen size={12} />
              {t("LIST_EMPTY_DESC")}.
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <ListPlus className="text-indigo-600" size={16} />
            {t("CREATE_NEW_LIST")}
          </label>

          <div className="flex gap-2 mt-3">
            <Input
              type="text"
              placeholder={t("LISTS_CREATE_PLACEHOLDER")}
              maxLength={40}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
            />
            <Button
              onClick={handleCreateList}
              className="bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl h-12"
            >
              {t("LISTS_ADD_BUTTON")}
            </Button>
          </div>
        </div>

        <DrawerFooter className="mt-3 flex justify-end">
          <Button
            className="text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 shadow-none border-none"
            onClick={() => handleOpenChange(false)}
          >
            {t("CLOSE_BUTTON")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
