"use client";

import React from "react";
import { useSession } from "next-auth/react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import LoginPage from "@/components/LoginPage";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  return (
    <main className="relative max-w-md mx-auto h-full rounded-xl pb-4 px-8 overflow-auto bg-indigo-50 border border-indigo-100 overflow-hidden">
      {!session ? (
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
