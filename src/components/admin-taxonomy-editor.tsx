
"use client"
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ChevronRight, ChevronDown, Folder, File, AlertTriangle, ArrowRight, Save, RotateCcw, Box, Plus, Trash2, Merge } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// Define the Taxonomy Node Structure
interface TaxNode {
    id: string
    slug: string
    name: string
    parent_id: string | null
    level: 'course' | 'specialty' | 'subspecialty' | 'subject'
    active: boolean
    children?: TaxNode[]
    count?: number // Loaded dynamically
}

// Extracted Component to prevent re-renders losing state
const TreeNode = ({
    node,
    selectedNodeId,
    mergeTargetId,
    isMergeMode,
    onDragStart,
    onDrop,
    onSelect,
    onSetMergeTarget
}: {
    node: TaxNode,
    selectedNodeId: string | null,
    mergeTargetId: string | null,
    isMergeMode: boolean,
    onDragStart: (e: React.DragEvent, node: TaxNode) => void,
    onDrop: (e: React.DragEvent, node: TaxNode) => void,
    onSelect: (node: TaxNode) => void,
    onSetMergeTarget: (node: TaxNode) => void
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const isSelected = selectedNodeId === node.id
    const isTarget = mergeTargetId === node.id

    return (
        <div className="pl-4 border-l border-slate-100">
            <div
                className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? 'bg-primary/10 text-primary font-bold' : ''} ${isTarget ? 'bg-emerald-100 ring-2 ring-emerald-500' : ''}`}
                draggable
                onDragStart={(e) => onDragStart(e, node)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, node)}
                onClick={(e) => {
                    e.stopPropagation()
                    if (isMergeMode) {
                        if (node.id !== selectedNodeId) onSetMergeTarget(node)
                    } else {
                        onSelect(node)
                    }
                }}
            >
                {node.children && node.children.length > 0 ? (
                    <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }} className="hover:bg-slate-200 rounded p-0.5">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                ) : <span className="w-3.5" />}

                <span className="text-sm select-none truncate max-w-[200px]">{node.name}</span>
                <span className="text-[10px] text-slate-400 font-mono ml-auto truncate max-w-[100px]">{node.slug}</span>
            </div>

            {isOpen && node.children && (
                <div className="ml-2">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selectedNodeId={selectedNodeId}
                            mergeTargetId={mergeTargetId}
                            isMergeMode={isMergeMode}
                            onDragStart={onDragStart}
                            onDrop={onDrop}
                            onSelect={onSelect}
                            onSetMergeTarget={onSetMergeTarget}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function TaxonomyEditor() {
    const supabase = createClientComponentClient()
    const [tree, setTree] = useState<TaxNode[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedNode, setSelectedNode] = useState<TaxNode | null>(null)

    // Drag State
    const [draggedNode, setDraggedNode] = useState<TaxNode | null>(null)

    // Merge State
    const [mergeTarget, setMergeTarget] = useState<TaxNode | null>(null)
    const [isMergeMode, setIsMergeMode] = useState(false)

    useEffect(() => {
        fetchTree()
    }, [])

    const fetchTree = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('taxonomia')
            .select('*')
            .order('level') // Ensure hierarchy order
            .order('name')

        if (error) {
            toast.error('Erro ao carregar taxonomia')
            setLoading(false)
            return
        }

        const builtTree = buildTree(data)
        setTree(builtTree)
        setLoading(false)
    }

    const buildTree = (nodes: any[]) => {
        const map = new Map()
        const roots: any[] = []

        // Create nodes map
        nodes.forEach(n => {
            map.set(n.id, { ...n, children: [] })
        })

        // Link parents
        nodes.forEach(n => {
            if (n.parent_id && map.has(n.parent_id)) {
                map.get(n.parent_id).children.push(map.get(n.id))
            } else {
                // Only strict hierarchy roots go here (or orphans)
                // If it's orphaned but has parent_id (parent inactive/deleted), treat as root?
                // For now, if no parent in map, it's a root.
                if (!n.parent_id) roots.push(map.get(n.id))
            }
        })

        // Handle orphaned nodes (parent exists in DB but not in fetch?)
        // The fetch gets ALL, so orphans only happen if parent_id is invalid.
        // We added ON DELETE SET NULL so this shouldn't happen often.
        // But let's check for any node with parent_id that wasn't pushed to a child array.
        // Actually the logic above handles it: if parent_id exists but not found in map, it won't be pushed anywhere.
        // So we should add an else if (n.parent_id) roots.push(...) to show orphans.
        nodes.forEach(n => {
            if (n.parent_id && !map.has(n.parent_id)) {
                roots.push(map.get(n.id))
            }
        })

        return roots
    }

    const handleDragStart = (e: React.DragEvent, node: TaxNode) => {
        e.stopPropagation()
        setDraggedNode(node)
    }

    const handleDrop = async (e: React.DragEvent, targetNode: TaxNode) => {
        e.stopPropagation()
        e.preventDefault()

        if (!draggedNode) return
        if (draggedNode.id === targetNode.id) return

        // Validation
        const validMove = (draggedNode.level === 'specialty' && targetNode.level === 'course') ||
            (draggedNode.level === 'subspecialty' && targetNode.level === 'specialty') ||
            (draggedNode.level === 'subject' && targetNode.level === 'subspecialty')

        if (!validMove) {
            toast.error(`Movimento inválido: ${draggedNode.level} não pode ser filho de ${targetNode.level}`)
            return
        }

        if (confirm(`Mover "${draggedNode.name}" para dentro de "${targetNode.name}"?`)) {
            const { error } = await supabase
                .from('taxonomia')
                .update({ parent_id: targetNode.id })
                .eq('id', draggedNode.id)

            if (error) {
                toast.error('Erro ao mover: ' + error.message)
            } else {
                toast.success('Movido com sucesso')
                // Log Audit
                await supabase.from('taxonomy_audit_log').insert({
                    action: 'MOVE',
                    target_id: draggedNode.id,
                    details: { from: draggedNode.parent_id, to: targetNode.id }
                })
                fetchTree()
            }
        }
        setDraggedNode(null)
    }

    const handleMerge = async () => {
        if (!selectedNode || !mergeTarget) return
        if (selectedNode.id === mergeTarget.id) return
        if (selectedNode.level !== mergeTarget.level) {
            toast.error('Fusão permitida apenas entre níveis iguais')
            return
        }

        if (confirm(`ATENÇÃO: Mover TODAS as questões de "${selectedNode.name}" para "${mergeTarget.name}"?`)) {
            const table = 'questao_base'
            // Map level to column name
            const columnEnvMap: Record<string, string> = {
                'specialty': 'specialty_id',
                'subspecialty': 'subspecialty_id',
                'subject': 'subject_id'
            }

            const column = columnEnvMap[selectedNode.level]
            if (!column) {
                toast.error('Nível inválido para atualização de questões')
                return
            }

            // 1. Update questions
            const { error: updateError, count } = await supabase
                .from(table)
                .update({ [column]: mergeTarget.slug })
                .eq(column, selectedNode.slug)
                .select('*', { count: 'exact', head: true }) // Count affected rows logic if possible, supabase update doesn't always return count directly in simple client

            if (updateError) {
                console.error('Update Error:', updateError)
                toast.error('Erro ao atualizar questões: ' + updateError.message)
                return
            }

            // 2. Deactivate old taxonomy node
            const { error: deactivateError } = await supabase.from('taxonomia').update({ active: false }).eq('id', selectedNode.id)
            if (deactivateError) toast.error('Erro ao desativar nó antigo')

            // 3. Move child taxonomy nodes
            const { error: moveChildrenError } = await supabase.from('taxonomia').update({ parent_id: mergeTarget.id }).eq('parent_id', selectedNode.id)
            if (moveChildrenError) toast.error('Erro ao mover filhos')

            // 4. Log
            await supabase.from('taxonomy_audit_log').insert({
                action: 'MERGE',
                target_id: selectedNode.id,
                details: { merged_into: mergeTarget.id, original_slug: selectedNode.slug, new_slug: mergeTarget.slug }
            })

            toast.success('Fusão concluída!')
            fetchTree()
            setSelectedNode(null)
            setMergeTarget(null)
            setIsMergeMode(false)
        }
    }

    return (
        <div className="flex h-full bg-slate-50">
            {/* SIDEBAR: TREE */}
            <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col h-full">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                    <h2 className="font-black uppercase text-sm tracking-widest text-slate-600">Taxonomia</h2>
                    <button onClick={fetchTree} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><RotateCcw size={14} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {loading ? (
                        <div className="space-y-2 p-4 animate-pulse">
                            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                        </div>
                    ) : (
                        tree.map(root => (
                            <TreeNode
                                key={root.id}
                                node={root}
                                selectedNodeId={selectedNode?.id || null}
                                mergeTargetId={mergeTarget?.id || null}
                                isMergeMode={isMergeMode}
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                                onSelect={setSelectedNode}
                                onSetMergeTarget={setMergeTarget}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* MAIN: DETAILS */}
            <div className="flex-1 flex flex-col bg-slate-50/50 p-8 overflow-y-auto">
                {selectedNode ? (
                    <div className="max-w-2xl w-full mx-auto space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Box size={24} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">{selectedNode.name}</h1>
                                    <p className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded w-fit mt-1">{selectedNode.slug}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${selectedNode.active ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        {selectedNode.active ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="space-y-1">
                                    <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Nível Hierárquico</span>
                                    <span className="font-semibold text-slate-700 capitalize">{selectedNode.level}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">ID do Sistema</span>
                                    <span className="font-mono text-xs text-slate-500">{selectedNode.id}</span>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={() => { setIsMergeMode(true); setMergeTarget(null); toast('Selecione o nó de destino na árvore à esquerda') }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isMergeMode ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 ring-2 ring-slate-800 ring-offset-2' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                                >
                                    <Merge size={16} />
                                    {isMergeMode ? 'Modo Fusão Ativo' : 'Fundir com Outro'}
                                </button>
                                {isMergeMode && (
                                    <button
                                        onClick={() => { setIsMergeMode(false); setMergeTarget(null) }}
                                        className="px-4 py-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            <AnimatePresence>
                                {isMergeMode && mergeTarget && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 overflow-hidden"
                                    >
                                        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                            <p className="text-xs font-bold text-emerald-800 mb-4 uppercase tracking-widest flex items-center gap-2">
                                                <AlertTriangle size={14} />
                                                Confirmar Fusão e Migração
                                            </p>

                                            <div className="flex items-center gap-4 text-sm text-emerald-900 bg-white/50 p-4 rounded-xl border border-emerald-100/50">
                                                <div className="flex-1 text-center">
                                                    <span className="block text-[10px] text-emerald-600/60 uppercase font-black mb-1">Origem</span>
                                                    <span className="font-bold">{selectedNode.name}</span>
                                                </div>
                                                <div className="bg-white p-2 rounded-full shadow-sm text-emerald-300">
                                                    <ArrowRight size={16} />
                                                </div>
                                                <div className="flex-1 text-center">
                                                    <span className="block text-[10px] text-emerald-600/60 uppercase font-black mb-1">Destino</span>
                                                    <span className="font-black text-lg">{mergeTarget.name}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 text-[10px] text-emerald-700/80 text-center leading-relaxed">
                                                Ao confirmar, todas as questões vinculadas a <b>{selectedNode.name}</b> serão transferidas para <b>{mergeTarget.name}</b>. O item original será desativado.
                                            </div>

                                            <button
                                                onClick={handleMerge}
                                                className="mt-6 w-full bg-emerald-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all"
                                            >
                                                Confirmar Unificação
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 pointer-events-none select-none">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-200">
                            <Box size={48} />
                        </div>
                        <p className="font-black uppercase tracking-widest text-xs text-slate-400">Selecione um item da taxonomia</p>
                        <p className="text-[10px] text-slate-300 mt-2">Para editar, mover ou fundir</p>
                    </div>
                )}
            </div>
        </div>
    )
}
