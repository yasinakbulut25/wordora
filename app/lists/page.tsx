"use client";

import { useListStore } from "@/store/useListStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, Plus, FolderPlus, FolderOpen } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslate } from "@/lib/translate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/store/useUserStore";

export default function ListsPage() {
  const { user } = useUserStore();
  const { lists, createList, deleteList } = useListStore();
  const [newListName, setNewListName] = useState("");
  const [targetId, setTargetId] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslate();

  const handleCreateList = () => {
    if (!user) return;

    if (!newListName.trim()) return;
    createList(user.id, newListName.trim());
    setNewListName("");
  };

  if (!lists.length)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <FolderPlus className="text-indigo-500 w-12 h-12 mb-3" />
        <h2 className="text-xl font-semibold text-slate-700 mb-1">
          {t("LISTS_NO_LIST_TITLE")}
        </h2>
        <p className="text-slate-500 text-sm mb-6">{t("LISTS_NO_LIST_DESC")}</p>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Input
            type="text"
            placeholder={t("LISTS_CREATE_PLACEHOLDER")}
            maxLength={40}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
            required
          />
          <Button
            onClick={handleCreateList}
            className="bg-indigo-600 text-white rounded-full py-3 h-auto hover:bg-indigo-500"
          >
            <Plus className="w-4 h-4 mr-1" /> {t("LISTS_CREATE_BUTTON")}
          </Button>
        </div>
      </div>
    );

  return (
    <section id="lists">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-1">
          <FolderPlus className="text-indigo-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-slate-700">
            {t("LISTS_TITLE")}
          </h1>
        </div>
        <p className="text-slate-500 text-sm">{t("LISTS_SUBTITLE")}</p>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder={t("LISTS_CREATE_PLACEHOLDER")}
          maxLength={40}
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
          required
        />
        <Button
          onClick={handleCreateList}
          className="bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl h-12"
        >
          <Plus className="w-4 h-4" /> {t("LISTS_ADD_BUTTON")}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {lists.map((list) => (
          <Card
            key={list.id}
            className="border-2 border-slate-200 rounded-2xl shadow-none transition-all"
          >
            <CardContent className="px-4 py-3 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-base text-slate-800 flex items-center gap-2">
                  <FolderOpen className="text-indigo-500 min-w-4" size={18} />
                  {list.name}
                </h2>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="min-w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => setTargetId(list.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-sm rounded-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-1">
                        <Trash2 size={18} className="text-red-600" />
                        {t("LISTS_DELETE_CONFIRM_TITLE")}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-left">
                        {t("LISTS_DELETE_CONFIRM_DESC")}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        {t("LISTS_DELETE_CONFIRM_CANCEL")}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (targetId) deleteList(targetId);
                          setTargetId(null);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        {t("LISTS_DELETE_CONFIRM_OK")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {list.items.length} {t("LISTS_ITEMS_COUNT")}
                </p>
                <Button
                  onClick={() => router.push(`/lists/${list.id}`)}
                  className="text-xs bg-indigo-600 text-white rounded-full py-2 hover:bg-indigo-500"
                >
                  {t("LISTS_VIEW_BUTTON")}{" "}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
