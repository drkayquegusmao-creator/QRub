"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Megaphone, X, Edit2, Check, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'

export function AnnouncementBanner() {
    const { user } = useAuth()
    const [announcement, setAnnouncement] = useState<{ id: string, content: string } | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    const isAdmin = ['master', 'admin_master', 'admin_global'].includes(user?.role?.toLowerCase() || '')

    useEffect(() => {
        fetchAnnouncement()
    }, [])

    async function fetchAnnouncement() {
        try {
            const { data, error } = await supabase
                .from('platform_announcements')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle()

            if (error) throw error
            if (data) {
                setAnnouncement(data)
                setEditContent(data.content)
            }
        } catch (err) {
            console.error('Error fetching announcement:', err)
        }
    }

    async function handleSave() {
        if (!announcement || !editContent.trim()) return
        setIsLoading(true)
        try {
            const { error } = await supabase
                .from('platform_announcements')
                .update({ content: editContent, updated_at: new Date().toISOString() })
                .eq('id', announcement.id)

            if (error) throw error
            setAnnouncement({ ...announcement, content: editContent })
            setIsEditing(false)
        } catch (err) {
            console.error('Error updating announcement:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (announcement && isVisible) {
            document.documentElement.setAttribute('data-banner-active', 'true')
        } else {
            document.documentElement.removeAttribute('data-banner-active')
        }
        return () => document.documentElement.removeAttribute('data-banner-active')
    }, [announcement, isVisible])

    if (!announcement || !isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-zinc-900 border-b border-white/5 w-full shrink-0 fixed top-0 left-0 z-[10000]"
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                        <Megaphone className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />

                        {isEditing ? (
                            <div className="flex items-center gap-2 flex-1 max-w-2xl">
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="bg-black/50 border border-[#39FF14]/30 text-[11px] font-bold text-white px-2 py-0.5 w-full focus:outline-none focus:border-[#39FF14]"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="p-1 hover:bg-white/10 text-[#39FF14] transition-colors"
                                >
                                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false)
                                        setEditContent(announcement.content)
                                    }}
                                    className="p-1 hover:bg-white/10 text-rose-500 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <p className="text-[11px] font-black uppercase tracking-widest text-white/70 truncate">
                                {announcement.content}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {isAdmin && !isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1.5 hover:bg-white/10 text-white/30 hover:text-white transition-all rounded"
                                title="Editar Comunicado"
                            >
                                <Edit2 className="w-3 h-3" />
                            </button>
                        )}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1.5 hover:bg-white/10 text-white/30 hover:text-white transition-all rounded"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
