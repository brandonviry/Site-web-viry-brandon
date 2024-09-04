import Navbar from "@/components/navbar";

export default function Header() { return (<header> <Navbar pages={[{ name: "Accueil", href: "/" }, { name: "Portfolio", href: "/portfolio" }, { name: "Blog", href: "/blog" }, { name: "Publications", href: "/publications" }, { name: "Contact", href: "/contact" }]} /> </header>); }