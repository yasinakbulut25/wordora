"use client";

import React, { useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import LoginPage from "@/components/login/LoginPage";
import { cn } from "@/lib/utils";
import { useListStore } from "@/store/useListStore";
import { useProgressStore } from "@/store/useProgressStore";
import AddToHomeScreen from "@/components/AddToHomeScreen";
import { useLevelsStore } from "@/store/useLevelsStore";
import { useAuthInit } from "@/hooks/useAuthInit";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserStore } from "@/store/useUserStore";

export default function Main({ children }: { children: React.ReactNode }) {
  useAuthInit();

  const { user, loading } = useUserStore();

  const { loadLists } = useListStore();
  const { loadLearned } = useProgressStore();
  const { setLevelsData } = useLevelsStore();

  useEffect(() => {
    if (!loading && user) {
      loadLists(user.id);
      loadLearned(user.id);
      setLevelsData();
    }
  }, [loading, user, loadLists, loadLearned, setLevelsData]);

  if (loading) {
    return (
      <main className="relative max-w-md mx-auto overflow-x-hidden h-full bg-indigo-50 main-login-safe-padding-bottom">
        <LoadingScreen />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="relative max-w-md mx-auto overflow-x-hidden h-full bg-indigo-50 main-login-safe-padding-bottom">
        <div className="px-8">
          <LoginPage />
        </div>
      </main>
    );
  }

  return (
    <main
      className={cn(
        "relative max-w-md mx-auto overflow-y-auto h-full md:rounded-xl bg-indigo-50 md:border border-indigo-100 main-safe-padding-bottom"
      )}
    >
      <Header />

      <div className="px-8">
        {children}
        <BottomNavigation />
      </div>

      <AddToHomeScreen />
    </main>
  );
}
