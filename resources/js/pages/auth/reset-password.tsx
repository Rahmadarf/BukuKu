import { Head } from "@inertiajs/react";
import { Key, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode, useState, useEffect } from "react"
import AuthLayout from "@/layouts/auth-layout";
import { useForm } from "@inertiajs/react";

interface props {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: props) {

    const { data, setData, post, errors, processing } = useForm({
        password: '',
        password_confirmation: '',
        email: email,
        token: token,
    })

    const [showPassword, setShowPassword] = useState(false)
    const [confirmError, setConfirmError] = useState('')

    useEffect(() => {
        if (data.password && data.password_confirmation) {
            setConfirmError(data.password !== data.password_confirmation ? 'Password tidak cocok!' : '');
        } else {
            setConfirmError('');
        }
    }, [data.password, data.password_confirmation]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password');
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
            <Head title="Reset Password" />
            <div className="flex flex-col gap-10 font-body w-full max-w-md mx-auto">

                {/* Heading */}
                <div className="flex flex-col gap-y-3">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-12 h-12 bg-bukuku-primary rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-bukuku-primary/20"
                    >
                        <Key className="text-white" size={24} />
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
                            {Array.from("Buat Password Baru.").map((char, index) => (
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
                    <p className="text-white/50 font-medium text-lg italic">Masukkan password baru kamu.</p>
                </div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
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
                                <span className="text-sm uppercase tracking-[0.1em]">Buat Password</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </motion.form>

            </div >
        </>
    )
}

ResetPassword.layout = (page: ReactNode) => (
    <AuthLayout children={page} />
);