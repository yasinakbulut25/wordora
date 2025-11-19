"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "@/components/ui/button";
import { AtSign, LogOut } from "lucide-react";
import { useTranslate } from "@/lib/translate";
import Image from "next/image";

export default function ProfilePage() {
  const t = useTranslate();

  const { user, logout } = useUserStore();
  const { loadLearned } = useProgressStore();

  useEffect(() => {
    if (user) loadLearned(user.id);
  }, [loadLearned, user]);

  if (!user)
    return (
      <div className="py-20 text-center text-slate-500">
        {t("LOGIN_REQUIRED")}
      </div>
    );

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center text-white py-10">
        <div className="w-[1400px] h-[1400px] absolute left-1/2 transform -translate-x-1/2 -top-[1050px] bg-indigo-600 rounded-br-full rounded-bl-full z-0"></div>
        <div className="flex min-h-[260px]">
          <Image
            src="/cloud.svg"
            alt="Cloud"
            width={220}
            height={220}
            className="absolute -right-12 top-10 z-10"
          />
          <Image
            src="/cloud.svg"
            alt="Cloud"
            width={220}
            height={220}
            className="absolute -left-8 top-16 z-10"
          />

          <Image
            src="/mascot.svg"
            alt="Mascot"
            width={200}
            height={200}
            className="absolute left-1/2 transform -translate-x-1/2 top-52 z-20"
          />
        </div>
        <div className="px-4 pt-10 max-w-md mx-auto flex flex-col items-center gap-6">
          <div className="text-center items-center flex flex-col gap-3">
            <h1 className="flex items-center gap-1 text-xl font-bold text-slate-900 w-max">
              <AtSign className="text-indigo-600" /> {user.username}
            </h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          <Button
            onClick={() => logout()}
            className="bg-red-500 text-white rounded-full px-6 py-3 flex items-center gap-2 hover:bg-red-400 mt-4"
          >
            <LogOut size={18} /> {t("LOGOUT")}
          </Button>
        </div>
      </div>
    </>
  );
}
