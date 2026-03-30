import { Head, useForm, Link } from "@inertiajs/react";
import { ReactNode, useState } from "react";
import AuthLayout from "@/layouts/auth-layout";
import { LockOpen, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";



export default function ForgotPassword() {

    const { data, setData, post, errors, processing } = useForm({
        email: '',
    })

    const [sent, setSent] = useState(false)

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/forgot-password', {
            onSuccess: () => {
                setSent(true)
            }
        })
    }

    if (sent) {
        return (
            <>
                <Head title="Lupa Password" />
                <div className="flex flex-col gap-10 font-body w-full max-w-md mx-auto">
                    <div className="flex flex-col gap-y-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-12 h-12 bg-bukuku-primary rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-bukuku-primary/20"
                        >
                            <Mail className="text-white" size={24} />
                        </motion.div>
                        <h1 className="text-4xl font-black font-heading tracking-tight text-white leading-0">
                            <motion.span
                                initial="hidden"
                                animate="visible"
                                className="text-white"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } },
                                }}
                            >
                                {Array.from("Email Terkirim").map((char, index) => (
                                    <motion.span
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, display: "none" },
                                            visible: { opacity: 1, display: "inline" },
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-[3px] h-[0.9em] bg-bukuku-primary ml-1 align-middle"
                                />
                            </motion.span>
                        </h1>
                        <p className="text-white/50 font-medium text-lg italic">Kami telah mengirimkan email ke alamat yang terdaftar.</p>

                        <motion.div variants={itemVariants} className="text-center mt-4">
                            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                                Tidak menerima email?{" "}
                                <Link href="/forgot-password" className="text-bukuku-primary hover:text-white transition-colors ml-1">
                                    Kirim Ulang
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Head title="Lupa Password" />
            <div className="flex flex-col gap-10 font-body w-full max-w-md mx-auto">

                {/* Heading Section */}
                <div className="flex flex-col gap-y-3">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-12 h-12 bg-bukuku-primary rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-bukuku-primary/20"
                    >
                        <LockOpen className="text-white" size={24} />
                    </motion.div>

                    <h1 className="text-4xl font-black font-heading tracking-tight text-white leading-0">
                        <motion.span
                            initial="hidden"
                            animate="visible"
                            className="text-white"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } },
                            }}
                        >
                            {Array.from("Lupa Password?").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, display: "none" },
                                        visible: { opacity: 1, display: "inline" },
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-[3px] h-[0.9em] bg-bukuku-primary ml-1 align-middle"
                            />
                        </motion.span>
                    </h1>
                    <p className="text-white/50 font-medium text-lg italic">Jangan khawatir, kami akan bantu kamu.</p>
                </div>

                {/* Form Section */}
                <motion.form>
                    <motion.div className="flex flex-col gap-y-2.5" variants={itemVariants}>
                        <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Alamat Email</label>
                        <div className="group relative">
                            <div className={`absolute inset-0 bg-bukuku-primary/20 blur-xl transition-opacity duration-500 ${data.email ? 'opacity-40' : 'opacity-0'} group-focus-within:opacity-60`} />
                            <div className="relative bg-[#121212]/50 border border-white/10 group-focus-within:border-bukuku-primary/50 group-focus-within:bg-bukuku-primary/5 rounded-2xl py-4 px-5 flex items-center gap-4 backdrop-blur-xl transition-all duration-300">
                                <Mail size={18} className="text-white/20 group-focus-within:text-bukuku-primary transition-colors" />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Masukkan email anda"
                                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>
                        <AnimatePresence>
                            {errors.email && (
                                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-xs font-bold mt-1 ml-1 tracking-wide">
                                    {errors.email}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.form>

                <motion.button
                    type="submit"
                    disabled={processing}
                    onClick={handleSubmit}
                    className="w-full bg-bukuku-primary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 group"
                >
                    <span className="text-sm">Kirim Permintaan</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.div variants={itemVariants} className="text-center mt-4">
                    <Link href="/login" className="text-bukuku-primary hover:text-white transition-colors ml-1 flex items-center justify-center gap-2">
                        <ArrowLeft size={18} className="group-hover:translate-x-1 transition-transform" />
                        Kembali ke halaman login
                    </Link>
                </motion.div>
            </div>
        </>
    )
}


ForgotPassword.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>