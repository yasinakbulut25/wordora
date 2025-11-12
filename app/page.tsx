import Levels from "../components/Levels";

export default function Home() {
  return (
    <section className="">
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-xl font-bold text-slate-900">
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
