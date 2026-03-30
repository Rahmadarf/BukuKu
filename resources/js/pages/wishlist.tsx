import { Head, Link, router } from "@inertiajs/react";
import MainLayout from "@/layouts/main-layout";
import { ReactNode, useState, useEffect } from "react";
import { Search, X, Bookmark, BookOpen, CheckCircle2, Clock, Plus, Filter as FilterIcon } from "lucide-react";
import WishlistCard, { type WishlistBook, type ReadingStatus } from "@/components/wishlist-book";
import { AnimatePresence, motion } from "framer-motion";

export default function Wishlist() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // Debounce Search untuk efisiensi server
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/collection/wishlist', {
                search,
                status: filter === 'all' ? '' : filter,
            }, { preserveState: true, replace: true })
        }, 500)
        return () => clearTimeout(timeout)
    }, [search, filter])

    const filterOptions = [
        { name: "Semua", value: "all" },
        { name: "Belum Dibaca", value: "unread" },
        { name: "Sedang Dibaca", value: "reading" },
        { name: "Selesai", value: "finished" },
    ]

    // Mock data (Pastikan nanti diisi dari props backend)
    const [books, setBooks] = useState<WishlistBook[]>([
        { id: '1', title: 'Bumi', author: 'Tere Liye', cover: '/images/bumi.png', genre: 'Fiksi', status: 'unread', href: '/book/1' },
        { id: '2', title: 'Pulang', author: 'Tere Liye', cover: '/images/pulang.jpeg', genre: 'Fiksi', status: 'finished', href: '/book/2' },
    ])

    const handleStatusChange = (id: string, newStatus: ReadingStatus) => {
        setBooks(prev => prev.map(book => book.id === id ? { ...book, status: newStatus } : book));
    }

    const stats = {
        unread: books.filter(b => b.status === 'unread').length,
        reading: books.filter(b => b.status === 'reading').length,
        finished: books.filter(b => b.status === 'finished').length,
    }

    const filteredBooks = books
        .filter(b => filter === 'all' || b.status === filter)
        .filter(b => search === '' || b.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <Head title="Wishlist Saya" />
            <section className="bg-bukuku-bg min-h-screen py-32 font-body">
                <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-y-10">

                    {/* ── Header Section ── */}
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
                        <div className="flex flex-col gap-y-4 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className='bg-white border border-bukuku-border/40 rounded-full w-fit flex items-center gap-x-2 px-4 py-1.5'
                            >
                                <Bookmark size={14} className="text-bukuku-primary fill-current" />
                                <span className='text-xs font-bold text-bukuku-primary uppercase tracking-wider'>Koleksi Pribadi</span>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <h1 className='text-bukuku-dark font-heading font-black text-4xl md:text-5xl tracking-tight'>
                                    Perpustakaan <span className="text-bukuku-primary">Kamu.</span>
                                </h1>
                                <p className='text-gray-500 font-medium text-lg mt-2 max-w-lg'>
                                    Kelola progres membaca dan simpan buku favoritmu dalam satu tempat yang rapi.
                                </p>
                            </motion.div>
                        </div>

                        {/* Stat Cards - Improved Visuals */}
                        <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                            {[
                                { label: 'Belum Baca', count: stats.unread, icon: BookOpen, color: 'bg-bukuku-primary' },
                                { label: 'Sedang Baca', count: stats.reading, icon: Clock, color: 'bg-amber-500' },
                                { label: 'Selesai', count: stats.finished, icon: CheckCircle2, color: 'bg-emerald-500' }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="bg-white border border-bukuku-border/40 p-4 rounded-3xl min-w-[140px] flex-1 lg:flex-none shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className={`${item.color} w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 shadow-lg shadow-current/10`}>
                                        <item.icon size={20} />
                                    </div>
                                    <p className="text-2xl font-black text-bukuku-dark leading-none">{item.count}</p>
                                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Toolbar: Search & Filter ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white border border-bukuku-border/40 p-3 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm"
                    >
                        {/* Search Bar - Modern Style */}
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-bukuku-primary transition-colors" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari di perpustakaanmu..."
                                className="w-full bg-bukuku-bg border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-bukuku-primary/20 transition-all outline-none"
                            />
                        </div>

                        {/* Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
                            <div className="hidden md:block h-8 w-px bg-gray-100 mx-2" />
                            {filterOptions.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setFilter(f.value)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap active:scale-95
                                        ${filter === f.value
                                            ? 'bg-bukuku-primary text-white shadow-lg shadow-bukuku-primary/20'
                                            : 'text-gray-500 hover:bg-bukuku-light hover:text-bukuku-primary'
                                        }
                                    `}
                                >
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Content Grid ── */}
                    <AnimatePresence mode="wait">
                        {filteredBooks.length > 0 ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredBooks.map((book, idx) => (
                                    <motion.div
                                        key={book.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <WishlistCard {...book} onStatusChange={handleStatusChange} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            /* Empty State - More Descriptive */
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="w-24 h-24 bg-bukuku-light rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                                    <BookOpen size={40} className="text-bukuku-primary/40" />
                                </div>
                                <h3 className="text-2xl font-black text-bukuku-dark tracking-tight">Belum ada buku nih.</h3>
                                <p className="text-gray-400 font-medium mt-2 mb-8 max-w-xs">
                                    Mungkin ini saatnya mencari petualangan baru di koleksi kami.
                                </p>
                                <Link
                                    href="/collection"
                                    className="group flex items-center gap-2 bg-bukuku-primary text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-bukuku-primary/20 hover:bg-bukuku-hover transition-all active:scale-95"
                                >
                                    <Plus size={18} />
                                    Jelajahi Koleksi
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </>
    )
}

Wishlist.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;