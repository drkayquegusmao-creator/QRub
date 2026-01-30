"use client"

import { DollarSign } from 'lucide-react'

export default function FinanceContent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="bg-primary/10 p-6 rounded-full">
                <DollarSign className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Financeiro</h1>
            <p className="text-muted-foreground max-w-md">
                O módulo financeiro está passando por uma atualização de segurança para a nova integração com Supabase.
                Vendas e configurações estarão disponíveis em breve.
            </p>
        </div>
    )
}
