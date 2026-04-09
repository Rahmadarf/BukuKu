import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/main-layout';
import { ReactNode } from 'react';
import { Search, Zap, ChevronRight, Crown, Star, ArrowRight, BookOpen, Users, Layers } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, FreeMode } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

export default function Welcome() {
    const { scrollTo } = usePage<any>().props;
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');

    useEffect(() => {
        if (scrollTo) {
            const el = document.getElementById(scrollTo);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }, [scrollTo]);

    const Books = [
        { id: 1, title: "Bumi", author: "Tere Liye", cover: "/images/bumi.png", badge: "Gratis" },
        { id: 2, title: "Pulang", author: "Tere Liye", cover: "/images/pulang.jpeg", badge: "Baru" },
        { id: 3, title: "Love, Elliot", author: "Amanda", cover: "/images/love.jpg", badge: "Member" }
    ];

    const categories = ['Semua', 'Fiksi', 'Non-fiksi', 'Sains', 'Sejarah', 'Komik'];

    const stats = [
        { label: 'Judul Buku', value: '100K+', icon: BookOpen },
        { label: 'Kategori', value: '500+', icon: Layers },
        { label: 'Pembaca Aktif', value: '50K+', icon: Users },
    ];

    const handleSubmit = () => {
        if (search.length > 0) {
            router.get('/collection?genre=&page=1&search=' + search);
        } else {
            return
        }
    }

    const testimonials = [

        "Website yang sangat bagus!",

        "Koleksi bukunya lengkap banget.",

        "UI nya enak dipandang mata.",

        "Recomended buat yang hobi baca.",

        "Aksesnya cepet banget gak pake lemot."

    ];

    const DuplicatedTestimonials = Array.from({ length: 15 }, (_, i) => testimonials[i % testimonials.length]);
    return (
        <>
            <Head title="BukuKu - Baca Kapan Saja" />

            {/* ── SECTION 1: HERO ── */}
            <section className="relative min-h-screen flex items-center justify-center pt-30 md:pt-20 pb-12 overflow-hidden font-body bg-bukuku-bg"
                style={{
                    backgroundColor: '#FAFAF8',
                    // Kita pertahankan dot pattern kesukaanmu, tapi dengan opasitas yang lebih soft
                    backgroundImage: 'radial-gradient(circle, #534AB7 0.8px, transparent 0.8px)',
                    backgroundSize: '32px 32px',
                }}>

                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(250,250,248,0) 0%, rgba(250,250,248,0.8) 60%, rgba(250,250,248,1) 100%)'
                    }}
                />

                {/* Background Pattern - More Subtle */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,...")' }} />

                {/* Radial Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bukuku-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-bukuku-hover/10 blur-[120px] rounded-full" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className='flex flex-col items-center text-center gap-y-8'>

                        {/* Animated Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-bukuku-border/40 shadow-sm'
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bukuku-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-bukuku-primary"></span>
                            </span>
                            <span className='text-xs font-bold text-bukuku-primary uppercase tracking-widest'>Update: 1,240 Buku Baru Minggu Ini</span>
                        </motion.div>

                        {/* Main Heading - Stronger Typography */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-heading font-black text-5xl md:text-7xl text-bukuku-dark leading-[1.1] tracking-tight max-w-4xl"
                        >
                            Baca apa saja, <span className="text-bukuku-primary">kapan saja</span>, untuk siapa saja.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500 font-medium text-lg md:text-xl max-w-2xl leading-relaxed"
                        >
                            Akses ribuan koleksi buku digital terbaik dari penulis lokal hingga internasional secara instan dan mudah.
                        </motion.p>

                        {/* Search Bar - More Prominent */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="w-full max-w-2xl p-2 bg-white rounded-[2rem] border border-bukuku-border/50 shadow-2xl shadow-bukuku-primary/5 flex items-center gap-2 group focus-within:ring-4 focus-within:ring-bukuku-primary/5 transition-all"
                        >
                            <div className="pl-4 text-gray-400">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari judul buku, penulis, atau genre..."
                                className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-bukuku-dark font-medium placeholder:text-gray-300"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button onClick={handleSubmit} className="bg-bukuku-primary hover:bg-bukuku-hover text-white font-bold md:px-8 px-3 md:py-3.5 py-2 rounded-[1.5rem] transition-all active:scale-95 shadow-lg shadow-bukuku-primary/20">
                                Temukan
                            </button>
                        </motion.div>

                        {/* Stats - Grid Style */}
                        <div className="grid grid-cols-3 gap-8 md:gap-20 mt-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-3xl md:text-4xl font-black text-bukuku-dark leading-none">{stat.value}</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase mt-2 tracking-widest">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="w-full mt-8 overflow-hidden relative">
                            {/* Fade effect di sisi kiri & kanan slider agar menyatu dengan background */}
                            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-[#FAFAF8] to-transparent" />
                            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-[#FAFAF8] to-transparent" />

                            <Swiper
                                modules={[Autoplay, FreeMode]}
                                loop={true}
                                slidesPerView={"auto"}
                                spaceBetween={16}
                                speed={8000}
                                autoplay={{ delay: 0, disableOnInteraction: false }}
                                freeMode={true}
                                className="py-4"
                            >
                                {DuplicatedTestimonials.map((text, index) => (
                                    <SwiperSlide key={index} style={{ width: 'auto' }}>
                                        <div className="bg-white/60 backdrop-blur-sm border border-bukuku-border/40 px-6 py-3 rounded-2xl flex items-center gap-x-3 shadow-sm hover:shadow-md transition-all">
                                            <div className="w-8 h-8 bg-bukuku-light rounded-full flex items-center justify-center">
                                                <Star size={14} className="text-bukuku-primary fill-bukuku-primary" />
                                            </div>
                                            <span className="text-bukuku-dark text-sm font-bold italic tracking-tight">
                                                "{text}"
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                    </div>
                </div>
            </section>

            {/* ── SECTION 2: CURATED COLLECTION ── */}
            <section id="new-collection" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-bukuku-primary font-bold text-sm uppercase tracking-widest">
                                <Zap size={18} fill="currentColor" />
                                <span>Koleksi Terpopuler</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-bukuku-dark tracking-tight">
                                Jelajahi <span className="text-bukuku-primary">Dunia Baru.</span>
                            </h2>
                        </div>

                        {/* Filter - Pill Style */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setActiveCategory(c)}
                                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                                        ${activeCategory === c
                                            ? 'bg-bukuku-primary text-white shadow-lg shadow-bukuku-primary/20'
                                            : 'bg-gray-50 text-gray-500 hover:bg-bukuku-light'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Book Cards Grid - More Spacing & Interaction */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => {
                            const book = Books[i % Books.length];
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500">
                                        <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-bukuku-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                            <span className="text-white font-bold text-sm leading-tight">{book.title}</span>
                                            <span className="text-white/70 text-xs">{book.author}</span>
                                        </div>
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                                            <span className="text-[10px] font-black text-bukuku-primary uppercase">{book.badge}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* View All CTA */}
                    <div className="mt-16 flex justify-center">
                        <Link href="/collection" className="group flex items-center gap-3 bg-bukuku-dark text-white px-10 py-4 rounded-2xl font-bold hover:bg-bukuku-primary transition-all shadow-xl hover:shadow-bukuku-primary/30">
                            Lihat Semua Koleksi
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: PREMIUM BANNER (RE-DESIGNED) ── */}
            <section className="py-12 px-6 md:px-8">
                <div className="max-w-7xl mx-auto bg-bukuku-primary rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-bukuku-primary/20">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 bg-amber-400 text-bukuku-dark px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest">
                                <Crown size={14} fill="currentColor" />
                                Membership
                            </div>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight">
                                Baca Tanpa Batas <br /> dengan Premium.
                            </h2>
                            <p className="text-white/70 text-lg font-medium max-w-xl">
                                Dapatkan akses ke buku-buku eksklusif, fitur baca offline, dan tanpa iklan selamanya.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] w-full lg:w-96 text-center">
                            <div className="mb-6">
                                <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Mulai Dari</span>
                                <div className="text-4xl font-black text-amber-400 mt-1">Rp 49.000<span className="text-lg text-white/50">/bln</span></div>
                            </div>
                            <Link href="/register" className="block w-full bg-amber-400 hover:bg-amber-300 text-bukuku-dark py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95">
                                Upgrade Sekarang
                            </Link>
                            <p className="text-white/40 text-[10px] mt-4 font-bold uppercase tracking-widest italic">Batalkan kapan saja • Aman 100%</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Welcome.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;