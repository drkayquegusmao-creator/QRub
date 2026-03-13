"use client"

import ConcursoTaxonomyEditor from '@/components/concursos/admin-taxonomy-editor'
import { motion } from 'framer-motion'
import { Database } from 'lucide-react'

export default function ConcursoDatabaseAdminPage() {
    return (
        <div className="h-[90vh] bg-white flex flex-col">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/20 active:scale-95 transition-transform">
                        <Database size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Matriz de Conhecimento</h1>
                        <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1">Taxonomia Hierárquica Concursos</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-3xl text-center shadow-indigo-500/5">
                        <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Status de Dados</span>
                        <span className="text-xs font-black text-emerald-600 uppercase italic">Conectado / Live</span>
                    </div>
                </div>
            </div>
            
            <div className="flex-1 min-h-0 bg-slate-50">
                <ConcursoTaxonomyEditor />
            </div>
        </div>
    )
}
