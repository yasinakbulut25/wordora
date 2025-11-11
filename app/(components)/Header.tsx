"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h2 className="text-xl font-bold text-brand">Wordora</h2>
        <nav className="flex gap-3">
          <Button>Dark</Button>
          <Button>Türkçe</Button>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {session.user?.name}
              </span>
              <Button variant="ghost" onClick={() => signOut()}>
                Çıkış Yap
              </Button>
            </div>
          ) : (
            <Button onClick={() => (window.location.href = "/auth/login")}>
              Giriş Yap
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
