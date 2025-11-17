import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { SetScreenProp } from "./LoginPage";
import Image from "next/image";

export default function Welcome({ setScreen }: SetScreenProp) {
  return (
    <>
      <div className="text-left">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Image src="/logo.svg" width={30} height={30} alt="Wordora" />
            </div>
            <span className="text-3xl font-bold text-indigo-600">Wordora</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            İngilizce öğrenmenin
            <br />
            en doğal yolu!
          </h2>
        </div>

        <p className="text-slate-500 mb-6">
          Kelimeleri keşfet, cümleleri çevir, quizlerle gelişimini ölç ve kendi
          listelerini oluştur.
        </p>
      </div>

      <Button
        onClick={() => setScreen("login")}
        className="bg-indigo-600 w-full text-white font-bold rounded-full px-2 py-5 h-auto hover:bg-indigo-500 transition-all active:scale-90"
      >
        Hemen Başla
        <ArrowRight width={16} className="text-yellow-300" />
      </Button>
    </>
  );
}
