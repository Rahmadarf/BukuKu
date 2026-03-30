import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import AuthLayout from '@/layouts/auth-layout'
import { Quote } from 'lucide-react'

const books = [
    { id: 1, cover: '/images/bumi.png', title: 'Bumi', author: 'Tere Liye', delay: 0 },
    { id: 2, cover: '/images/pulang.jpeg', title: 'Pulang', author: 'Tere Liye', delay: 0.2 },
    { id: 3, cover: '/images/love.jpg', title: 'Love, Elliot', author: 'Amanda Clevenger', delay: 0.4 },
    { id: 4, cover: '/images/bumi.png', title: 'Laskar Pelangi', author: 'Andrea Hirata', delay: 0.6 },
    { id: 5, cover: '/images/bumi.png', title: 'Matahari', author: 'Tere Liye', delay: 0.1 },
    { id: 6, cover: '/images/pulang.jpeg', title: 'Pergi', author: 'Tere Liye', delay: 0.3 },
    { id: 7, cover: '/images/love.jpg', title: 'After', author: 'Anna Todd', delay: 0.5 },
    { id: 8, cover: '/images/bumi.png', title: 'Sang Pemimpi', author: 'Andrea Hirata', delay: 0.7 },
]

const testimonial = {
    text: 'BukuKu membuat aku semakin cinta membaca dengan koleksi yang sangat lengkap dan akses yang super cepat.',
    name: 'Sarah Agnesia',
    role: 'Top Contributor',
};

export default function AuthIllustration() {
    return (
        <div className="hidden lg:flex bg-bukuku-primary min-h-screen flex-col justify-between p-16 relative overflow-hidden">

            {/* ── Background Elements ── */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-black/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Dekorasi Garis Halus */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* ── Main Content Area ── */}
            <div className="flex flex-col gap-16 w-full items-center relative z-10">

                {/* Floating Book Grid */}
                <div className="w-full max-w-4xl">
                    <div className="grid grid-cols-4 gap-6 xl:gap-8">
                        {books.map((book, index) => {
                            const isOffset = index % 4 === 1 || index % 4 === 3;
                            return (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: isOffset ? 40 : 0 }}
                                    transition={{ duration: 0.8, delay: book.delay }}
                                >
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: book.delay
                                        }}
                                        className="relative group cursor-pointer"
                                    >
                                        <div className="relative aspect-[2/3] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-white/30">
                                            <img
                                                src={book.cover}
                                                alt={book.title}
                                                className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            {/* Gradient Overlay yang lebih dramatis */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-white font-bold text-xs uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Read Now
                                                </p>
                                                <p className="text-white font-heading font-bold text-sm leading-tight line-clamp-1">
                                                    {book.title}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Testimonial Glass Card ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute -top-4 -right-4 text-white/5 group-hover:text-white/10 transition-colors">
                        <Quote size={120} />
                    </div>

                    <p className="text-white/90 text-sm lg:text-md leading-relaxed font-medium italic relative z-10 mb-6">
                        "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center font-black text-white shadow-inner">
                                {testimonial.name[0]}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-bukuku-primary rounded-full" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm tracking-tight">{testimonial.name}</p>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{testimonial.role}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Refined Bottom Stats ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-3 w-full max-w-4xl mx-auto border-t border-white/10 pt-10"
            >
                {[
                    { label: "Koleksi Buku", val: "100K+" },
                    { label: "Genre Tersedia", val: "500+" },
                    { label: "Pembaca Aktif", val: "50K+" }
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-1 border-r last:border-none border-white/5">
                        <p className="text-white font-heading font-black text-3xl xl:text-4xl tracking-tighter">
                            {stat.val}
                        </p>
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.25em]">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

AuthIllustration.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>