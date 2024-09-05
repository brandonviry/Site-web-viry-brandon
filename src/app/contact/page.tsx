import ContactForm from "@/layouts/contact";
import { Metadata } from 'next';
import metatags from '@/data/metatags.json';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = metatags.contact;

export default function Contact() {
    return (
        <main className="bg-gray-900 min-h-screen text-gray-100 font-sans">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold mb-4 text-blue-400">Contact</h1>
              <p className="text-xl text-gray-300">N&#39;hésitez pas à me contacter</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-12">
            <ContactForm />
          </div>
        </main>
    );
}