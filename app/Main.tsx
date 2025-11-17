"use client";

import React from "react";
import { useSession } from "next-auth/react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import LoginPage from "@/components/login/LoginPage";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  return (
    <main className="relative max-w-md mx-auto min-h-full md:rounded-xl pb-4 px-8 overflow-y-auto overflow-x-hidden bg-indigo-50 md:border border-none md:border-indigo-100">
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
