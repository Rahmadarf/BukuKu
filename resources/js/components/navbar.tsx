import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutGrid, User, Clock, Bookmark, ChevronDown, Settings, LogOut, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileKoleksiOpen, setMobileKoleksiOpen] = useState(false);
    const collectionRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const { auth } = usePage().props as any;
    const url = usePage().url;

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Koleksi", href: "/collection", hasDropdown: true },
        { name: "Tentang", href: "/about" },
        { name: "Bantuan", href: "/help" },
    ];

    const koleksiItems = [
        {
            icon: LayoutGrid,
            label: "Semua Kategori",
            desc: "10K+ judul buku",
            href: "/collection",
        },
        {
            icon: Sparkles,
            label: "Baru Ditambahkan",
            desc: "Update hari ini",
            href: "/",
        }
    ];

    const settingItems = [
        { icon: Bookmark, label: "Daftar Bacaan", desc: "Buku tersimpan", href: "/collection/wishlist" },
        { icon: Settings, label: "Pengaturan", desc: "Kelola akun", href: "/profile" },
    ];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (collectionRef.current && !collectionRef.current.contains(e.target as Node)) setDropdownOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) setSettingOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full h-20 bg-white/80 backdrop-blur-md border-b border-bukuku-border/30 z-[100] font-body transition-all duration-300">
            <div className="max-w-7xl mx-auto h-full px-6 md:px-8 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-10 h-10 bg-bukuku-primary rounded-xl flex items-center justify-center shadow-lg shadow-bukuku-primary/20 group-hover:rotate-6 transition-transform">
                        <span className="text-white font-heading font-black text-xl">B</span>
                    </div>
                    <span className="text-bukuku-text font-extrabold font-heading tracking-tight text-2xl group-hover:text-bukuku-primary transition-colors">
                        BukuKu
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-x-10 items-center">
                    {navLinks.map((link) => {
                        const isActive = link.href === url || (link.href !== "/" && url.startsWith(link.href));

                        if (link.hasDropdown) {
                            return (
                                <div key={link.name} className="relative" ref={collectionRef}>
                                    <button
                                        onClick={() => { setDropdownOpen(!dropdownOpen); setSettingOpen(false); }}
                                        className={`flex items-center gap-1.5 text-sm font-bold transition-all ${isActive ? "text-bukuku-primary" : "text-gray-500 hover:text-bukuku-primary"}`}
                                    >
                                        <span className="relative py-1">
                                            {link.name}
                                            {isActive && <motion.span layoutId="nav-pill" className="absolute -bottom-1 left-0 w-full h-0.5 bg-bukuku-primary rounded-full" />}
                                        </span>
                                        <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                className="absolute top-full left-0 mt-4 w-64 bg-white border border-bukuku-border/40 rounded-2xl shadow-2xl shadow-bukuku-primary/5 p-2 overflow-hidden"
                                            >
                                                {koleksiItems.map((item) => (
                                                    <Link onClick={() => setDropdownOpen(false)} key={item.label} href={item.href} className="flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-bukuku-light/50 group transition-all">
                                                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-bukuku-light text-bukuku-primary group-hover:bg-bukuku-primary group-hover:text-white transition-all shadow-sm">
                                                            <item.icon size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-bukuku-text leading-none mb-1">{item.label}</p>
                                                            <p className="text-xs text-gray-400">{item.desc}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <Link key={link.name} href={link.href} className={`text-sm font-bold relative transition-all ${isActive ? "text-bukuku-primary" : "text-gray-500 hover:text-bukuku-primary"}`}>
                                {link.name}
                                {isActive && <motion.span layoutId="nav-pill" className="absolute -bottom-2 left-0 w-full h-0.5 bg-bukuku-primary rounded-full" />}
                            </Link>
                        );
                    })}
                </div>

                {/* Auth & Profile */}
                <div className="hidden md:flex items-center gap-x-6">
                    {auth.user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => { setSettingOpen(!settingOpen); setDropdownOpen(false); }}
                                className="flex items-center gap-x-3 p-1 pr-3 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-bukuku-border/30"
                            >
                                <div className="w-9 h-9 rounded-full bg-bukuku-primary/10 flex items-center justify-center border border-bukuku-primary/20 overflow-hidden">
                                    <User size={18} className="text-bukuku-primary" />
                                </div>
                                <div className="text-left hidden lg:block">
                                    <p className="text-xs text-gray-400 font-medium leading-none mb-1">Halo,</p>
                                    <p className="text-sm font-bold text-bukuku-text leading-none">{auth.user.name.split(' ')[0]}</p>
                                </div>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${settingOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {settingOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-4 w-60 bg-white border border-bukuku-border/40 rounded-2xl shadow-2xl p-2"
                                    >
                                        <div className="px-4 py-3 mb-1 border-b border-gray-50">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Akun Saya</p>
                                        </div>
                                        {settingItems.map((item) => (
                                            <Link onClick={() => setSettingOpen(false)} key={item.label} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bukuku-light/50 group transition-all">
                                                <item.icon size={16} className="text-gray-400 group-hover:text-bukuku-primary" />
                                                <span className="text-sm font-bold text-bukuku-text">{item.label}</span>
                                            </Link>
                                        ))}
                                        <div className="my-2 border-t border-gray-50" />
                                        <button
                                            onClick={() => router.post('/logout')}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-all"
                                        >
                                            <LogOut size={16} />
                                            <span className="text-sm font-bold">Keluar Akun</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-3">
                            <Link href="/login" className="text-sm font-bold text-bukuku-text hover:text-bukuku-primary px-4 py-2 transition-all">
                                Masuk
                            </Link>
                            <Link href="/register" className="bg-bukuku-primary hover:bg-bukuku-hover text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-bukuku-primary/20 transition-all active:scale-95">
                                Daftar Gratis
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl bg-gray-50 text-bukuku-text">
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu (Sederhana & Clean) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-0 w-full bg-white border-b border-bukuku-border/30 shadow-xl px-6 py-8 md:hidden"
                    >
                        {/* Mobile links content here */}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}