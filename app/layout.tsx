import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClickBurst from "@/components/ClickBurst";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const brasika = localFont({
  src: "../public/fonts/DFVN Brasika Display.otf",
  variable: "--font-brasika-display",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/MJ Satoshi-Light.otf",   weight: "300", style: "normal" },
    { path: "../public/fonts/MJ Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/MJ Satoshi-Medium.otf",  weight: "500", style: "normal" },
    { path: "../public/fonts/MJ Satoshi-Bold.otf",    weight: "700", style: "normal" },
    { path: "../public/fonts/MJ Satoshi-Black.otf",   weight: "900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Own Haus",
  description: "Portfolio landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("h-full", brasika.variable, satoshi.variable)}>
      <body className="min-h-full flex flex-col bg-bg text-fg antialiased">
        <Navbar />
        {children}
        <Footer />
        <ClickBurst />
      </body>
    </html>
  );
}
