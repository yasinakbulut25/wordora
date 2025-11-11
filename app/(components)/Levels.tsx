"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Blocks,
  BookOpen,
  GemIcon,
  GraduationCap,
  Shapes,
  Sparkle,
} from "lucide-react";

const iconSize = 42;
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {levels.map((item) => (
        <Card
          key={item.id}
          className={`relative rounded-2xl bg-${item.color}-100 border-2 border-${item.color}-500 shadow-none hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden`}
        >
          <CardContent className="p-5 flex flex-col gap-3 justify-between h-full text-left">
            <div
              className={`w-[74px] h-[74px] z-0 bg-${item.color}-500/20 rounded-full flex items-center justify-center absolute -right-3 -top-2`}
            >
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              {item.level}
            </h3>
            <p className="text-left text-xs text-slate-600 z-10">{item.desc}</p>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-500">progress</p>
                <span className="text-xs font-medium text-slate-700">
                  {item.progress}%
                </span>
              </div>
              <Progress
                value={item.progress}
                innerBg={`bg-${item.color}-500`}
                className={`h-2 bg-${item.color}-200`}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
