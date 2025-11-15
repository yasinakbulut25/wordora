"use client";

import { useTranslate } from "@/lib/translate";
import Levels from "../components/Levels";
import { Zap } from "lucide-react";

export default function Home() {
  const t = useTranslate();

  return (
    <section id="home">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-1">
          <span className="w-8 h-8 bg-white flex items-center justify-center rounded-xl">
            <Zap className="text-indigo-600 w-4 min-w-4" />
          </span>
          {t("CONTINUE_PROGRESS")}
        </h1>
        <p className="text-sm text-slate-500">{t("SELECT_LEVEL_DESC")}</p>
      </div>
      <Levels />
    </section>
  );
}
