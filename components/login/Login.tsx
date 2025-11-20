"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { AtSign, Eye, EyeOff, InfoIcon, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { SignInIcon } from "@phosphor-icons/react";
import { SetScreenProp } from "./LoginPage";
import { useUserStore } from "@/store/useUserStore";
import Alert from "../Alert";
import { checkUsername } from "@/lib/utils";

export default function LoginForm({ setScreen }: SetScreenProp) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useUserStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!checkUsername(username)) {
      setError(
        "Kullanıcı adı yalnızca harf, rakam ve alt çizgi (_) içerebilir. 6-20 karakter arasında olmalıdır."
      );
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Giriş başarısız.");
        setLoading(false);
        return;
      }

      setUser({
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
      });
    } catch (err) {
      console.error(err);
      setError("Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full flex items-center mb-2 gap-2">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Image src="/logo.svg" width={30} height={30} alt="Wordora" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Hoş Geldin 👋</h1>
      </div>

      <div className="mb-4">
        <p className="text-slate-500 text-sm">
          İngilizce öğrenme yolculuğunuza devam etmek için giriş yap.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-3">
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
            placeholder="Kullanıcı adını gir..."
            value={username}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
              setUsername(cleaned);
            }}
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
              placeholder="Şifre gir..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {error && <Alert type="error" message={error} icon={InfoIcon} />}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold"
        >
          {loading ? <Spinner /> : <SignInIcon width={18} />}
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">
          Hesabın yok mu?{" "}
          <Button
            onClick={() => setScreen("register")}
            className="text-indigo-500 hover:text-indigo-500 bg-transparent hover:bg-transparent shadow-none p-0 font-bold"
          >
            Kayıt Ol
          </Button>
        </p>
      </div>
    </section>
  );
}
