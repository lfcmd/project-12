import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import Footer from '@/components/footer';
import Script from "next/script";


export const metadata: Metadata = {
  title: "HandDraw.AI - 专业手绘风格AI生成平台",
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
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JW3WQ9XKX7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JW3WQ9XKX7');
</script>
        <main>{children}</main>
        <Footer />
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
