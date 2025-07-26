// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Footer from '@/components/footer';
import Script from "next/script";

export const metadata: Metadata = {
  title: "HandDraw.AI",
  description: 'AI-powered hand-drawn style image generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-black text-white">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JW3WQ9XKX7"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JW3WQ9XKX7');
          `}
        </Script>
        <main>{children}</main>
        <Footer />
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
