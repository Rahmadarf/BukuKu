import AuthLayout from "@/layouts/auth-layout"
import { Head, useForm, Link } from "@inertiajs/react"
import { ReactNode, useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, Check, User, ArrowRight, Sparkles } from "lucide-react"
import { motion, Variants, AnimatePresence } from "framer-motion"

export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [confirmError, setConfirmError] = useState("")

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false
    })

    useEffect(() => {
        if (data.password && data.password_confirmation) {
            setConfirmError(data.password !== data.password_confirmation ? 'Password tidak cocok!' : '');
        } else {
            setConfirmError('');
        }
    }, [data.password, data.password_confirmation]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!confirmError) post('/register')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
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
            <Head title="Daftar Akun Baru" />
            <div className="flex flex-col gap-10 font-body w-full max-w-md mx-auto">

                {/* ── Heading Section ── */}
                <div className="flex flex-col gap-y-3">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-12 h-12 bg-bukuku-primary rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-bukuku-primary/20"
                    >
                        <Sparkles className="text-white" size={24} />
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
                            {Array.from("Buat Akun.").map((char, index) => (
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
                        </motion.span>                    </h1>
                    <p className="text-white/50 font-medium text-lg italic">"Mulai perjalanan literasimu hari ini."</p>
                </div>

                {/* ── Form Section ── */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Name Input */}
                    <motion.div className="flex flex-col gap-y-2" variants={itemVariants}>
                        <label className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Nama Lengkap</label>
                        <div className="group relative">
                            <div className={`absolute inset-0 bg-bukuku-primary/20 blur-xl transition-opacity duration-500 ${data.name ? 'opacity-40' : 'opacity-0'} group-focus-within:opacity-60`} />
                            <div className="relative bg-[#121212]/50 border border-white/10 group-focus-within:border-bukuku-primary/50 group-focus-within:bg-bukuku-primary/5 rounded-2xl py-3.5 px-5 flex items-center gap-4 backdrop-blur-xl transition-all duration-300">
                                <User size={18} className="text-white/20 group-focus-within:text-bukuku-primary transition-colors" />
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Siapa nama Anda?"
                                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>
                        {errors.name && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1">{errors.name}</p>}
                    </motion.div>

                    {/* Email Input */}
                    <motion.div className="flex flex-col gap-y-2" variants={itemVariants}>
                        <label className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Alamat Email</label>
                        <div className="group relative">
                            <div className={`absolute inset-0 bg-bukuku-primary/20 blur-xl transition-opacity duration-500 ${data.email ? 'opacity-40' : 'opacity-0'} group-focus-within:opacity-60`} />
                            <div className="relative bg-[#121212]/50 border border-white/10 group-focus-within:border-bukuku-primary/50 group-focus-within:bg-bukuku-primary/5 rounded-2xl py-3.5 px-5 flex items-center gap-4 backdrop-blur-xl transition-all duration-300">
                                <Mail size={18} className="text-white/20 group-focus-within:text-bukuku-primary transition-colors" />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@email.com"
                                    className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>
                        {errors.email && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1">{errors.email}</p>}
                    </motion.div>

                    {/* Passwords Wrapper (Side by Side on Desktop if needed, but stacked is safer for Auth) */}
                    <div className="grid grid-cols-1 gap-4">
                        {/* Password */}
                        <motion.div className="flex flex-col gap-y-2" variants={itemVariants}>
                            <label className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Kata Sandi</label>
                            <div className="group relative">
                                <div className={`absolute inset-0 bg-white/5 blur-xl transition-opacity duration-500 ${data.password ? 'opacity-20' : 'opacity-0'} group-focus-within:opacity-40`} />
                                <div className="relative bg-[#121212]/50 border border-white/10 group-focus-within:border-bukuku-primary/50 group-focus-within:bg-bukuku-primary/5 rounded-2xl py-3.5 px-5 flex items-center gap-4 backdrop-blur-xl transition-all duration-300">
                                    <Lock size={18} className="text-white/20 group-focus-within:text-bukuku-primary transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm font-medium"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/20 hover:text-white transition-colors">
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            {errors.password && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1">{errors.password}</p>}
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div className="flex flex-col gap-y-2" variants={itemVariants}>
                            <label className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-1">Konfirmasi Sandi</label>
                            <div className="group relative">
                                <div className={`absolute inset-0 bg-white/5 blur-xl transition-opacity duration-500 ${data.password_confirmation ? 'opacity-20' : 'opacity-0'} group-focus-within:opacity-40`} />
                                <div className="relative bg-[#121212]/50 border border-white/10 group-focus-within:border-bukuku-primary/50 group-focus-within:bg-bukuku-primary/5 rounded-2xl py-3.5 px-5 flex items-center gap-4 backdrop-blur-xl transition-all duration-300">
                                    <Lock size={18} className="text-white/20 group-focus-within:text-bukuku-primary transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 text-sm font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <AnimatePresence>
                                {confirmError && (
                                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] font-bold mt-1 ml-1">
                                        {confirmError}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Remember Me */}
                    <motion.label variants={itemVariants} className="flex items-center gap-3 cursor-pointer group w-fit mt-2">
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

                    {/* Submit Button */}
                    <motion.div className="flex flex-col gap-y-6 mt-4" variants={itemVariants}>
                        <motion.button
                            type="submit"
                            disabled={processing || !!confirmError}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-bukuku-primary hover:bg-bukuku-hover text-white font-black py-4 rounded-2xl shadow-2xl shadow-bukuku-primary/30 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="text-sm uppercase tracking-[0.1em]">Daftar Akun</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>

                        <p className="text-white/30 text-xs text-center font-bold uppercase tracking-widest">
                            Sudah punya akun?{" "}
                            <Link href="/login" className="text-bukuku-primary hover:text-white transition-colors ml-1">
                                Masuk Disini
                            </Link>
                        </p>
                    </motion.div>
                </motion.form>
            </div>
        </>
    )
}

Register.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>