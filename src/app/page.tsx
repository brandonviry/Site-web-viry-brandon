import Image from "next/image";
import Containt1 from "@/layouts/containt1";
import Herobanner from "@/layouts/herobanner";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen text-gray-100 font-sans">
      <Herobanner />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Containt1 />
      </div>
    </main>
  );
}
