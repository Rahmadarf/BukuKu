import { BookOpen, Trash2, RotateCcw } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { nextTick } from 'process'

export type ReadingStatus = 'unread' | 'reading' | 'finished'

export interface WishlistBook {
    id: string
    title: string
    author: string
    cover: string | null
    genre: string | null
    status: ReadingStatus
    href?: string
    onRemove?: (id: string) => void
    onStatusChange?: (id: string, newStatus: ReadingStatus) => void
}

const statusConfig = {
    unread: {
        label: 'Belum Dibaca',
        labelStyle: 'bg-bukuku-light border border-bukuku-border text-bukuku-primary',
        btnLabel: 'Mulai Baca',
        btnStyle: 'bg-bukuku-primary hover:bg-bukuku-hover text-white',
        nextStatus: 'reading' as ReadingStatus
    },
    reading: {
        label: 'Sedang Dibaca',
        labelStyle: 'bg-amber-50 text-amber-600',
        btnLabel: 'Lanjut Baca',
        btnStyle: 'bg-bukuku-primary hover:bg-bukuku-hover text-white',
        nextStatus: 'finished' as ReadingStatus
    },
    finished: {
        label: '✓ Selesai',
        labelStyle: 'bg-green-50 text-green-700',
        btnLabel: 'Baca Lagi',
        btnStyle: 'border border-green-600 text-green-600 hover:bg-green-50',
        nextStatus: 'reading' as ReadingStatus
    },
}

export default function WishlistCard({
    id,
    title,
    author,
    cover,
    genre,
    status,
    href = '#',
    onRemove,
    onStatusChange,
}: WishlistBook) {
    const config = statusConfig[status]

    const handleClick = () => {
        if (config.nextStatus) {
            onStatusChange?.(id, config.nextStatus)
        }
    }

    return (
        <div className="bg-white border border-bukuku-border rounded-2xl p-4 flex gap-4 items-center hover:border-bukuku-primary/40 transition-all duration-200">

            {/* Cover */}
            <div className="relative w-14 h-20 rounded-xl overflow-hidden shrink-0">
                {cover ? (
                    <img
                        src={cover}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-bukuku-light flex items-center justify-center">
                        <BookOpen size={20} className="text-bukuku-primary" />
                    </div>
                )}

                {/* Checkmark untuk status selesai */}
                {status === 'finished' && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-heading font-bold text-sm text-bukuku-text line-clamp-1">
                        {title}
                    </p>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${config.labelStyle}`}>
                        {config.label}
                    </span>
                </div>
                <p className="text-xs text-gray-400 mb-2 line-clamp-1">{author}</p>

                {/* Genre tag */}
                {genre && (
                    <span className="text-xs bg-bukuku-light text-bukuku-primary px-2.5 py-0.5 rounded-full">
                        {genre}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 items-end shrink-0">
                <button
                    onClick={handleClick}
                    className={`text-xs font-medium px-4 py-2 rounded-xl transition-colors duration-200 whitespace-nowrap ${config.btnStyle}`}
                >
                    {config.btnLabel}
                </button>
                <button
                    onClick={() => onRemove?.(id)}
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                    <Trash2 size={12} />
                    Hapus
                </button>
            </div>

        </div>
    )
}