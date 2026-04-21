import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scratch 学习打卡 | 二年级编程课",
  description: "二年级 Scratch 编程 36 课时学习进度追踪",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐱</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
