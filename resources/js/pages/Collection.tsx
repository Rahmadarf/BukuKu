import { Head, usePage, router } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { ReactNode, useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, X, Filter, BookOpen } from 'lucide-react';
import { IoGrid } from "react-icons/io5";
import { LuAlignJustify } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion"
import BookCard, { BadgeType } from '@/components/book';
import { type PageProps } from '@/types'

interface Book {

    id: string

    title: string

    author: string

    cover: string | null

    genre: string | null

    badge: BadgeType

}



interface Pagination {

    current_page: number

    last_page: number

    total: number

    per_page: number

}



interface Props extends PageProps {

    books: Book[]

    pagination: Pagination

    filters: {

        search?: string

        genre?: string

    }

    wishlistedIds: string[];

}



const categories = [

    { name: 'Semua', value: 'all' },

    { name: 'Fiksi', value: 'fiction' },

    { name: 'Non-fiksi', value: 'non-fiction' },

    { name: 'Anak-anak', value: 'children' },

    { name: 'Sains', value: 'science' },

    { name: 'Sejarah', value: 'history' },

]

export default function Collection() {
    const { books, pagination, filters, wishlistedIds = [] } = usePage<Props>().props;
    const [search, setSearch] = useState(filters.search ?? '')
    const [activeGenre, setActiveGenre] = useState(filters.genre ?? 'all')
    const [activeDisplay, setActiveDisplay] = useState('Grid');

    // Debounce search agar tidak spam request ke Laravel
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search !== (filters.search ?? '')) {
                router.get('/collection', {
                    search,
                    genre: activeGenre === 'all' ? '' : activeGenre,
                    page: 1,
                }, { preserveState: true, replace: true })
            }
        }, 500)
        return () => clearTimeout(timeout)
    }, [search])

    const handleGenre = (genre: string) => {
        setActiveGenre(genre)
        router.get('/collection', {
            search,
            genre: genre === 'all' ? '' : genre,
            page: 1,
        }, { preserveState: true })
    }

    const handlePage = (page: number | string) => {
        if (typeof page === 'string') return;
        router.get('/collection', {
            search,
            genre: activeGenre === 'all' ? '' : activeGenre,
            page,
        }, { preserveState: true, preserveScroll: false })
    }

    const getPages = () => {

        const pages: (number | '...')[] = []

        const { current_page, last_page } = pagination



        if (last_page <= 5) {

            for (let i = 1; i <= last_page; i++) pages.push(i)

        } else {

            pages.push(1)

            if (current_page > 3) pages.push('...')

            for (let i = Math.max(2, current_page - 1); i <= Math.min(last_page - 1, current_page + 1); i++) {

                pages.push(i)

            }

            if (current_page < last_page - 2) pages.push('...')

            pages.push(last_page)

        }



        return pages

    }

    return (
        <>
            <Head title="Koleksi Lengkap - BukuKu" />

            {/* Background tetap menggunakan dot pattern agar konsisten dengan Landing Page */}
            <section className='relative py-32 min-h-screen bg-bukuku-bg font-body'
                style={{
                    backgroundImage: 'radial-gradient(circle, #534AB7 0.5px, transparent 0.5px)',
                    backgroundSize: '30px 30px',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-bukuku-bg/50 via-transparent to-bukuku-bg pointer-events-none" />

                <div className='container mx-auto flex flex-col gap-y-10 z-10 px-6 md:px-8 relative'>

                    {/* ── Header Section ── */}
                    <div className='flex flex-col md:flex-row justify-between items-end gap-6'>
                        <div className='flex flex-col gap-y-4'>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className='bg-bukuku-light/50 border border-bukuku-primary/10 rounded-full w-fit flex items-center gap-x-2.5 px-4 py-1.5 shadow-sm'
                            >
                                <BookOpen size={14} className="text-bukuku-primary" />
                                <span className='text-[10px] font-black text-bukuku-primary uppercase tracking-widest'>Explorasi Koleksi</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h1 className='text-bukuku-dark font-heading font-black text-4xl md:text-5xl tracking-tight'>
                                    Temukan <span className="text-bukuku-primary">Inspirasi.</span>
                                </h1>
                                <p className='text-gray-500 font-medium text-lg mt-2 max-w-xl leading-relaxed'>
                                    Ribuan buku pilihan dari berbagai genre siap menemani harimu.
                                </p>
                            </motion.div>
                        </div>

                        {/* Display Toggle - Glassmorphism style */}
                        <div className='bg-white border border-bukuku-border/40 rounded-2xl p-1.5 flex items-center gap-1 shadow-sm backdrop-blur-sm'>
                            {[
                                { name: "Grid", icon: IoGrid },
                                { name: "List", icon: LuAlignJustify },
                            ].map((d) => (
                                <button
                                    key={d.name}
                                    onClick={() => setActiveDisplay(d.name)}
                                    className={`relative px-4 py-2 flex items-center justify-center transition-all rounded-xl
                                        ${activeDisplay === d.name ? 'bg-bukuku-primary text-white shadow-lg shadow-bukuku-primary/20' : 'text-gray-400 hover:text-bukuku-primary'}
                                    `}
                                >
                                    <d.icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Toolbar: Search & Genre ── */}
                    <div className="flex flex-col gap-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border border-bukuku-border/40 p-3 rounded-[2rem] flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm"
                        >
                            {/* Modern Search bar */}
                            <div className="relative w-full lg:flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-bukuku-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari judul, penulis, atau ISBN..."
                                    className="w-full bg-bukuku-bg border-none rounded-2xl py-3.5 pl-12 pr-10 text-sm font-medium focus:ring-2 focus:ring-bukuku-primary/10 transition-all outline-none"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Genre Pills - Mobile Scrollable */}
                            <div className='flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto px-2'>
                                <div className="hidden lg:block h-8 w-px bg-gray-100 mx-2" />
                                <div className="flex items-center gap-2">
                                    <Filter size={16} className="text-gray-400 mr-2 hidden lg:block" />
                                    {categories.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => handleGenre(c.value)}
                                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap active:scale-95
                                                ${activeGenre === c.value
                                                    ? 'bg-bukuku-primary text-white shadow-md'
                                                    : 'bg-bukuku-bg text-gray-500 hover:bg-bukuku-light hover:text-bukuku-primary'
                                                }
                                            `}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex items-center justify-between px-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Hasil Pencarian</span>
                            <span>{pagination.total.toLocaleString()} Buku</span>
                        </div>
                    </div>

                    {/* ── Book Display Area ── */}
                    <AnimatePresence mode="wait">
                        {books.length > 0 ? (
                            <motion.div
                                key={`${activeDisplay}-${activeGenre}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={
                                    activeDisplay === 'Grid'
                                        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10"
                                        : "flex flex-col gap-4"
                                }
                            >
                                {books.map((book, idx) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                    >
                                        <BookCard
                                            id={book.id as unknown as number}

                                            title={book.title}

                                            author={book.author}

                                            cover={book.cover ?? '/images/placeholder.png'}

                                            badge={book.badge}

                                            genre={book.genre ?? undefined}

                                            isWhislisted={wishlistedIds.includes(book.id)}

                                            href={`/book/${book.id}`}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            /* Empty State - Reused from previous concept but adapted */
                            <motion.div className="flex flex-col items-center justify-center py-32 text-center">
                                <div className="w-20 h-20 bg-bukuku-light rounded-3xl flex items-center justify-center mb-6">
                                    <Search size={32} className="text-bukuku-primary/40" />
                                </div>
                                <h3 className="text-2xl font-black text-bukuku-dark">Ups! Buku tidak ditemukan.</h3>
                                <p className="text-gray-400 mt-2 max-w-xs">Coba cari dengan kata kunci lain atau ubah kategori filter.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Pagination: Premium Look ── */}
                    {pagination.last_page > 1 && (
                        <div className="flex items-center justify-center gap-3 mt-12">
                            <button
                                onClick={() => handlePage(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                                className="p-3 rounded-2xl bg-white border border-bukuku-border/40 text-bukuku-primary shadow-sm hover:bg-bukuku-primary hover:text-white disabled:opacity-30 transition-all active:scale-90"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-[1.5rem] border border-bukuku-border/30 backdrop-blur-sm">
                                {getPages().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePage(page)}
                                        className={`min-w-[44px] h-[44px] rounded-xl text-sm font-black transition-all
                                            ${pagination.current_page === page
                                                ? 'bg-bukuku-primary text-white shadow-md shadow-bukuku-primary/20'
                                                : 'text-gray-400 hover:text-bukuku-primary hover:bg-white'
                                            }
                                            ${page === '...' ? 'cursor-default' : 'active:scale-90'}
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePage(pagination.current_page + 1)}
                                disabled={pagination.current_page === pagination.last_page}
                                className="p-3 rounded-2xl bg-white border border-bukuku-border/40 text-bukuku-primary shadow-sm hover:bg-bukuku-primary hover:text-white disabled:opacity-30 transition-all active:scale-90"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

Collection.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;