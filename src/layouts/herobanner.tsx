import Image from "next/image";

export default function Herobanner() {
    
    return (
        <section className="flex flex-col items-center justify-center min-h-screen min-w-screen relative overflow-hidden px-4 py-8">
            <div className="absolute inset-0 bg-[url('/assets/img/gaming-pattern.png')] opacity-10 animate-pulse"></div>
            <div className="z-10 flex flex-col items-center">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-md animate-pulse"></div>
                    <Image
                        src="/assets/img/1707990818907.jpeg"
                        alt="VIRY Brandon - Développeur Web Full Stack spécialisé en React, Next.js et TypeScript"
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-blue-500 shadow-lg shadow-blue-500/50 transform hover:scale-110 transition-transform duration-300 ease-in-out relative z-10"
                    />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest mb-4 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        VIRY Brandon - Développeur Web Full Stack
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-blue-300 mb-4">Développeur web passionné spécialisé en React, Next.js et TypeScript</p>
                <p className="text-md text-gray-400 animate-bounce">Faites défiler pour découvrir mon portfolio et mes projets</p>
            </div>
        </section>
    );
}
