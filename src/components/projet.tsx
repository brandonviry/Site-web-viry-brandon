import Image from "next/image";
import Link from "next/link";

interface ProjetProps {
    titre: string;
    description: string;
    image: string;
    lien: string;
}

export default function Projet({titre, description, image, lien}:ProjetProps) {

return(
   <Link href={lien} className="m-4 bg-neutral-900 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl">
        <div className="relative">
            <Image src={image} alt={titre} width={1080} height={720} className="object-cover w-full h-48" />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 text-xs text-white rounded group">
                <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">Voir le projet</span>
            </div>
        </div>
        <div className="px-4 py-3">
            <h2 className="text-lg font-semibold text-white mb-1">{titre}</h2>
            <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        </div>
   </Link>
)
}