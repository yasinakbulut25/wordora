"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  // if (!session) return;

  return (
    <header className="sticky w-full top-0 mb-6 pb-4 pt-5 flex items-center justify-between z-50 border-b border-indigo-200">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Image src="/logo.svg" width={30} height={30} alt="Wordora" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Wordora</h2>
      </div>

      <nav className="flex gap-3">
        <Button>Dark</Button>
        <Button>Türk</Button>
        {session && (
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => signOut()}>
              Çıkış
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
