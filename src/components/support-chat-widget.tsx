"use client"

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Paperclip, Minimize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/store/use-auth'

interface Message {
    id: string
    text: string
    isUser: boolean
    timestamp: Date
}

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Paperclip, Minimize2, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/store/use-auth'
import { useSupport, SupportMessage } from '@/store/use-support'

export function SupportChatWidget() {
    const { user } = useAuth()
    const { tickets, messages, sendMessage, createTicket, fetchTickets, fetchMessages, subscribeToMessages } = useSupport()
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Find active ticket for this user
    const activeTicket = tickets.find(t => t.user_id === user?.id && t.status !== 'closed')
    const chatMessages = activeTicket ? (messages[activeTicket.id] || []) : []

    useEffect(() => {
        if (user) fetchTickets()
    }, [user])

    useEffect(() => {
        if (activeTicket) {
            fetchMessages(activeTicket.id)
            const unsubscribe = subscribeToMessages(activeTicket.id)
            return () => unsubscribe()
        }
    }, [activeTicket?.id])

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !user) return
        setIsSending(true)

        try {
            if (!activeTicket) {
                // Auto-create ticket if none active
                await createTicket(`Suporte: ${user.name}`, inputValue)
            } else {
                await sendMessage(activeTicket.id, inputValue)
            }
            setInputValue('')
        } catch (err) {
            console.error('Support error:', err)
        } finally {
            setIsSending(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSendMessage()
    }

    return (
        <>
            {/* FLOATING BUTTON */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-28 md:bottom-6 right-6 z-50 w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
                    >
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                        <MessageCircle className="w-8 h-8 fill-current" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-background" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* CHAT WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-28 md:bottom-6 right-6 z-[60] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-background border border-border rounded-[30px] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* HEADER */}
                        <div className="bg-primary p-6 text-white flex justify-between items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                            <div className="relative z-10 flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <MessageCircle className="w-6 h-6 fill-white" />
                                </div>
                                <div>
                                    <h3 className="font-black italic uppercase tracking-tighter text-lg leading-none">Suporte QRub</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        Online Agora
                                    </p>
                                </div>
                            </div>
                            <div className="relative z-10 flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <Minimize2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* MESSAGES AREA */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                            {chatMessages.length === 0 && (
                                <div className="p-4 bg-card border border-border rounded-2xl text-xs font-medium text-center text-muted-foreground italic">
                                    Olá{user?.name ? ', ' + user.name.split(' ')[0] : ''}! 👋 <br />Como podemos te ajudar hoje?
                                </div>
                            )}
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${!msg.is_admin ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${!msg.is_admin ? 'bg-primary text-white rounded-br-none' : 'bg-card border border-border text-foreground rounded-bl-none shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isSending && (
                                <div className="flex justify-end opacity-50">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* INPUT AREA */}
                        <div className="p-4 bg-background border-t border-border">
                            <div className="flex items-center gap-2 bg-muted/50 p-2 pl-4 rounded-2xl border border-input focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite sua mensagem..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isSending}
                                    className="p-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                                >
                                    <Send className="w-4 h-4 fill-current" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
