"use client"

import { useState, useEffect } from 'react'
import { Search, Inbox, MessageSquare, Star, Clock, CheckCircle2, MoreVertical, Reply, Send, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSupport, SupportTicket } from '@/store/use-support'

export default function SupportInbox() {
    const { tickets, messages, fetchTickets, fetchMessages, sendMessage, updateTicketStatus, subscribeToTickets, subscribeToMessages, loading } = useSupport()
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
    const [replyText, setReplyText] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')

    useEffect(() => {
        const load = async () => {
            setConnectionStatus('checking')
            try {
                await fetchTickets()
                setConnectionStatus('connected')
            } catch (err) {
                console.error('Connection error:', err)
                setConnectionStatus('error')
            }
        }
        load()
        const unsubscribe = subscribeToTickets()
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (selectedTicket) {
            fetchMessages(selectedTicket.id)
            const unsubscribe = subscribeToMessages(selectedTicket.id)
            return () => unsubscribe()
        }
    }, [selectedTicket?.id])

    const filteredTickets = tickets.filter(t =>
        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSendReply = async () => {
        if (!replyText.trim() || !selectedTicket) return
        await sendMessage(selectedTicket.id, replyText, true)
        setReplyText('')
    }

    const currentMessages = selectedTicket ? (messages[selectedTicket.id] || []) : []

    return (
        <div className="h-[calc(100vh-140px)] bg-card border border-border rounded-[32px] overflow-hidden flex shadow-xl">
            {/* SIDEBAR LIST */}
            <div className="w-[350px] border-r border-border flex flex-col bg-muted/10">

                {/* Search Header */}
                <div className="p-6 border-b border-border space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2">
                                <Inbox className="w-5 h-5 text-primary" />
                                Suporte
                            </h2>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500' : connectionStatus === 'checking' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'}`} />
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">
                                    {connectionStatus === 'connected' ? 'Sincronizado' : connectionStatus === 'checking' ? 'Conectando...' : 'Erro de Conexão'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchTickets()}
                                className="p-2 hover:bg-muted rounded-lg transition-all text-muted-foreground"
                                title="Atualizar dados"
                            >
                                <Clock className="w-4 h-4" />
                            </button>
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-full">
                                {tickets.filter(t => t.status === 'open').length} Novos
                            </span>
                        </div>
                    </div>
                    <div className="bg-background border border-border rounded-xl p-3 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Buscar tickets..."
                            className="bg-transparent outline-none text-xs font-medium w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Ticket List */}
                <div className="flex-1 overflow-y-auto">
                    {loading && tickets.length === 0 ? (
                        <div className="flex items-center justify-center p-10">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    ) : filteredTickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-all group relative ${selectedTicket?.id === ticket.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-[10px] font-black uppercase ${ticket.status === 'open' ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {ticket.user?.name || 'Sistema'}
                                </span>
                                <span className="text-[9px] font-bold text-muted-foreground">
                                    {new Date(ticket.last_message_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className={`text-xs font-bold mb-1 truncate ${selectedTicket?.id === ticket.id ? 'text-primary' : 'text-foreground'}`}>
                                {ticket.subject}
                            </h4>
                            <div className="flex gap-2 items-center">
                                <span className={`w-2 h-2 rounded-full ${ticket.status === 'open' ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
                                <span className="text-[9px] font-black uppercase opacity-60">{ticket.status}</span>
                            </div>
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
                                    {selectedTicket.user?.name?.[0] || 'S'}
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-tight">{selectedTicket.subject}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-muted-foreground font-medium">{selectedTicket.user?.email}</span>
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
                                <button
                                    onClick={() => updateTicketStatus(selectedTicket.id, 'closed')}
                                    className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500/20 transition-all flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4" /> Finalizar Atendimento
                                </button>
                            </div>
                        </div>

                        {/* Messages Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-muted/5">
                            {currentMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-4 max-w-[80%] ${msg.is_admin ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black border-2 border-background shadow-sm ${msg.is_admin ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                                            {msg.is_admin ? 'EU' : (selectedTicket.user?.name?.[0] || 'U')}
                                        </div>
                                        <div className={`space-y-1 ${msg.is_admin ? 'items-end' : 'items-start'} flex flex-col`}>
                                            <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.is_admin
                                                ? 'bg-primary text-white rounded-tr-none'
                                                : 'bg-white border border-border rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest px-1">
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
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
                                <div className="p-3 bg-muted/30 border-t border-border flex justify-end items-center">
                                    <button
                                        onClick={handleSendReply}
                                        disabled={!replyText.trim()}
                                        className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                    >
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
