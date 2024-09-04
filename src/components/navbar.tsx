import Link from "next/link";

interface NavbarProps {
    pages: Array<{ name: string; href: string }>;
}

export default function Navbar({ pages }: NavbarProps) {
    return (
        <nav className="flex justify-center items-center w-full h-16 bg-neutral-800 text-white shadow-md">
            <ul className="flex justify-center items-center w-full max-w-6xl gap-4 px-4">
                {pages.map((page, index) => (
                    <li key={index} className="flex items-center h-full">
                        <Link 
                            href={page.href}
                            className="px-4 py-2 m-1 hover:bg-white hover:text-black rounded transition-colors duration-200 ease-in-out"
                        >
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
