import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, MessageCircle, MoreVertical, Flag, Trash2, Edit2, ChevronDown, CheckCircle2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Comment {
    id: string
    question_id: string
    user_id: string
    parent_id: string | null
    content: string
    likes_count: number
    is_pinned: boolean
    created_at: string
    updated_at: string | null
    is_deleted: boolean
    user: {
        name: string
        role: string
    } | null
    user_liked?: boolean
    my_comment?: boolean
    replies?: Comment[]
}

interface QuestionCommentsProps {
    questionId: string
}

export function QuestionComments({ questionId }: QuestionCommentsProps) {
    const { user } = useAuth()
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newComment, setNewComment] = useState('')
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'likes'>('relevance')

    const [reportingComment, setReportingComment] = useState<string | null>(null)
    const [reportReason, setReportReason] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchComments = useCallback(async () => {
        if (!questionId) return
        try {
            setLoading(true)
            const { data: commentsData, error: commentsErr } = await supabase
                .from('question_comments')
                .select(`
                    id, question_id, user_id, parent_id, content, likes_count, is_pinned, created_at, updated_at, is_deleted
                `)
                .eq('question_id', questionId)

            if (commentsErr) {
                // If table does not exist (PGRST205) or any other error, fallback gracefully
                console.error("Supabase Error on Comments:", commentsErr)
                if (commentsErr.code === 'PGRST205' || commentsErr.message.includes('relation')) {
                    console.warn("Tabelas de comentários ainda não existem no banco. Usando estado local (Mock).")
                    const mockComments: Comment[] = []
                    setComments(mockComments)
                    setError(null)
                    setLoading(false)
                    return
                }
                throw commentsErr
            }

            // Fetch user info manually if no relations mapped or just query users table
            const userIds = Array.from(new Set(commentsData.map(c => c.user_id)))
            let usersMap = new Map()

            if (userIds.length > 0) {
                const { data: usersData } = await supabase
                    .from('users')
                    .select('id, name, role')
                    .in('id', userIds)

                if (usersData) {
                    usersMap = new Map(usersData.map(u => [u.id, u]))
                }
            }

            // Fetch user's likes
            let userLikes = new Set()
            if (user) {
                const { data: likesData, error: likesError } = await supabase
                    .from('comment_likes')
                    .select('comment_id')
                    .eq('user_id', user.id)
                if (likesData) {
                    userLikes = new Set(likesData.map(l => l.comment_id))
                }
            }

            const processedComments: Comment[] = commentsData.map(c => ({
                ...c,
                user: usersMap.get(c.user_id) || { name: 'Usuário Desconhecido', role: 'ALUNO' },
                user_liked: userLikes.has(c.id),
                my_comment: user?.id === c.user_id,
                replies: []
            }))

            // Build Tree
            const rootComments = processedComments.filter(c => !c.parent_id)
            const childComments = processedComments.filter(c => c.parent_id)

            childComments.forEach(child => {
                const parent = rootComments.find(p => p.id === child.parent_id)
                if (parent) {
                    parent.replies?.push(child)
                }
            })

            // Sorting
            rootComments.sort((a, b) => {
                if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1

                if (sortBy === 'recent') {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                } else if (sortBy === 'likes') {
                    return b.likes_count - a.likes_count
                } else {
                    // Relevance
                    const scoreA = a.likes_count * 2 + (a.replies?.length || 0)
                    const scoreB = b.likes_count * 2 + (b.replies?.length || 0)
                    if (scoreA !== scoreB) return scoreB - scoreA
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                }
            })

            setComments(rootComments)
            setError(null)
        } catch (err: any) {
            console.error(err)
            setError("A conexão com o banco não está disponível (tabelas faltando).")
        } finally {
            setLoading(false)
        }
    }, [questionId, user, sortBy])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    useEffect(() => {
        if (!questionId) return
        const channel = supabase
            .channel('public:question_comments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'question_comments', filter: `question_id=eq.${questionId}` }, () => {
                fetchComments()
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'comment_likes' }, () => {
                fetchComments()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [questionId, fetchComments])

    const handlePostComment = async () => {
        if (!user) return alert("Faça login para comentar.")
        if (!newComment.trim() || newComment.length > 1000) return

        setIsSubmitting(true)
        try {
            const { error: insertErr } = await supabase.from('question_comments').insert({
                question_id: questionId,
                user_id: user.id,
                content: newComment.trim(),
                parent_id: replyingTo
            })

            if (insertErr) {
                if (insertErr.code === 'PGRST205' || insertErr.message.includes('relation')) {
                    // MOCK Behavior se nao tiver tabela
                    const mockNewC: Comment = {
                        id: Math.random().toString(),
                        question_id: questionId,
                        user_id: user.id,
                        content: newComment.trim(),
                        parent_id: replyingTo,
                        likes_count: 0,
                        is_pinned: false,
                        created_at: new Date().toISOString(),
                        updated_at: null,
                        is_deleted: false,
                        user: { name: user.name || 'Você', role: user.role || 'ALUNO' },
                        my_comment: true,
                        replies: []
                    }
                    if (replyingTo) {
                        setComments(curr => {
                            const addReply = (list: Comment[]): Comment[] => list.map(c => {
                                if (c.id === replyingTo) {
                                    return { ...c, replies: [...(c.replies || []), mockNewC] }
                                }
                                if (c.replies) return { ...c, replies: addReply(c.replies) }
                                return c
                            })
                            return addReply(curr)
                        })
                    } else {
                        setComments(curr => [mockNewC, ...curr])
                    }
                    setNewComment('')
                    setReplyingTo(null)
                    setIsSubmitting(false)
                    return
                }
                throw insertErr
            }

            setNewComment('')
            setReplyingTo(null)
            fetchComments()
        } catch (err: any) {
            alert('Não foi possível enviar o comentário. Verifique as tabelas do Supabase.')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleLike = async (comment: Comment) => {
        if (!user) return alert("Faça login para curtir.")

        // Optimistic update
        setComments(current => {
            const updateCommentList = (list: Comment[]): Comment[] => list.map(c => {
                if (c.id === comment.id) {
                    const liked = !c.user_liked
                    return { ...c, user_liked: liked, likes_count: c.likes_count + (liked ? 1 : -1) }
                }
                if (c.replies) {
                    return { ...c, replies: updateCommentList(c.replies) }
                }
                return c
            })
            return updateCommentList(current)
        })

        try {
            if (comment.user_liked) {
                await supabase.from('comment_likes').delete().match({ comment_id: comment.id, user_id: user.id })
                await supabase.auth.getSession() // just a ping
                await supabase.from('question_comments').update({ likes_count: Math.max(0, comment.likes_count - 1) }).eq('id', comment.id)
            } else {
                await supabase.from('comment_likes').insert({ comment_id: comment.id, user_id: user.id })
                await supabase.from('question_comments').update({ likes_count: comment.likes_count + 1 }).eq('id', comment.id)
            }
        } catch (err) {
            console.error(err)
            fetchComments() // revert on fail
        }
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm("Deseja mesmo excluir este comentário?")) return
        try {
            await supabase.from('question_comments').update({ is_deleted: true }).eq('id', id)
            fetchComments()
        } catch (e) {
            console.error(e)
            alert("Erro ao excluir comentário.")
        }
    }

    const handleReport = async () => {
        if (!user || !reportingComment || !reportReason.trim()) return
        try {
            await supabase.from('comment_reports').insert({
                comment_id: reportingComment,
                user_id: user.id,
                reason: reportReason
            })
            alert("Denúncia enviada com sucesso.")
            setReportingComment(null)
            setReportReason('')
        } catch (e) {
            console.error(e)
            alert("Erro ao enviar denúncia.")
        }
    }

    const renderComment = (c: Comment, isReply = false) => {
        if (c.is_deleted) return (
            <div key={c.id} className={`py-3 opacity-50 italic text-sm text-slate-500 ${isReply ? 'ml-8 border-l-2 border-slate-100 pl-4 mt-2' : 'border-b border-slate-100'}`}>
                Este comentário foi excluído.
            </div>
        )

        return (
            <div key={c.id} className={`py-4 ${isReply ? 'ml-8 border-l-2 border-slate-100 pl-4 mt-2' : 'border-b border-slate-100'}`}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-[#1A1033]">{c.user?.name}</span>
                        {c.user?.role === 'MASTER' && (
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-black uppercase">Dr. QRub</span>
                        )}
                        <span className="text-xs text-slate-400">• {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: ptBR })}</span>
                        {c.is_pinned && <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full ml-2">Fixado</span>}
                    </div>
                    {user && (
                        <div className="group relative">
                            <button className="text-slate-400 hover:text-slate-600 p-1">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-6 w-32 bg-white rounded-lg shadow-lg border border-slate-100 py-1 hidden group-hover:block z-10 text-xs">
                                {c.my_comment || user.role === 'MASTER' ? (
                                    <>
                                        <button onClick={() => handleDelete(c.id)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-red-500 flex items-center gap-2"><Trash2 className="w-3 h-3" /> Excluir</button>
                                    </>
                                ) : (
                                    <button onClick={() => setReportingComment(c.id)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"><Flag className="w-3 h-3" /> Denunciar</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-sm text-slate-700 mt-1 mb-3 whitespace-pre-wrap">{c.content}</p>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <button onClick={() => toggleLike(c)} className={`flex items-center gap-1.5 transition-colors ${c.user_liked ? 'text-primary' : 'hover:text-primary'}`}>
                        <ThumbsUp className={`w-3.5 h-3.5 ${c.user_liked ? 'fill-current' : ''}`} /> {c.likes_count}
                    </button>
                    {!isReply && (
                        <button onClick={() => setReplyingTo(c.id)} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" /> Responder
                        </button>
                    )}
                </div>

                {replyingTo === c.id && (
                    <div className="mt-3 ml-2 flex gap-2">
                        <textarea
                            autoFocus
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escreva sua resposta..."
                            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-[60px]"
                            maxLength={1000}
                        />
                        <div className="flex flex-col gap-1">
                            <button onClick={handlePostComment} disabled={isSubmitting || !newComment.trim()} className="bg-primary text-white rounded-lg px-3 py-1 font-bold text-xs hover:bg-primary/90 disabled:opacity-50">Enviar</button>
                            <button onClick={() => { setReplyingTo(null); setNewComment('') }} className="bg-slate-200 text-slate-600 rounded-lg px-3 py-1 font-bold text-xs hover:bg-slate-300">Cancelar</button>
                        </div>
                    </div>
                )}

                {c.replies?.map(r => renderComment(r, true))}
            </div>
        )
    }

    const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)

    // if (error) {
    //    return <div className="p-6 text-center text-sm font-bold text-rose-500 bg-rose-50 rounded-2xl">{error}</div>
    // }

    return (
        <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#1A1033] flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" /> Discussão da Questão ({totalComments})
                </h3>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <span className="hidden sm:inline">Ordenar por:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-slate-50 border-none rounded-lg text-primary focus:ring-0 font-black uppercase text-[10px] tracking-widest cursor-pointer">
                        <option value="relevance">Relevância</option>
                        <option value="recent">Mais Recentes</option>
                        <option value="likes">Mais Curtidos</option>
                    </select>
                </div>
            </div>

            {user ? (
                <div className="mb-8">
                    {!replyingTo && (
                        <div className="flex flex-col sm:flex-row gap-3 items-start">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Deixe seu comentário ou dúvida..."
                                className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-[80px]"
                                maxLength={1000}
                            />
                            <button
                                onClick={handlePostComment}
                                disabled={isSubmitting || !newComment.trim()}
                                className="w-full sm:w-auto bg-[#1A1033] text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed h-[80px]"
                            >
                                Publicar
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mb-8 p-4 bg-slate-50 rounded-xl text-center text-sm font-medium text-slate-500">
                    Faça login para participar da discussão.
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-8 opacity-50"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" /></div>
            ) : (
                <div className="space-y-2">
                    {comments.map(c => renderComment(c))}
                    {comments.length === 0 && (
                        <div className="text-center py-12 text-slate-400 font-medium text-sm">
                            Nenhum comentário ainda. Seja o primeiro a discutir esta questão!
                        </div>
                    )}
                </div>
            )}

            {/* Modal Denúncia */}
            <AnimatePresence>
                {reportingComment && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-[#1A1033]">Denunciar Comentário</h3>
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Qual o motivo da denúncia?"
                                className="w-full border-2 border-slate-100 rounded-xl p-3 h-24 mb-4 text-sm resize-none focus:border-primary focus:ring-0"
                            />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setReportingComment(null)} className="px-4 py-2 font-bold text-xs uppercase text-slate-500 hover:bg-slate-100 rounded-lg">Cancelar</button>
                                <button onClick={handleReport} className="px-6 py-2 bg-red-500 text-white font-black text-xs uppercase rounded-lg hover:bg-red-600">Enviar Denúncia</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
