"use client";

import React, { useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import LoginPage from "@/components/login/LoginPage";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { useListStore } from "@/store/useListStore";
import { useProgressStore } from "@/store/useProgressStore";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useUserStore();
  const { loadLists } = useListStore();
  const { loadLearned } = useProgressStore();

  useEffect(() => {
    if (user) {
      loadLists(user.id);
      loadLearned(user.id);
    }
  }, [loadLists, loadLearned, user]);

  return (
    <main
      className={cn(
        "relative max-w-md mx-auto overflow-y-auto h-full md:rounded-xl px-8 bg-indigo-50 md:border border-none md:border-indigo-100",
        !user || !isAuthenticated ? "pb-4 overflow-x-hidden" : "pb-6"
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
