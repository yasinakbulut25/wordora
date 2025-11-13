"use client";

import { useRouter, useParams } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  Languages,
  PencilLine,
  ChevronRight,
  LayoutList,
} from "lucide-react";

const modes = [
  {
    id: "learn",
    title: "Kelimeleri Öğren",
    desc: "Kelimelerin anlamlarını ve örnek cümlelerini incele.",
    icon: <BookOpen size={36} className="text-white" />,
    gradient: "from-indigo-600 to-purple-300",
    baseClass: "border-2 border-indigo-600 bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    id: "quiz",
    title: "10 Soruluk Quiz",
    desc: "Kelime bilginizi test edin.",
    icon: <GraduationCap size={36} className="text-white" />,
    gradient: "from-sky-600 to-cyan-300",
    baseClass: "border-2 border-sky-500 bg-sky-50",
    text: "text-sky-500",
  },
  {
    id: "translate",
    title: "Cümle Çeviri",
    desc: "Cümleler ile çeviri pratiği yapın.",
    icon: <Languages size={36} className="text-white" />,
    gradient: "from-teal-600 to-emerald-300",
    baseClass: "border-2 border-teal-500 bg-teal-50",
    text: "text-teal-500",
  },
  {
    id: "fill",
    title: "Boşluk Doldur",
    desc: "Eksik kelimeyi doğru tamamlayın.",
    icon: <PencilLine size={36} className="text-white" />,
    gradient: "from-pink-600 to-rose-300",
    baseClass: "border-2 border-pink-500 bg-pink-50",
    text: "text-pink-500",
  },
];

export default function LevelModesPage() {
  const router = useRouter();
  const { level } = useParams<{ level: string }>();

  const handleNavigate = (id: string) => {
    router.push(`/level/${level}/${id}`);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-1">
          <LayoutList className="text-indigo-600" /> Level{" "}
          {level?.toUpperCase()} Yolculuğuna Hoş Geldin!
        </h1>
        <p className="text-sm text-slate-500">
          Kendi hızında ilerle, yeni kelimeler öğren, pratik yap ve seviyeni
          güçlendir.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => handleNavigate(mode.id)}
            className={`cursor-pointer bg-white rounded-2xl p-4 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] ${mode.baseClass}`}
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
                    {mode.title}
                  </h2>
                  <p className="text-sm text-slate-600">{mode.desc}</p>
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
    </div>
  );
}
