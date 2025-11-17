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
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return <>{children}</>;
}
