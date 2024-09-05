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
      <head>
      <meta name="google-site-verification" content="QZ_eIyMR6Fze3QAJcCQcGwaFzbL3T-z4Cj6Y-B1PozM" />
        </head>
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
