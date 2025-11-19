"use client";

import React, { useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import LoginPage from "@/components/login/LoginPage";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { useListStore } from "@/store/useListStore";
import { useProgressStore } from "@/store/useProgressStore";
import AddToHomeScreen from "@/components/AddToHomeScreen";
import { useLevelsStore } from "@/store/useLevelsStore";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useUserStore();
  const { loadLists } = useListStore();
  const { loadLearned } = useProgressStore();
  const { setLevelsData } = useLevelsStore();
  const { loadUserFromStorage } = useUserStore();

  useEffect(() => {
    const loadAll = async () => {
      if (!user) {
        loadUserFromStorage();
        return;
      }

      try {
        await Promise.all([
          loadLists(user.id),
          loadLearned(user.id),
          setLevelsData(),
        ]);
      } catch (err) {
        console.error("err =>", err);
      }
    };

    loadAll();
  }, [user, loadUserFromStorage, loadLists, loadLearned, setLevelsData]);

  return (
    <main
      className={cn(
        "relative max-w-md mx-auto overflow-y-auto h-full md:rounded-xl bg-indigo-50 md:border border-none md:border-indigo-100",
        !user || !isAuthenticated ? "pb-4 overflow-x-hidden" : "pb-24"
      )}
    >
      {!user || !isAuthenticated ? (
        <div className="px-8">
          <LoginPage />
        </div>
      ) : (
        <>
          <Header />
          <div className="px-8">
            {children}
            <BottomNavigation />
          </div>
          <AddToHomeScreen />
        </>
      )}
    </main>
  );
}
