import { WordData } from "@/types/word";
import { WordCard } from "./WordCard";

export function WordList({
  words,
  emptyText,
}: {
  words: WordData[];
  emptyText?: string;
}) {
  if (words.length === 0) {
    return (
      <p className="text-slate-500 text-center py-4">
        {emptyText ?? "Bu sekmede kelime yok."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {words.map((item, i) => (
        <WordCard key={i} item={item} />
      ))}
    </div>
  );
}
