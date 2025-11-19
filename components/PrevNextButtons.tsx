import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslate } from "@/lib/translate";

interface PrevNextButtonsProps {
  index: number;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function PrevNextButtons({
  index,
  handlePrev,
  handleNext,
}: PrevNextButtonsProps) {
  const t = useTranslate();

  return (
    <div className="action-nav w-full bg-white p-3 rounded-full grid grid-cols-2 gap-3 mt-auto z-20">
      <Button
        onClick={index !== 0 ? handlePrev : () => null}
        disabled={index === 0}
        className="bg-slate-100 w-full text-slate-900 font-bold rounded-full px-2 py-6 hover:bg-slate-50 transition-all active:scale-90 shadow-none"
      >
        <ArrowLeft width={16} className="text-indigo-600" />
        {t("WORDS_PREV_WORD")}
      </Button>

      <Button
        onClick={handleNext}
        className="bg-indigo-600 w-full text-white font-bold rounded-full px-2 py-6 hover:bg-indigo-500 transition-all active:scale-90"
      >
        {t("WORDS_NEXT_WORD")}
        <ArrowRight width={16} className="text-yellow-300" />
      </Button>
    </div>
  );
}
