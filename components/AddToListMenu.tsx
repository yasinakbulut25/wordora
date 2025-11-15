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
  FolderPlusIcon,
  ListPlus,
  PackageOpen,
  ChevronRight,
  Minus,
} from "lucide-react";
import { Input } from "./ui/input";

interface Props {
  word: string;
  type?: "word" | "sentence";
  meaning?: string;
  example?: string;
}

export default function AddToListMenu({
  word,
  type = "word",
  meaning,
  example,
}: Props) {
  const { lists, createList, toggleItemInList } = useListStore();
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  const handleToggle = (listId: string) => {
    toggleItemInList(listId, {
      id: crypto.randomUUID(),
      word,
      type,
      meaning,
      example,
    });
  };

  const handleCreate = () => {
    if (!listName.trim()) return;

    const newListId = crypto.randomUUID();
    createList(listName.trim(), newListId);

    toggleItemInList(newListId, {
      id: crypto.randomUUID(),
      word,
      type,
      meaning,
      example,
    });

    setListName("");
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="group flex items-center gap-2 text-xs bg-white border border-slate-200 text-slate-900 hover:bg-indigo-600 hover:text-white shadow-none"
        >
          <FolderPlusIcon className="w-4 h-4 text-indigo-600 group-hover:text-white" />
          {/* Listeye Ekle */}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-5 pt-0 max-w-md mx-auto">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderPlus className="text-indigo-600" size={18} />
            Listeye Ekle
          </DrawerTitle>
          <DrawerDescription className="text-slate-500 text-xs">
            Bu kelimeyi mevcut listelerden birine ekleyebilir veya yeni liste
            oluşturabilirsin.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-3 mt-3 max-h-[450px] overflow-auto">
          {lists.length > 0 ? (
            lists.map((list) => {
              const alreadyInList = list.items.some(
                (i) => i.word === word && i.type === type
              );
              return (
                <Button
                  key={list.id}
                  variant="outline"
                  className={`justify-between w-full px-2 shadow-none transition-all ${
                    alreadyInList
                      ? "border-indigo-500 text-indigo-600 bg-indigo-50 hover:bg-indigo-50"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                  onClick={() => handleToggle(list.id)}
                >
                  <span className="flex items-center gap-1">
                    <ChevronRight className="text-indigo-500 w-4 h-4" />
                    {list.name}
                  </span>
                  {alreadyInList ? (
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
              Henüz bir liste oluşturulmamış.
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <ListPlus className="text-indigo-600" size={16} />
            Yeni Liste Oluştur
          </label>
          <div className="flex gap-2 mt-3">
            <Input
              type="text"
              placeholder="Liste adı (örn: Zor Kelimeler)"
              maxLength={40}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
              required
            />
            <Button
              onClick={handleCreate}
              className="bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl h-12"
            >
              Ekle
            </Button>
          </div>
        </div>

        <DrawerFooter className="mt-3 flex justify-end">
          <Button
            className="text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 shadow-none border-none"
            onClick={() => setOpen(false)}
          >
            Kapat
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
