"use client"

import ConcursoAdminPackagesManager from '@/components/concursos/admin-packages-manager'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'

export default function PacotesAdminPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex items-center gap-6"
                >
                    <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/20">
                        <Package size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Gerenciador de Pacotes</h1>
                        <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Concursos</p>
                    </div>
                </motion.div>
                
                <ConcursoAdminPackagesManager />
            </div>
        </div>
    )
}
