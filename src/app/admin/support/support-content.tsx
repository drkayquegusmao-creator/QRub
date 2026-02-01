"use client"

import { useState } from 'react'
import { Search, Inbox, MessageSquare, Star, Clock, CheckCircle2, MoreVertical, Reply, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// MOCK DATA - Substituir por integração Real-time com Supabase
const MOCK_TICKETS = [
    {
        id: '1',
        user: { name: 'Dr. João Silva', email: 'joao@med.com', avatar: 'JS' },
        subject: 'Dúvida na questão 842 - Asma',
        preview: 'Não entendi por que a alternativa C está incorreta se o paciente...',
        status: 'open',
        priority: 'high',
        date: '10:45',
        messages: [
            { id: 'm1', from: 'user', text: 'Olá, bom dia! Estou com dúvida na questão 842 sobre manejo da asma. Não entendi por que a alternativa C está incorreta se o paciente apresenta sinais de gravidade.', time: '10:45' }
        ]
    },
    {
        id: '2',
        user: { name: 'Dra. Maria Clara', email: 'maria@med.com', avatar: 'MC' },
        subject: 'Problema com pagamento',
        preview: 'Tentei atualizar meu plano para Premium mas o cartão...',
        status: 'pending',
        priority: 'medium',
        date: 'Ontem',
        messages: [
            { id: 'm1', from: 'user', text: 'Tentei atualizar meu plano para Premium mas o cartão foi recusado duas vezes.', time: 'Ontem 14:20' },
            { id: 'm2', from: 'admin', text: 'Olá Dra. Maria! Verificamos aqui e parece ser um bloqueio do emissor. Pode tentar novamente?', time: 'Ontem 14:40' },
            { id: 'm3', from: 'user', text: 'Vou tentar com outro cartão, obrigada.', time: 'Ontem 15:00' }
        ]
    },
    {
        id: '3',
        user: { name: 'Pedro Residente', email: 'pedro@residencia.com', avatar: 'PR' },
        subject: 'Sugestão de funcionalidade',
        preview: 'Seria muito bom ter um modo noturno no simulado...',
        status: 'closed',
        priority: 'low',
        date: '28 Jan',
        messages: []
    }
]

export default function SupportInbox() {
    const [selectedTicket, setSelectedTicket] = useState<any>(null)
    const [replyText, setReplyText] = useState('')

    return (
        <div className="h-[calc(100vh-140px)] bg-card border border-border rounded-[32px] overflow-hidden flex shadow-xl">
            {/* SIDEBAR LIST */}
            <div className="w-[350px] border-r border-border flex flex-col bg-muted/10">

                {/* Search Header */}
                <div className="p-6 border-b border-border space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2">
                            <Inbox className="w-5 h-5 text-primary" />
                            Caixa de Entrada
                        </h2>
                        <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-full">{MOCK_TICKETS.filter(t => t.status === 'open').length} Novos</span>
                    </div>
                    <div className="bg-background border border-border rounded-xl p-3 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Buscar tickets..."
                            className="bg-transparent outline-none text-xs font-medium w-full"
                        />
                    </div>
                </div>

                {/* Ticket List */}
                <div className="flex-1 overflow-y-auto">
                    {MOCK_TICKETS.map((ticket) => (
                        <div
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-all group relative ${selectedTicket?.id === ticket.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    {ticket.status === 'open' && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                                    <span className={`text-xs font-black uppercase ${ticket.status === 'open' ? 'text-foreground' : 'text-muted-foreground'}`}>{ticket.user.name}</span>
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground">{ticket.date}</span>
                            </div>
                            <h4 className={`text-xs font-bold mb-1 truncate ${selectedTicket?.id === ticket.id ? 'text-primary' : 'text-foreground'}`}>{ticket.subject}</h4>
                            <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{ticket.preview}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MESSAGE VIEW */}
            <div className="flex-1 flex flex-col bg-background relative">
                {selectedTicket ? (
                    <>
                        {/* Ticket Header */}
                        <div className="p-6 border-b border-border flex justify-between items-center bg-card/50 backdrop-blur-sm z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-sm border-2 border-background shadow-sm">
                                    {selectedTicket.user.avatar}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-tight">{selectedTicket.subject}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-muted-foreground font-medium">{selectedTicket.user.email}</span>
                                        <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${selectedTicket.status === 'open' ? 'bg-amber-100 text-amber-600' :
                                                selectedTicket.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                            }`}>
                                            {selectedTicket.status === 'open' ? 'Aguardando' : selectedTicket.status === 'pending' ? 'Em Andamento' : 'Resolvido'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground" title="Marcar como Resolvido">
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-muted rounded-xl transition-all text-muted-foreground hover:text-foreground">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-muted/5">
                            {selectedTicket.messages.map((msg: any) => (
                                <div key={msg.id} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-4 max-w-[80%] ${msg.from === 'admin' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black border-2 border-background shadow-sm ${msg.from === 'admin' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                                            {msg.from === 'admin' ? 'EU' : selectedTicket.user.avatar}
                                        </div>
                                        <div className={`space-y-1 ${msg.from === 'admin' ? 'items-end' : 'items-start'} flex flex-col`}>
                                            <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.from === 'admin'
                                                    ? 'bg-primary text-white rounded-tr-none'
                                                    : 'bg-white border border-border rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-1">{msg.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Reply Box */}
                        <div className="p-6 bg-background border-t border-border">
                            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <textarea
                                    className="w-full p-4 bg-transparent outline-none resize-none text-sm min-h-[100px]"
                                    placeholder="Escreva sua resposta para o aluno..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <div className="p-3 bg-muted/30 border-t border-border flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-background rounded-lg"><Star className="w-4 h-4" /></button>
                                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-background rounded-lg"><Clock className="w-4 h-4" /></button>
                                    </div>
                                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
                                        <Send className="w-3 h-3" /> Enviar Resposta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/40 gap-4">
                        <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-10 h-10" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-black uppercase">Nenhum ticket selecionado</h3>
                            <p className="text-sm font-medium">Selecione uma conversa ao lado para responder</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
