import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import ClientProvider from "./ClientProvider";
import Main from "./Main";

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
      <body className="font-sans antialiased md:bg-zinc-50 bg-indigo-50 h-dvh overflow-y-auto md:pt-4 md:pb-20">
        <ClientProvider>
          <Main>{children}</Main>
        </ClientProvider>
      </body>
    </html>
  );
}
