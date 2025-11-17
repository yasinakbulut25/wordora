import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white py-10 overflow-hidden">
      <div className="w-[1400px] h-[1400px] absolute left-1/2 transform -translate-x-1/2 -top-[1050px] bg-indigo-600 rounded-br-full rounded-bl-full z-0"></div>
      <Image
        src="/cloud.svg"
        alt="Mascot"
        width={220}
        height={220}
        className="absolute -right-12 top-5 z-10"
      />
      <Image
        src="/cloud.svg"
        alt="Mascot"
        width={220}
        height={220}
        className="absolute -left-8 top-16 z-10"
      />

      <Image
        src="/mascot.svg"
        alt="Mascot"
        width={220}
        height={220}
        className="mt-24 mb-8 z-20"
      />

      <div className="text-left">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          <span className="text-indigo-600">Wordora</span>
          <br />
          İngilizce öğrenmenin
          <br />
          en doğal yolu!
        </h2>

        <p className="text-slate-500 mb-6">
          Kelimeleri keşfet, cümleleri çevir, quizlerle gelişimini ölç ve kendi
          listelerini oluştur.
        </p>
      </div>

      <Button
        // onClick={handleNext}
        className="bg-indigo-600 w-full text-white font-bold rounded-full px-2 py-5 h-auto hover:bg-indigo-500 transition-all active:scale-90"
      >
        Hemen Başla
        <ArrowRight width={16} className="text-yellow-300" />
      </Button>
    </div>
  );
};

export default LoginPage;
