import AuthLayout from "@/layouts/auth-layout"
import { Head, useForm, Link } from "@inertiajs/react"
import { ReactNode, useState } from "react"
import { Eye, EyeOff, Mail, Lock, Check, ArrowRight } from "lucide-react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { FcGoogle } from "react-icons/fc" // Pastikan install react-icons

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
        remember: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/login')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
        }
    }

    return (
        <>
            <Head title="Masuk" />
            <div className="flex flex-col gap-10 font-body w-full max-w-md mx-auto">

                {/* ── Heading Section ── */}
                <div className="flex flex-col gap-y-3">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-12 h-12 bg-bukuku-primary rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-bukuku-primary/20"
                    >
                        <Lock className="text-white" size={24} />
                    </motion.div>

                    <h1 className="text-4xl font-black font-heading tracking-tight text-white leading-none">
                        <motion.span
                            initial="hidden"
                            animate="visible"
                            className="text-white"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } },
                            }}
                        >
                            {Array.from("Selamat Datang.").map((char, index) => (
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
                    <p className="text-white/50 font-medium text-lg italic">"Buku adalah jendela dunia, mari buka kembali."</p>
                </div>

                {/* ── Form Section ── */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-y-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Social Login Option - Membuatnya terlihat pro */}
                    <motion.button
                        type="button"
                        variants={itemVariants}
                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 group"
                    >
                        <FcGoogle size={20} />
                        <span className="text-sm">Masuk dengan Google</span>
                    </motion.button>

                    <motion.div variants={itemVariants} className="flex items-center gap-4 my-2">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Atau Email</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </motion.div>

                    {/* Email Input */}
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

                    {/* Password Input */}
                    <motion.div className="flex flex-col gap-y-2.5" variants={itemVariants}>
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest">Kata Sandi</label>
                            <Link href="/forgot-password" size={14} className="text-bukuku-primary text-[11px] font-black uppercase tracking-tighter hover:text-white transition-colors">
                                Lupa?
                            </Link>
                        </div>
                        <div className="group relative">
                            <div className={`absolute inset-0 bg-bukuku-primary/20 blur-xl transition-opacity duration-500 ${data.password ? 'opacity-40' : 'opacity-0'} group-focus-within:opacity-60`} />
                            <div className="relative bg-[#121212]/50 border border-white/10 group-focus-within:border-bukuku-primary/50 group-focus-within:bg-bukuku-primary/5 rounded-2xl py-4 px-5 flex items-center gap-4 backdrop-blur-xl transition-all duration-300">
                                <Lock size={18} className="text-white/20 group-focus-within:text-bukuku-primary transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-white/20 hover:text-white transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <AnimatePresence>
                            {errors.password && (
                                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-xs font-bold mt-1 ml-1 tracking-wide">
                                    {errors.password}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Remember Me & Submit */}
                    <div className="flex flex-col gap-y-6 mt-2">
                        <motion.label variants={itemVariants} className="flex items-center gap-3 cursor-pointer group w-fit">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${data.remember ? 'bg-bukuku-primary border-bukuku-primary' : 'border-white/10 bg-white/5 group-hover:border-white/20'}`}>
                                    {data.remember && <Check size={12} className="text-white stroke-[4px]" />}
                                </div>
                            </div>
                            <span className="text-white/40 text-xs group-hover:text-white/70 transition-colors font-black uppercase tracking-widest">Ingat Sesi Saya</span>
                        </motion.label>

                        <motion.button
                            type="submit"
                            disabled={processing}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-bukuku-primary hover:bg-bukuku-hover text-white font-black py-4 rounded-2xl shadow-2xl shadow-bukuku-primary/30 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="text-sm uppercase tracking-[0.1em]">Masuk Sekarang</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </div>

                    <motion.div variants={itemVariants} className="text-center mt-4">
                        <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                            Belum punya akun?{" "}
                            <Link href="/register" className="text-bukuku-primary hover:text-white transition-colors ml-1">
                                Daftar Gratis
                            </Link>
                        </p>
                    </motion.div>
                </motion.form>
            </div>
        </>
    )
}

Login.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>