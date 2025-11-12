"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
    title: "Introduction",
    desc: "Basic vocabulary & phrases",
    color: "pink",
    progress: 25,
    icon: <Shapes className="text-pink-600" size={iconSize} />,
  },
  {
    id: 2,
    level: "A2",
    title: "Conversation",
    desc: "Simple sentences & topics",
    color: "blue",
    progress: 45,
    icon: <Blocks className="text-blue-600" size={iconSize} />,
  },
  {
    id: 3,
    level: "B1",
    title: "Reading",
    desc: "Intermediate comprehension",
    color: "purple",
    progress: 56,
    icon: <Sparkle className="text-purple-600" size={iconSize} />,
  },
  {
    id: 4,
    level: "B2",
    title: "Listening",
    desc: "Understand conversations",
    color: "green",
    progress: 72,
    icon: <BookOpen className="text-green-600" size={iconSize} />,
  },
  {
    id: 5,
    level: "C1",
    title: "Writing",
    desc: "Advanced grammar practice",
    color: "yellow",
    progress: 84,
    icon: <GraduationCap className="text-yellow-600" size={iconSize} />,
  },
  {
    id: 6,
    level: "C2",
    title: "Mastery",
    desc: "Fluency & expression in native",
    color: "teal",
    progress: 94,
    icon: <GemIcon className="text-teal-600" size={iconSize} />,
  },
];

export default function Levels() {
  const { level, setLevel } = useUserStore();
  const [selected, setSelected] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("wordora_level");
    }
    return null;
  });
  const router = useRouter();

  // localStorage'daki seçimi geri yükle
  useEffect(() => {
    if (selected) {
      setLevel(selected);
    }
  }, [selected, setLevel]);

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
    router.push("/dashboard");
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {levels.map((item) => {
          const colors = colorMap[item.color as keyof typeof colorMap];

          return (
            <Card
              key={item.id}
              onClick={() => handleSelect(item.level)}
              className={`relative rounded-2xl ${colors.bgLight} ${
                colors.border
              } border-2 shadow-none hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden ${
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
                <p className="text-left text-xs text-slate-600 z-10">
                  {item.desc}
                </p>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500">progress</p>
                    <span className="text-xs font-medium text-slate-700">
                      {item.progress}%
                    </span>
                  </div>
                  <Progress
                    value={item.progress}
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
        onClick={handleContinue}
        className="bg-indigo-600 w-full text-white font-bold mt-6 rounded-full px-2 py-6 hover:bg-indigo-500 transition-all"
      >
        Continue
        <ArrowRight width={16} className="text-yellow-300" />
      </Button>
    </div>
  );
}
