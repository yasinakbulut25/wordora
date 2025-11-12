import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import Header from "../components/Header";
import ClientProvider from "./ClientProvider";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Wordora",
  description: "AI destekli İngilizce öğrenme platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comfortaa.variable}>
      <body className="font-sans antialiased bg-zinc-50 h-dvh overflow-y-auto py-4">
        <ClientProvider>
          <main className="max-w-md bg-white border border-slate-200 mx-auto h-full rounded-xl pb-4 px-8 overflow-auto">
            <Header />
            {children}
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}
