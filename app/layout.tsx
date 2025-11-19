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
  manifest: "/manifest.json",
  themeColor: "#4f46e5",
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={comfortaa.variable}>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

      <body className="font-sans antialiased sm:bg-zinc-50 bg-indigo-50 h-dvh overflow-y-auto md:pt-4 md:pb-4">
        <ClientProvider>
          <Main>{children}</Main>
        </ClientProvider>
      </body>
    </html>
  );
}
