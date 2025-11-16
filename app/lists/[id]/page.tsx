"use client";

import { useParams, useRouter } from "next/navigation";
import { useListStore } from "@/store/useListStore";
import { Button } from "@/components/ui/button";
import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";
import { useState } from "react";
import ListTabs from "./components/ListTabs";
import DeleteDialog from "./components/DeleteDialog";

export default function ListDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lists, removeItemFromList } = useListStore();
  const t = useTranslate();

  const list = lists.find((l) => l.id === id);
  const [showTranslations, setShowTranslations] = useState<
    Record<number, boolean>
  >({});
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (!list)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-slate-500 text-sm">{t("LISTS_NOT_FOUND")}</p>
        <Button
          onClick={() => router.push("/lists")}
          className="mt-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-400"
        >
          {t("LISTS_NOT_FOUND_BACK")}
        </Button>
      </div>
    );

  const confirmDelete = (itemId: string) => {
    removeItemFromList(list.id, itemId);
    setConfirmId(null);
  };

  return (
    <section className="flex flex-col gap-4">
      <LevelHeader
        title={list.name}
        backTitle={t("LISTS_DETAIL_BACK")}
        href="/lists"
      />

      <ListTabs
        list={list}
        showTranslations={showTranslations}
        setShowTranslations={setShowTranslations}
        onConfirm={setConfirmId}
        confirmDelete={confirmDelete}
      />

      <DeleteDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => confirmId && confirmDelete(confirmId)}
      />
    </section>
  );
}
