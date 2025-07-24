import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: "HandDraw.AI - 专业手绘风格AI生成平台",
  description: 'AI-powered hand-drawn style image generator',
};
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4704669548339622"
     crossorigin="anonymous"></script>
      </head>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-black text-white">
        <main>{children}</main>
        <Footer />
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
