import { Link } from "@inertiajs/react";
import { Mail, Phone } from "lucide-react";
import { AiFillInstagram } from "react-icons/ai";
import { BiLogoLinkedin } from "react-icons/bi";
import { FaYoutube, FaGithub } from "react-icons/fa";

export default function Footer() {

    const FooterLinks = [
        { name: "Beranda", href: "/" },
        { name: "Koleksi", href: "/collection" },
        { name: "Tentang", href: "/about" },
        { name: "Bantuan", href: "/help" },
    ];

    const SocialMedia = [
        { name: "Instagram", href: "https://www.instagram.com/rahmadarifinsusilo/", icon: AiFillInstagram },
        { name: "Linkedin", href: "www.linkedin.com/in/rahmad-arifin-55460b37b", icon: BiLogoLinkedin },
        { name: "Github", href: "#https://github.com/Rahmadarf", icon: FaGithub },
    ]

    const Customers = [
        { label: "Pengenalan", href: "#" },
        { label: "Panduan", href: "#" },
        { label: "Pusat Bantuan", href: "#" },
    ]

    const Resources = [
        { label: "Blog", href: "#" },
        { label: "Kebijakan & Privasi", href: "#" },
        { label: "Syarat dan Ketentuan", href: "#" },
    ]

    return (
        <footer className="bg-bukuku-primary w-full font-body">

            {/* Main footer content */}
            <div className="container mx-auto px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

                    {/* Col 1 — Brand */}
                    <div className="flex flex-col gap-y-5 md:col-span-1">
                        <div className="flex flex-col gap-y-1.5">
                            <span className="text-2xl text-white font-heading font-extrabold tracking-tight">
                                BukuKu
                            </span>
                            <span className="text-white/60 text-sm leading-relaxed max-w-[200px]">
                                Platform baca buku digital lokal & internasional.
                            </span>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-y-2.5">
                            <a
                                href="mailto:rahmadarifinsusilo17@gmail.com"
                                className="text-white/70 hover:text-white text-sm flex items-center gap-2.5 transition-colors duration-200 group"
                            >
                                <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200 shrink-0">
                                    <Mail size={14} className="text-white" />
                                </div>
                                <span className="line-clamp-1">rahmadarifinsusilo17@gmail.com</span>
                            </a>
                            <a
                                href="tel:+6281371298264"
                                className="text-white/70 hover:text-white text-sm flex items-center gap-2.5 transition-colors duration-200 group"
                            >
                                <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200 shrink-0">
                                    <Phone size={14} className="text-white" />
                                </div>
                                +62 813 7129 8264
                            </a>
                        </div>
                    </div>

                    {/* Col 2 — Navigasi */}
                    <div className="flex flex-col gap-y-4">
                        <span className="text-white font-semibold text-sm">Navigasi</span>
                        <div className="flex flex-col gap-y-3">
                            {FooterLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 w-fit"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Col 3 — Pelanggan */}
                    <div className="flex flex-col gap-y-4">
                        <span className="text-white font-semibold text-sm">Pelanggan</span>
                        <div className="flex flex-col gap-y-3">
                            {Customers.map((c) => (
                                <Link
                                    key={c.label}
                                    href={c.href}
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 w-fit"
                                >
                                    {c.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Col 4 — Resources */}
                    <div className="flex flex-col gap-y-4">
                        <span className="text-white font-semibold text-sm">Resources</span>
                        <div className="flex flex-col gap-y-3">
                            {Resources.map((r) => (
                                <Link
                                    key={r.label}
                                    href={r.href}
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 w-fit"
                                >
                                    {r.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-y-5">

                    {/* Copyright */}
                    <div className="flex flex-col gap-y-1 text-center md:text-left">
                        <span className="text-white/50 text-xs">
                            &copy; 2026 BukuKu. All rights reserved.
                        </span>
                        <span className="text-white/50 text-xs">
                            Built by{' '}
                            <span className="text-white/80 font-medium">Rahmad Arifin Susilo</span>
                        </span>
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-2">
                        {SocialMedia.map((s) => (
                            <Link
                                key={s.name}
                                href={s.href}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                                title={s.name}
                            >
                                <s.icon size={15} className="text-white/80" />
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    )
}