"use client";

import { useParams, useRouter } from "next/navigation";
import { useListStore } from "@/store/useListStore";
import { Button } from "@/components/ui/button";
import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";
import { useState } from "react";
import ListTabs from "./components/ListTabs";

interface Props {
  isFavoritesPage?: boolean;
}
export default function ListDetailPage({ isFavoritesPage = false }: Props) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lists, favoriteList } = useListStore();

  const t = useTranslate();

  const list = isFavoritesPage ? favoriteList : lists.find((l) => l.id === id);
  const [showTranslations, setShowTranslations] = useState<
    Record<number, boolean>
  >({});

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

  return (
    <section className="flex flex-col gap-4">
      <LevelHeader
        title={isFavoritesPage ? t("BOTTOM_NAV_FAVORITES") : list.name}
        backTitle={t("LISTS_DETAIL_BACK")}
        href="/lists"
      />

      <ListTabs
        list={{
          ...list,
          items: [...list.items].reverse(),
        }}
        showTranslations={showTranslations}
        setShowTranslations={setShowTranslations}
      />
    </section>
  );
}
