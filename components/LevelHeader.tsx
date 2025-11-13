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
  backTitle = "Ana Menü",
}: LevelHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <Link
        href={href}
        className="text-xs flex items-center text-slate-500 hover:text-indigo-600 hover:bg-transparent gap-1"
      >
        <ChevronLeft className="w-4 h-4 text-indigo-600" />
        {backTitle}
      </Link>

      <h2 className="text-xs font-semibold text-indigo-600">{title}</h2>
    </div>
  );
}
