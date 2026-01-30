"use client"

import { ShieldAlert } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="bg-destructive/10 p-6 rounded-full">
                <ShieldAlert className="w-16 h-16 text-destructive" />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Área Administrativa</h1>
            <p className="text-muted-foreground max-w-md">
                O painel administrativo está temporariamente indisponível nesta versão de produção enquanto finalizamos a migração de segurança do banco de dados.
            </p>
        </div>
    )
}
