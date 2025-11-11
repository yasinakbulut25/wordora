"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { AtSign, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { SignInIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("demo@wordora.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/", // başarılı giriş sonrası yönlendirme
    });

    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto p-6">
      <div className="w-full flex items-center justify-center flex-col mb-8">
        <Image src="/logo.svg" width={120} height={120} alt="Wordora" />
        <h1 className="text-2xl font-bold text-slate-900">Wordora</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-slate-400 text-sm">
          Log in to continue your English learning journey
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="flex items-center gap-1 ext-sm font-medium text-slate-900"
          >
            <AtSign width={14} className="text-indigo-600" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl shadow-none focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-1"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="flex items-center gap-1 ext-sm font-medium text-slate-900"
          >
            <LockKeyhole width={14} className="text-indigo-600" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
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
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-medium transition-all"
        >
          {loading ? <Spinner /> : <SignInIcon width={18} height={18} />}
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-xs text-slate-500">
            or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => signIn("google")}
        variant="outline"
        className="w-full h-12 border-2 border-slate-200 hover:bg-slate-200/40 rounded-full flex items-center justify-center gap-3 transition-all shadow-none"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-slate-700 font-medium">Google</span>
      </Button>

      <div className="mt-8 text-center">
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className="text-xs text-slate-500 hover:text-indigo-500 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Do not have an account?{" "}
          <Link
            href="/auth/register"
            className="text-indigo-500 hover:text-indigo-500 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
