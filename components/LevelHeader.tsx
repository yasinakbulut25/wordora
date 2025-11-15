import { useTranslate } from "@/lib/translate";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface LevelHeaderProps {
  href: string;
  title: string;
  backTitle?: string;
}

export default function LevelHeader({
  href,
  title,
  backTitle,
}: LevelHeaderProps) {
  const t = useTranslate();

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <Link
        href={href}
        className="text-xs flex items-center text-slate-600 hover:text-indigo-600 hover:bg-transparent gap-1"
      >
        <span className="w-6 h-6 bg-white flex items-center justify-center rounded-lg">
          <ChevronLeft className="w-4 h-4 min-w-4 text-indigo-600" />
        </span>
        {backTitle || t("LEVEL_HEADER_BACK_TITLE")}
      </Link>

      <h2 className="text-xs font-semibold text-indigo-600">{title}</h2>
    </div>
  );
}
