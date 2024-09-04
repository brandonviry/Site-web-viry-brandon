import Galerie from "@/layouts/galerie";
import { Metadata } from 'next';
import metatags from '@/data/metatags.json';

export const metadata: Metadata = metatags.portfolio;

export default function Portfolio() {
    return (
        <main className="bg-gray-900 min-h-screen text-gray-100 font-sans">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold mb-4 text-blue-400">Portfolio</h1>
              <p className="text-xl text-gray-300">Découvrez mes réalisations</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-12">
            <Galerie />
          </div>
        </main>
    );
}