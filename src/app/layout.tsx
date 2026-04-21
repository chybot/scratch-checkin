import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scratch 学习打卡",
  description: "二年级 Scratch 编程 36 课时学习进度追踪",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
