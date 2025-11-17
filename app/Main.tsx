"use client";

import React from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import LoginPage from "@/components/login/LoginPage";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useUserStore();

  return (
    <main
      className={cn(
        "relative max-w-md mx-auto min-h-full md:rounded-xl px-8 bg-indigo-50 md:border border-none md:border-indigo-100",
        !user || !isAuthenticated ? "pb-4 overflow-x-hidden" : "pb-24"
      )}
    >
      {!user || !isAuthenticated ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          {children}
          <BottomNavigation />
        </>
      )}
    </main>
  );
}
