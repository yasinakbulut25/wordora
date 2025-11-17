"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { AtSign, Eye, EyeOff, LockKeyhole, MailIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { SignInIcon } from "@phosphor-icons/react";
import { SetScreenProp } from "./LoginPage";

export default function RegisterForm({ setScreen }: SetScreenProp) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("demo@wordora.com");
  const [username, setUsername] = useState("wordora");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email,
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });

    setLoading(false);
  };

  return (
    <section className="w-full">
      <div className="w-full flex items-center mb-2 gap-2">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Image src="/logo.svg" width={30} height={30} alt="Wordora" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900"> Öğrenmeye Başla!</h1>
      </div>

      <div className="mb-4">
        <p className="text-slate-500 text-sm">
          İngilizce öğrenme yolculuğunu başlatmak için aramıza katıl.
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-3">
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="flex items-center gap-1 text-sm font-medium text-slate-900"
          >
            <MailIcon width={14} className="text-indigo-600" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email adresini gir..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
            required
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="username"
            className="flex items-center gap-1 text-sm font-medium text-slate-900"
          >
            <AtSign width={14} className="text-indigo-600" />
            Kullanıcı Adı
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Kullanıcı adını belirle..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
            required
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="password"
            className="flex items-center gap-1 text-sm font-medium text-slate-900"
          >
            <LockKeyhole width={14} className="text-indigo-600" />
            Şifre
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Şifreni belirle..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
              required
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Şifreni onayla..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold transition-all"
        >
          {loading ? <Spinner /> : <SignInIcon width={18} height={18} />}
          {loading ? "Öğrenmeye başlanıyor.." : "Kayıt Ol"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">
          Hesabın var mı?{" "}
          <Button
            onClick={() => setScreen("login")}
            className="text-indigo-500 hover:text-indigo-500 bg-transparent hover:bg-transparent shadow-none p-0 font-bold"
          >
            Giriş Yap
          </Button>
        </p>
      </div>
    </section>
  );
}
