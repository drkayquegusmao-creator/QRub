"use client"

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Database, ShieldCheck, FileText } from 'lucide-react'

const DatabaseContent = dynamic(() => import('./database-content'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
})

const BlueprintsContent = dynamic(() => import('./blueprints-content'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
})

export default function DatabasePage() {
    const [activeTab, setActiveTab] = useState<'questions' | 'blueprints'>('blueprints')

    return (
        <div className="space-y-8">
            <div className="flex gap-4 bg-muted/50 p-1.5 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('blueprints')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'blueprints' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <FileText className="w-4 h-4" />
                    Editais & Caixinhas
                </button>
                <button
                    onClick={() => setActiveTab('questions')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'questions' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Database className="w-4 h-4" />
                    Banco de Questões
                </button>
            </div>

            {activeTab === 'blueprints' && <BlueprintsContent />}
            {activeTab === 'questions' && <DatabaseContent />}
        </div>
    )
}
