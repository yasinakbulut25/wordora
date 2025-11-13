import Levels from "../components/Levels";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <section className="">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-1">
          <Zap className="text-indigo-600" /> Continue Your Progress
        </h1>
        <p className="text-sm text-slate-500">
          Pick your level and keep improving your English step by step.
        </p>
      </div>
      <Levels />
    </section>
  );
}
