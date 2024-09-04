import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import metatags from '@/data/metatags.json';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = metatags.default;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
