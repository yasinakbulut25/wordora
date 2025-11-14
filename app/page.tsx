import Levels from "../components/Levels";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <section id="home">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-1">
          <span className="w-8 h-8 bg-white flex items-center justify-center rounded-xl">
            <Zap className="text-indigo-600 w-4 min-w-4" />
          </span>
          Continue Your Progress
        </h1>
        <p className="text-sm text-slate-500">
          Pick your level and keep improving your English step by step.
        </p>
      </div>
      <Levels />
    </section>
  );
}
