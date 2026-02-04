"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Hammer, Sparkles, Zap, ShieldAlert, Settings, Wrench } from 'lucide-react'
import Image from 'next/image'
import { useSystem } from '@/store/use-system'
import { useAuth } from '@/store/use-auth'
import { usePathname } from 'next/navigation'


export function MaintenanceOverlay() {
    // FORCE DISABLE OVERLAY
    return null

    // Original logic below (disabled)
    /* 
    const isMaintenanceMode = useSystem(state => state.isMaintenanceMode)
    const maintenanceMessage = useSystem(state => state.maintenanceMessage)
    // ... rest of logic
    */

    if (!isMaintenanceMode) return null
    if (pathname === '/maintenance' && !isAdmin) return null

    if (isAdmin) {
        return (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-400/50 backdrop-blur-md"
                >
                    <div className="p-2 bg-white/20 rounded-xl animate-pulse">
                        <Wrench className="w-4 h-4" />
                    </div>
                    <span className="font-black uppercase text-[10px] tracking-widest">Aviso de Manutenção ATIVO para usuários</span>
                </motion.div>
            </div>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] bg-background/80 backdrop-blur-xl flex items-center justify-center p-6 overflow-hidden"
            >
                {/* Background Decor - Matching Landing Page Orbs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] grayscale" />
                </div>

                <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
                    {/* Animated Icon Machine */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 md:w-48 md:h-48 border-4 border-dashed border-primary/20 rounded-full flex items-center justify-center"
                            >
                                <div className="w-24 h-24 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center border border-primary/10 overflow-hidden shadow-2xl relative">
                                    <Image src="/qrub_premium_logo_3d.jpg" alt="QRub" fill className="object-cover scale-110" />
                                </div>
                            </motion.div>

                            {/* Floating Bits */}
                            <motion.div
                                animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-4 -right-4 bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-500/20"
                            >
                                <Wrench className="w-4 h-4 text-white" />
                            </motion.div>
                            <motion.div
                                animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20"
                            >
                                <Settings className="w-4 h-4 text-white" />
                            </motion.div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.3em] backdrop-blur-xl">
                                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                Sistema em Ajuste
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-foreground">
                                Melhorando o <br />
                                <span className="royal-gradient-text italic">QRUB</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed"
                        >
                            {maintenanceMessage}
                        </motion.p>
                    </div>

                    {/* Progress Bar Simulation */}
                    <div className="max-w-md mx-auto space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary/60">
                            <span>Status da Calibração</span>
                            <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                85% Concluído
                            </motion.span>
                        </div>
                        <div className="h-3 bg-primary/5 rounded-full border border-primary/10 overflow-hidden relative">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 royal-gradient rounded-full"
                            />
                            <motion.div
                                animate={{ x: ["0%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-20"
                            />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col items-center gap-4 pt-8"
                    >
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                            <ShieldAlert className="w-3 h-3" />
                            Acesso restrito para segurança dos dados
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
