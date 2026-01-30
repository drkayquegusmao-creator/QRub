"use client"

import { Database } from 'lucide-react'

export default function DatabaseContent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="bg-primary/10 p-6 rounded-full">
                <Database className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Banco de Questões</h1>
            <p className="text-muted-foreground max-w-md">
                O gerenciador de banco de questões está sendo otimizado para a nova arquitetura de dados (Supabase + IndexedDB).
                Voltará em breve com importação XLS aprimorada.
            </p>
        </div>
    )
}
