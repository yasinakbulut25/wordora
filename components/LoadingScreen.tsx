"use client";

import Image from "next/image";
import { Spinner } from "./ui/spinner";
import { useTranslate } from "@/lib/translate";

const LoadingScreen = () => {
  const t = useTranslate();
  return (
    <div className="h-full flex flex-col items-center justify-center text-white py-10">
      <div className="w-[1400px] h-[1400px] absolute left-1/2 transform -translate-x-1/2 -top-[1100px] bg-indigo-600 rounded-br-full rounded-bl-full z-0"></div>
      <div className="flex min-h-[50px]">
        <Image
          src="/cloud.svg"
          alt="Cloud"
          width={220}
          height={220}
          className="absolute -right-12 -top-6 z-10"
        />
        <Image
          src="/cloud.svg"
          alt="Cloud"
          width={220}
          height={220}
          className="absolute -left-8 top-4 z-10"
        />
      </div>
      <div className="flex flex-col gap-2 text-slate-500 items-center">
        <Spinner className="text-indigo-600 size-8" />
        {t("LOADING")}..
      </div>
    </div>
  );
};

export default LoadingScreen;
