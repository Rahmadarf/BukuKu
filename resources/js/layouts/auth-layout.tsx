import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AuthIllustration from "@/pages/auth/authIllustration"

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] bg-bukuku-dark overflow-hidden">

            {/* ── PANEL KIRI: ILUSTRASI ── */}
            {/* Tips: Kita biarkan children (AuthIllustration) yang merender dirinya sendiri 
                lewat Inertia agar tidak terjadi double-rendering.
            */}
            <div className="hidden lg:block relative overflow-hidden">
                {/* Jika kamu ingin AuthIllustration selalu ada di kiri, 
                   kita bisa panggil komponennya di sini secara permanen.
                */}
                <div className="sticky top-0 h-screen">
                    {/* Impor komponen AuthIllustration murni di sini */}
                    <AuthIllustration />
                </div>
            </div>

            {/* ── PANEL KANAN: FORM (THE CONTENT) ── */}
            <div className="relative flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-12 bg-bukuku-dark shadow-[-50px_0_100px_rgba(0,0,0,0.5)] z-20">

                {/* Dekorasi Cahaya Halus di sisi Form agar tidak terlalu flat */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-bukuku-primary/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-bukuku-primary/5 blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md relative z-10"
                >
                    {children}
                </motion.div>
            </div>

        </div>
    )
}