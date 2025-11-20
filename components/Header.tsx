"use client";

import { Button } from "@/components/ui/button";
import { langs } from "@/lib/utils";
import { useLangStore } from "@/store/useLangStore";
import Image from "next/image";

export default function Header() {
  const { lang, setLang } = useLangStore();

  return (
    <header className="header-safe-padding-top sticky w-full top-0 mb-6 pb-4 px-8 flex items-center justify-between z-50 border-b border-indigo-200 bg-indigo-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Image src="/logo.svg" width={30} height={30} alt="Wordora" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Wordora</h2>
      </div>

      <nav className="flex gap-3">
        <Button
          onClick={() => setLang(lang === langs.TR ? "EN" : "TR")}
          className="flex items-center gap-1 p-2 bg-white text-xs hover:bg-white text-black transition-all active:scale-90 rounded-lg shadow-none"
        >
          {lang === langs.TR ? (
            <>
              <Image
                src={"/eng.svg"}
                width={20}
                height={20}
                alt="English"
                className="max-w-5"
              />
              English
            </>
          ) : (
            <>
              <Image
                src={"/turkey.svg"}
                width={20}
                height={20}
                alt="Türkçe"
                className="max-w-5"
              />
              Türkçe
            </>
          )}
        </Button>
      </nav>
    </header>
  );
}
