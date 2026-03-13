"use client"
import React, { useState, useEffect } from 'react'
import {
    ChevronRight, ChevronDown, Folder, File, AlertTriangle,
    ArrowRight, Save, RotateCcw, Box, Plus, Trash2, Merge,
    Edit2, X, CheckSquare, Square
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useConcursoTaxonomy as useTaxonomy, ConcursoTaxonomyNode as TaxonomyNode } from '@/store/concursos/use-taxonomy'

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
    node: TaxonomyNode,
    selectedNodeId: string | null,
    mergeTargetId: string | null,
    isMergeMode: boolean,
    onDragStart: (e: React.DragEvent, node: TaxonomyNode) => void,
    onDrop: (e: React.DragEvent, node: TaxonomyNode) => void,
    onSelect: (node: TaxonomyNode) => void,
    onSetMergeTarget: (node: TaxonomyNode) => void
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const isSelected = selectedNodeId === node.id
    const isTarget = mergeTargetId === node.id

    return (
        <div className="pl-4 border-l border-slate-100">
            <div
                className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50 text-indigo-600 font-bold' : ''} ${isTarget ? 'bg-emerald-100 ring-2 ring-emerald-500' : ''} ${!node.active ? 'opacity-50' : ''}`}
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
                        if (node.children && node.children.length > 0) {
                            setIsOpen(!isOpen)
                        }
                    }
                }}
            >
                {node.children && node.children.length > 0 ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
                        className="hover:bg-slate-200 rounded p-0.5 active:scale-95 transition-transform"
                    >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                ) : <span className="w-4" />}

                <span className="text-sm select-none truncate max-w-[200px]">{node.name}</span>
                <span className="text-[9px] text-slate-400 font-mono ml-auto truncate max-w-[100px] uppercase">{node.level}</span>
            </div>

            {isOpen && node.children && (
                <div className="ml-0">
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

export default function ConcursoTaxonomyEditor() {
    const { taxonomy, loading, loadTaxonomy, addNode, updateNode, deleteNode } = useTaxonomy()
    const [selectedNode, setSelectedNode] = useState<TaxonomyNode | null>(null)

    // Edit State
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({ name: '', slug: '', active: true })

    // Add State
    const [isAdding, setIsAdding] = useState(false)
    const [addForm, setAddForm] = useState({ name: '', slug: '', level: '' as any })

    // Drag State
    const [draggedNode, setDraggedNode] = useState<TaxonomyNode | null>(null)

    // Merge State
    const [mergeTarget, setMergeTarget] = useState<TaxonomyNode | null>(null)
    const [isMergeMode, setIsMergeMode] = useState(false)

    useEffect(() => {
        loadTaxonomy()
    }, [])

    useEffect(() => {
        if (selectedNode) {
            setEditForm({
                name: selectedNode.name,
                slug: selectedNode.slug,
                active: selectedNode.active
            })
            setIsEditing(false)
            setIsAdding(false)
        }
    }, [selectedNode])

    const handleDragStart = (e: React.DragEvent, node: TaxonomyNode) => {
        e.stopPropagation()
        setDraggedNode(node)
    }

    const handleDrop = async (e: React.DragEvent, targetNode: TaxonomyNode) => {
        e.stopPropagation()
        e.preventDefault()

        if (!draggedNode) return
        if (draggedNode.id === targetNode.id) return

        // Validation
        const levelOrder = ['environment', 'area', 'discipline', 'subdiscipline', 'subject']
        const draggedIdx = levelOrder.indexOf(draggedNode.level)
        const targetIdx = levelOrder.indexOf(targetNode.level)

        if (targetIdx !== draggedIdx - 1) {
            toast.error(`Movimento inválido: ${draggedNode.level} deve ser filho de ${levelOrder[draggedIdx - 1]}`)
            return
        }

        if (confirm(`Mover "${draggedNode.name}" para dentro de "${targetNode.name}"?`)) {
            const result = await updateNode(draggedNode.id, { parent_id: targetNode.id })
            if (result.success) {
                toast.success('Movido com sucesso')
                // Re-select to update UI
                if (selectedNode?.id === draggedNode.id) {
                    setSelectedNode({ ...draggedNode, parent_id: targetNode.id })
                }
            } else {
                toast.error('Erro ao mover: ' + result.message)
            }
        }
        setDraggedNode(null)
    }

    const handleSaveEdit = async () => {
        if (!selectedNode) return
        const result = await updateNode(selectedNode.id, editForm)
        if (result.success) {
            toast.success('Atualizado com sucesso')
            setIsEditing(false)
            // Update selected node locally to avoid full re-fetch mismatch
            setSelectedNode({ ...selectedNode, ...editForm })
        } else {
            toast.error('Erro ao atualizar: ' + result.message)
        }
    }

    const handleAddChild = async () => {
        if (!selectedNode) return

        const childLevelMap: Record<string, string> = {
            'environment': 'area',
            'area': 'discipline',
            'discipline': 'subdiscipline',
            'subdiscipline': 'subject'
        }

        const childLevel = childLevelMap[selectedNode.level]
        if (!childLevel) {
            toast.error('Este nível não pode ter filhos')
            return
        }

        const newNode = {
            name: addForm.name,
            slug: addForm.slug || addForm.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
            level: childLevel as any,
            parent_id: selectedNode.id,
            active: true,
            order: 0,
            metadata: {}
        }

        const result = await addNode(newNode)
        if (result.success) {
            toast.success('Filho adicionado com sucesso')
            setIsAdding(false)
            setAddForm({ name: '', slug: '', level: '' as any })
        } else {
            toast.error('Erro ao adicionar: ' + result.message)
        }
    }

    const handleDelete = async () => {
        if (!selectedNode) return
        if (confirm(`Tem certeza que deseja excluir "${selectedNode.name}"? Esta ação é irreversível se não houver filhos.`)) {
            const result = await deleteNode(selectedNode.id)
            if (result.success) {
                toast.success('Excluído com sucesso')
                setSelectedNode(null)
            } else {
                toast.error(result.message)
            }
        }
    }

    const handleMerge = async () => {
        if (!selectedNode || !mergeTarget) return

        if (confirm(`ATENÇÃO: Mover TODAS as questões de "${selectedNode.name}" para "${mergeTarget.name}"?`)) {
            const result = await updateNode(selectedNode.id, { active: false })
            if (result.success) {
                toast.success('Fusão concluída (Requer migração de questões no backend)')
                setSelectedNode(null)
                setMergeTarget(null)
                setIsMergeMode(false)
            }
        }
    }

    return (
        <div className="flex h-full bg-slate-50">
            {/* SIDEBAR: TREE */}
            <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col h-full">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                    <h2 className="font-black uppercase text-sm tracking-widest text-slate-600">Taxonomia Concursos</h2>
                    <button onClick={loadTaxonomy} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"><RotateCcw size={14} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                    {loading && taxonomy.length === 0 ? (
                        <div className="space-y-2 p-4 animate-pulse">
                            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                        </div>
                    ) : (
                        taxonomy.map(root => (
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
                            {/* HEADER */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <Box size={28} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">{selectedNode.name}</h1>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${selectedNode.active ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                            {selectedNode.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded w-fit mt-1">{selectedNode.slug}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className={`p-3 rounded-xl transition-all ${isEditing ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* EDIT FORM */}
                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 overflow-hidden"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase font-black text-slate-400">Nome</label>
                                                <input
                                                    value={editForm.name}
                                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase font-black text-slate-400">Slug</label>
                                                <input
                                                    value={editForm.slug}
                                                    onChange={e => setEditForm({ ...editForm, slug: e.target.value })}
                                                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setEditForm({ ...editForm, active: !editForm.active })}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${editForm.active ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}
                                            >
                                                {editForm.active ? <CheckSquare size={14} /> : <Square size={14} />}
                                                {editForm.active ? 'Ativo' : 'Inativo'}
                                            </button>
                                            <div className="flex-1" />
                                            <button onClick={() => setIsEditing(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600 mr-4">Cancelar</button>
                                            <button
                                                onClick={handleSaveEdit}
                                                className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all"
                                            >
                                                Salvar Alterações
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* STATS / INFO */}
                            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
                                <div className="space-y-1">
                                    <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">Nível Hierárquico</span>
                                    <span className="font-semibold text-slate-700 capitalize flex items-center gap-2 text-indigo-600">
                                        <Folder size={14} />
                                        {selectedNode.level}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <span className="block text-[10px] uppercase font-black text-slate-400 tracking-wider">ID do Sistema</span>
                                    <span className="font-mono text-[10px] text-slate-500 block truncate">{selectedNode.id}</span>
                                </div>
                            </div>

                            {/* ADD CHILD BUTTON */}
                            {selectedNode.level !== 'subject' && (
                                <div className="mt-8">
                                    {!isAdding ? (
                                        <button
                                            onClick={() => setIsAdding(true)}
                                            className="w-full border-2 border-dashed border-slate-200 py-4 rounded-2xl text-slate-400 hover:border-indigo-500/50 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest"
                                        >
                                            <Plus size={16} />
                                            Adicionar Novo {selectedNode.level === 'environment' ? 'Área' : selectedNode.level === 'area' ? 'Disciplina' : selectedNode.level === 'discipline' ? 'Subdisciplina' : 'Assunto'}
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xs font-black uppercase text-indigo-600">Novo Item Filho</h3>
                                                <button onClick={() => setIsAdding(false)}><X size={16} className="text-slate-400" /></button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-indigo-600/60">Nome</label>
                                                    <input
                                                        value={addForm.name}
                                                        onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                                                        placeholder="Ex: Português"
                                                        className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-indigo-600/60">Slug (Opcional)</label>
                                                    <input
                                                        value={addForm.slug}
                                                        onChange={e => setAddForm({ ...addForm, slug: e.target.value })}
                                                        placeholder="Ex: portugues"
                                                        className="w-full bg-white border border-indigo-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleAddChild}
                                                className="w-full bg-indigo-600 text-white py-3 rounded-xl text-xs font-black uppercase shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Plus size={16} />
                                                Confirmar Adição
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* MERGE ACTION */}
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => { setIsMergeMode(true); setMergeTarget(null); toast('Selecione o nó de destino na árvore à esquerda') }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isMergeMode ? 'bg-indigo-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                                >
                                    <Merge size={16} />
                                    {isMergeMode ? 'Modo Fusão Ativo' : 'Fundir com Outro'}
                                </button>
                                {isMergeMode && (
                                    <button
                                        onClick={() => { setIsMergeMode(false); setMergeTarget(null) }}
                                        className="px-4 py-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                                    >
                                        <X size={16} />
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

                                            <button
                                                onClick={handleMerge}
                                                className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all"
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
