import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HandDraw.AI - 专业手绘风格AI生成平台",
  description: "专精手绘风格的AI生成平台。支持线稿、水彩、宫崎骏风格等7种手绘风格，专业商用许可证。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="w-full border-t border-gray-800 bg-black/80 py-8 mt-16">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-gray-400 text-sm gap-2">
            <div>© {new Date().getFullYear()} HandDraw.AI. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="/privacy-policy" className="hover:text-cyan-400 underline transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-cyan-400 underline transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}