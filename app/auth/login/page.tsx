"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-brand">Wordora</h1>
      <p className="text-gray-600">
        Hesabına giriş yap veya yeni hesap oluştur
      </p>

      <div className="flex flex-col gap-4 w-64">
        <Button
          onClick={() => signIn("google")}
          className="w-full bg-blue-400 text-white"
        >
          Google ile Giriş Yap
        </Button>

        <Button
          onClick={() =>
            signIn("credentials", {
              email: "demo@wordora.com",
              password: "123456",
            })
          }
          className="w-full bg-gray-800 text-white"
        >
          Demo Hesapla Giriş Yap
        </Button>
      </div>
    </div>
  );
}
