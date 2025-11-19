"use client";

import { useEffect } from "react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }
  }, []);

  return <>{children}</>;
}
