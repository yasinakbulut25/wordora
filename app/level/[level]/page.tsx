"use client";

import { useRouter, useParams } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  Languages,
  PencilLine,
  ChevronRight,
} from "lucide-react";
import LevelHeader from "@/components/LevelHeader";
import { useTranslate } from "@/lib/translate";

const modes = [
  {
    id: "learn",
    title: "MODE_LEARN_TITLE",
    desc: "MODE_LEARN_DESC",
    icon: <BookOpen size={36} className="text-white" />,
    gradient: "from-indigo-600 to-purple-300",
    baseClass: "border border-slate-200 bg-indigo-50 shadow-none",
    text: "text-indigo-600",
  },
  {
    id: "quiz",
    title: "MODE_QUIZ_TITLE",
    desc: "MODE_QUIZ_DESC",
    icon: <GraduationCap size={36} className="text-white" />,
    gradient: "from-sky-600 to-cyan-300",
    baseClass: "border border-slate-200 bg-sky-50 shadow-none",
    text: "text-sky-500",
  },
  {
    id: "translate",
    title: "MODE_TRANSLATE_TITLE",
    desc: "MODE_TRANSLATE_DESC",
    icon: <Languages size={36} className="text-white" />,
    gradient: "from-teal-600 to-emerald-300",
    baseClass: "border border-slate-200 bg-teal-50 shadow-none",
    text: "text-teal-500",
  },
  {
    id: "fill",
    title: "MODE_FILL_TITLE",
    desc: "MODE_FILL_DESC",
    icon: <PencilLine size={36} className="text-white" />,
    gradient: "from-pink-600 to-rose-300",
    baseClass: "border border-slate-200 bg-pink-50 shadow-none",
    text: "text-pink-500",
  },
];

export default function LevelModesPage() {
  const router = useRouter();
  const { level } = useParams<{ level: string }>();
  const t = useTranslate();

  const handleNavigate = (id: string) => {
    router.push(`/level/${level}/${id}`);
  };

  return (
    <>
      <div className="mb-6">
        <LevelHeader
          href={`/`}
          title={level}
          backTitle={t("MODE_BACK_TITLE")}
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-1">
          <span className="bg-indigo-600 py-1.5 px-2.5 text-white rounded-xl">
            Level {level?.toUpperCase()}
          </span>{" "}
          {t("LEVEL_WELCOME_TITLE")}
        </h1>
        <p className="text-sm text-slate-600">{t("LEVEL_WELCOME_DESC")}</p>
      </div>

      <div className="flex flex-col gap-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => handleNavigate(mode.id)}
            className={`cursor-pointer bg-white rounded-2xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] ${mode.baseClass}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 min-w-14 min-h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${mode.gradient} shadow-md`}
                >
                  {mode.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {t(mode.title)}
                  </h2>
                  <p className="text-sm text-slate-600">{t(mode.desc)}</p>
                </div>
              </div>

              <ChevronRight
                className={`${mode.text} w-8 h-8 min-w-8 min-h-8`}
                size={28}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
