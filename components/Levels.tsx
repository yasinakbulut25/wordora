"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslate } from "@/lib/translate";
import { useProgressStore } from "@/store/useProgressStore";
import { useUserStore } from "@/store/useUserStore";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  GemIcon,
  GraduationCap,
  Shapes,
  Sparkle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const iconSize = 42;

const colorMap = {
  pink: {
    bgLight: "bg-pink-100",
    border: "border-pink-500",
    text: "text-pink-600",
    progress: "bg-pink-500",
    progressBg: "bg-pink-200",
    ring: "ring-pink-200",
  },
  blue: {
    bgLight: "bg-blue-100",
    border: "border-blue-500",
    text: "text-blue-600",
    progress: "bg-blue-500",
    progressBg: "bg-blue-200",
    ring: "ring-blue-200",
  },
  purple: {
    bgLight: "bg-purple-100",
    border: "border-purple-500",
    text: "text-purple-600",
    progress: "bg-purple-500",
    progressBg: "bg-purple-200",
    ring: "ring-purple-200",
  },
  green: {
    bgLight: "bg-green-100",
    border: "border-green-500",
    text: "text-green-600",
    progress: "bg-green-500",
    progressBg: "bg-green-200",
    ring: "ring-green-200",
  },
  yellow: {
    bgLight: "bg-yellow-100",
    border: "border-yellow-500",
    text: "text-yellow-600",
    progress: "bg-yellow-500",
    progressBg: "bg-yellow-200",
    ring: "ring-yellow-200",
  },
  teal: {
    bgLight: "bg-teal-100",
    border: "border-teal-500",
    text: "text-teal-600",
    progress: "bg-teal-500",
    progressBg: "bg-teal-200",
    ring: "ring-teal-200",
  },
} as const;

const levels = [
  {
    id: 1,
    level: "A1",
    desc: "LEVEL_A1_DESC",
    color: "pink",
    progress: 25,
    icon: <Shapes className="text-pink-600" size={iconSize} />,
  },
  {
    id: 2,
    level: "A2",
    desc: "LEVEL_A2_DESC",
    color: "blue",
    progress: 45,
    icon: <Blocks className="text-blue-600" size={iconSize} />,
  },
  {
    id: 3,
    level: "B1",
    desc: "LEVEL_B1_DESC",
    color: "purple",
    progress: 56,
    icon: <Sparkle className="text-purple-600" size={iconSize} />,
  },
  {
    id: 4,
    level: "B2",
    desc: "LEVEL_B2_DESC",
    color: "green",
    progress: 72,
    icon: <BookOpen className="text-green-600" size={iconSize} />,
  },
  {
    id: 5,
    level: "C1",
    desc: "LEVEL_C1_DESC",
    color: "yellow",
    progress: 84,
    icon: <GraduationCap className="text-yellow-600" size={iconSize} />,
  },
  {
    id: 6,
    level: "C2",
    desc: "LEVEL_C2_DESC",
    color: "teal",
    progress: 94,
    icon: <GemIcon className="text-teal-600" size={iconSize} />,
  },
];

export default function Levels() {
  const { level, setLevel } = useUserStore();
  const { getProgress } = useProgressStore();
  const t = useTranslate();

  const [selected, setSelected] = useState<string | null>(level);

  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const router = useRouter();

  // localStorage'daki seçimi geri yükle
  useEffect(() => {
    if (selected) {
      setLevel(selected);
    }
  }, [selected, setLevel]);

  // Seviye kelime sayısını getir (json dosyalarından)
  useEffect(() => {
    const loadCounts = async () => {
      const result: Record<string, number> = {};
      for (const l of levels) {
        try {
          const res = await fetch(`/data/levels/${l.level.toLowerCase()}.json`);
          const data = await res.json();
          result[l.level.toLowerCase()] = data.length;
        } catch {
          result[l.level.toLowerCase()] = 0;
        }
      }
      setWordCounts(result);
    };
    loadCounts();
  }, []);

  // Seviye seçimi
  const handleSelect = (code: string) => {
    setSelected(code);
    setLevel(code);
    localStorage.setItem("wordora_level", code);
  };

  // Devam butonu
  const handleContinue = () => {
    if (!selected) {
      alert("Please select your level to continue.");
      return;
    }
    router.push(`/level/${level}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {levels.map((item) => {
          const colors = colorMap[item.color as keyof typeof colorMap];
          const total = wordCounts[item.level.toLowerCase()] || 0;
          const progress = getProgress(item.level, total);

          return (
            <Card
              key={item.id}
              onClick={() => handleSelect(item.level)}
              className={`relative rounded-2xl ${colors.bgLight} ${
                colors.border
              } border-2 shadow-none cursor-pointer overflow-hidden ${
                item.level === level ? `ring-[8px] ${colors.ring}` : ""
              }`}
            >
              <CardContent className="p-5 flex flex-col gap-3 justify-between h-full text-left">
                <div
                  className={`w-[74px] h-[74px] z-0 ${colors.progressBg} rounded-full flex items-center justify-center absolute -right-3 -top-2`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {item.level}
                </h3>
                <p className="text-left text-xs text-slate-900 z-10 flex flex-col gap-2">
                  {t(item.desc)}
                  <span className={`${colors.text} font-bold text-sm`}>
                    {total}{" "}
                    <span className="text-xs">{t("LEVEL_TOTAL_WORDS")}</span>
                  </span>
                </p>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500">
                      {t("LEVEL_PROGRESS")}
                    </p>
                    <span className="text-xs font-medium text-slate-700">
                      {progress}%
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    innerBg={colors.progress}
                    className={`h-2 ${colors.progressBg}`}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Button
        onClick={!selected ? () => null : handleContinue}
        disabled={selected === null}
        className="bg-indigo-600 w-full text-white font-bold mt-6 rounded-full px-2 py-6 hover:bg-indigo-500 transition-all active:scale-90"
      >
        {t("CONTINUE")}
        <ArrowRight width={16} className="text-yellow-300" />
      </Button>
    </div>
  );
}
