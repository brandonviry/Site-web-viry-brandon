import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import IconLink from "@/components/iconlink";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col items-center bg-neutral-800 text-white py-6">
            <div className="flex justify-center items-center space-x-6 py-6">
                <IconLink href="https://github.com/brandonviry" icon={<FaGithub className="hover:text-gray-400 transition-colors duration-200" />} />
                <IconLink href="https://www.linkedin.com/in/brandon-viry-81187b237/" icon={<FaLinkedin className="hover:text-gray-400 transition-colors duration-200" />} />
                <IconLink href="https://www.youtube.com/@chikara9742" icon={<FaYoutube className="hover:text-gray-400 transition-colors duration-200" />} />
                <IconLink href="https://www.instagram.com/virybrandon/" icon={<FaInstagram className="hover:text-gray-400 transition-colors duration-200" />} />
            </div>
            <p className="text-center">© 2024 V Brandon</p>
        </footer>
    );
}
