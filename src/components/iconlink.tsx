import Link from "next/link";

interface IconLinkProps {
    href: string;
    icon: React.ReactNode;
}

export default function IconLink({ href, icon }: IconLinkProps) {
    return (
        <Link 
            href={href}  
            className="m-2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg hover:shadow-xl"
        >
            <span className="text-white text-xl">{icon}</span>
        </Link>
    );
}