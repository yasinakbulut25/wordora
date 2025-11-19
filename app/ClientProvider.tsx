"use client";

import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadUserFromStorage } = useUserStore();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return <>{children}</>;
}
