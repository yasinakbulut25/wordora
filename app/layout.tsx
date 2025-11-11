import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import Header from "./(components)/Header";

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
      <body className='font-sans antialiased'>
        <Header />
        {children}
      </body>
    </html>
  );
}
