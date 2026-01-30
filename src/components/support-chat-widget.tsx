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

export function SupportChatWidget() {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true)
            setTimeout(() => {
                setMessages([
                    {
                        id: '1',
                        text: `Olá${user?.name ? ', ' + user.name.split(' ')[0] : ''}! 👋 Bem-vindo ao Suporte QRub. Como podemos te ajudar hoje?`,
                        isUser: false,
                        timestamp: new Date()
                    }
                ])
                setIsTyping(false)
            }, 1000)
        }
    }, [isOpen, user, messages.length])

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    const handleSendMessage = () => {
        if (!inputValue.trim()) return

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            isUser: true,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, newUserMsg])
        setInputValue('')
        setIsTyping(true)

        // Mock Reply
        setTimeout(() => {
            const replyMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Entendido! Um de nossos especialistas em aprovação vai analisar sua dúvida e te responder em instantes. 🚀",
                isUser: false,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, replyMsg])
            setIsTyping(false)
        }, 1500)
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
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
                    >
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                        <MessageCircle className="w-8 h-8 fill-current" />

                        {/* Notification Badge */}
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
                        className="fixed bottom-6 right-6 z-[60] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-background border border-border rounded-[30px] shadow-2xl overflow-hidden flex flex-col"
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
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${msg.isUser
                                                ? 'bg-primary text-white rounded-br-none'
                                                : 'bg-card border border-border text-foreground rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                    </div>
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
                                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    className="p-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-primary/20"
                                >
                                    <Send className="w-4 h-4 fill-current" />
                                </button>
                            </div>
                            <p className="text-[9px] text-center text-muted-foreground mt-2 font-bold uppercase tracking-widest">
                                Tempo médio de resposta: 2 minutos
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
