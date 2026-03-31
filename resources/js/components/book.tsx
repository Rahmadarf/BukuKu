import { useState } from 'react';
import { BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

export type BadgeType = 'Gratis' | 'Premium' | 'Member' | 'Baru'

interface BookCardProps {
    id: Number
    title: string
    author: string
    cover: string
    badge?: BadgeType
    genre?: string
    href?: string
    isWhislisted?: boolean
}

export default function BookCard({
    id,
    title,
    author,
    cover,
    badge,
    genre,
    href = '#',
    isWhislisted = false,
}: BookCardProps) {
    const [wishlisted, setWishlisted] = useState(isWhislisted)

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (wishlisted) {
            // jika sudah ada di wishlist, hapus
            router.delete(`/collection/wishlist/${encodeURIComponent(String(id))}`, {
                preserveScroll: true,
                onSuccess: () => setWishlisted(false)
            })
        } else {
            // jika ga ada di wishlist, tambah
            router.post('/collection/wishlist', {
                book_id: String(id),
                title,
                author,
                cover,
                genre: genre ?? null,
            }, {
                preserveScroll: true,
                onSuccess: () => setWishlisted(true)
            })
        }
    }

    const badgeStyle = {
        Gratis: 'bg-bukuku-light text-bukuku-primary border border-bukuku-border',
        Baru: 'bg-bukuku-primary text-white',
        Premium: 'bg-amber-100 text-amber-700 border border-amber-200',
        Member: 'bg-violet-600 text-white',
    }

    return (
        <div className="group relative bg-white border border-bukuku-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-bukuku-primary/40">

            {/* Cover */}
            <div className="relative w-full aspect-[2/3] overflow-hidden">
                <img
                    src={cover}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to top, rgba(20,15,60,0.88) 0%, rgba(20,15,60,0.2) 40%, transparent 65%)'
                    }}
                />

                {/* Badge */}
                {badge && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeStyle[badge]}`}>
                        {badge}
                    </div>
                )}

                {/* Wishlist button */}
                {/* <button
                    onClick={handleWishlist}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer
                        ${wishlisted
                            ? 'bg-bukuku-primary text-white'
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/40'
                        }
                    `}
                >
                    {wishlisted
                        ? <BookmarkCheck size={14} />
                        : <Bookmark size={14} />
                    }
                </button> */}

                <div className='absolute bottom-0 p-5'>
                    {/* Genre tag */}
                    {genre && (
                        <div className="">
                            <span className="text-white/70 text-xs font-medium bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                {genre}
                            </span>
                        </div>
                    )}

                    {/* Judul & Penulis di atas cover */}
                    <div className="">
                        <p className="text-white font-bold text-sm leading-tight line-clamp-2 mb-0.5">
                            {title}
                        </p>
                        <p className="text-white/60 text-xs line-clamp-1">
                            {author}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="p-3 flex gap-2">
                <Link
                    href={href}
                    className="flex-1 bg-bukuku-primary hover:bg-bukuku-hover text-white text-xs font-medium py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors duration-200"
                >
                    <BookOpen size={13} />
                    Baca
                </Link>
                <button
                    onClick={handleWishlist}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer
                        ${wishlisted
                            ? 'bg-bukuku-primary border-bukuku-primary text-white'
                            : 'border-bukuku-border text-bukuku-primary hover:bg-bukuku-light'
                        }
                    `}
                >
                    {wishlisted
                        ? <BookmarkCheck size={14} />
                        : <Bookmark size={14} />
                    }
                </button>
            </div>

        </div>
    )
}