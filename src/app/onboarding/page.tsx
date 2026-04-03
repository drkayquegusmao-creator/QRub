"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, BookOpen, Calendar, Save, Sparkles, Target, MapPin, Search, ChevronDown, Check, ArrowLeft, LogOut } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { isMasterEmail } from '@/lib/auth-constants'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'
import { CheckoutModal } from '@/components/checkout-modal'

// Mock de dados para DDI e Estados/Cidades
const COUNTRIES = [
    { code: '+55', name: 'Brasil', flag: '🇧🇷' },
    { code: '+1', name: 'EUA/Canadá', flag: '🇺🇸' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+34', name: 'Espanha', flag: '🇪🇸' },
    { code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+598', name: 'Uruguai', flag: '🇺🇾' },
]

const BRAZIL_STATES = [
    { uf: 'AC', name: 'Acre' }, { uf: 'AL', name: 'Alagoas' }, { uf: 'AP', name: 'Amapá' },
    { uf: 'AM', name: 'Amazonas' }, { uf: 'BA', name: 'Bahia' }, { uf: 'CE', name: 'Ceará' },
    { uf: 'DF', name: 'Distrito Federal' }, { uf: 'ES', name: 'Espírito Santo' }, { uf: 'GO', name: 'Goiás' },
    { uf: 'MA', name: 'Maranhão' }, { uf: 'MT', name: 'Mato Grosso' }, { uf: 'MS', name: 'Mato Grosso do Sul' },
    { uf: 'MG', name: 'Minas Gerais' }, { uf: 'PA', name: 'Pará' }, { uf: 'PB', name: 'Paraíba' },
    { uf: 'PR', name: 'Paraná' }, { uf: 'PE', name: 'Pernambuco' }, { uf: 'PI', name: 'Piauí' },
    { uf: 'RJ', name: 'Rio de Janeiro' }, { uf: 'RN', name: 'Rio Grande do Norte' }, { uf: 'RS', name: 'Rio Grande do Sul' },
    { uf: 'RO', name: 'Rondônia' }, { uf: 'RR', name: 'Roraima' }, { uf: 'SC', name: 'Santa Catarina' },
    { uf: 'SP', name: 'São Paulo' }, { uf: 'SE', name: 'Sergipe' }, { uf: 'TO', name: 'Tocantins' }
]

const BRAZIL_DDD_TO_STATE: Record<string, string> = {
    '11': 'SP', '12': 'SP', '13': 'SP', '14': 'SP', '15': 'SP', '16': 'SP', '17': 'SP', '18': 'SP', '19': 'SP',
    '21': 'RJ', '22': 'RJ', '24': 'RJ', '27': 'ES', '28': 'ES', '31': 'MG', '32': 'MG', '33': 'MG', '34': 'MG',
    '35': 'MG', '37': 'MG', '38': 'MG', '41': 'PR', '42': 'PR', '43': 'PR', '44': 'PR', '45': 'PR', '46': 'PR',
    '47': 'SC', '48': 'SC', '49': 'SC', '51': 'RS', '53': 'RS', '54': 'RS', '55': 'RS', '61': 'DF', '62': 'GO',
    '63': 'TO', '64': 'GO', '65': 'MT', '66': 'MT', '67': 'MS', '68': 'AC', '69': 'RO', '71': 'BA', '73': 'BA',
    '74': 'BA', '75': 'BA', '77': 'BA', '79': 'SE', '81': 'PE', '82': 'AL', '83': 'PB', '84': 'RN', '85': 'CE',
    '86': 'PI', '87': 'PE', '88': 'CE', '89': 'PI', '91': 'PA', '92': 'AM', '93': 'PA', '94': 'PA', '95': 'RR',
    '96': 'AP', '97': 'AM', '98': 'MA', '99': 'MA'
}

export default function OnboardingPage() {
    const { user, completeProfile, finishOnboarding, isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const [isHydrated, setIsHydrated] = useState(false)
    const [loading, setLoading] = useState(false)

    // Form States
    const [formData, setFormData] = useState({
        name: user?.name || '',
        ddi: '+55',
        phone: '',
        institution: '',
        graduation_year: '',
        specialty_of_interest: '',
        cep: '',
        address_street: '',
        address_number: '',
        address_city: '',
        address_state: '',
        address_country: 'Brasil'
    })

    const [wizardStep, setWizardStep] = useState<1 | 2>(1)
    const [selectedProduct, setSelectedProduct] = useState<'qrub_concurso' | 'qrub_saude'>('qrub_concurso')
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'mensal' | 'trimestral' | 'semestral' | 'anual' | null>(null)
    const [showCheckout, setShowCheckout] = useState(false)

    // UI States
    const [showSpecialtyList, setShowSpecialtyList] = useState(false)
    const [showYearList, setShowYearList] = useState(false)
    const [showDDIList, setShowDDIList] = useState(false)
    const [showStateList, setShowStateList] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    // Sync user data to form when it becomes available
    useEffect(() => {
        if (user && !formData.name) {
            setFormData(prev => ({ ...prev, name: user.name || '' }))
        }
    }, [user, formData.name])

    const years = useMemo(() => {
        return Array.from({ length: 2050 - 1960 + 1 }, (_, i) => (2050 - i).toString())
    }, [])


    const specialties = useMemo(() => {
        return MEDICAL_HIERARCHY[0].specialties.map(s => s.name).sort()
    }, [])

    // Smart Routing: Skip step 1 if data already exists
    useEffect(() => {
        if (isHydrated && user && wizardStep === 1) {
            const hasBasicInfo = user.phone && user.institution && user.graduation_year && user.address;
            if (hasBasicInfo) {
                setWizardStep(2)
            }
        }
    }, [isHydrated, user, wizardStep])

    // Form Handlers
    const handlePhoneChange = (val: string) => {
        const numbersOnly = val.replace(/\D/g, '')
        setFormData(prev => {
            const newState = { ...prev, phone: numbersOnly }
            if (prev.ddi === '+55' && numbersOnly.length >= 2) {
                const ddd = numbersOnly.substring(0, 2)
                const uf = BRAZIL_DDD_TO_STATE[ddd]
                if (uf) newState.address_state = uf
            }
            return newState
        })
    }

    const handleDDISelect = (country: typeof COUNTRIES[0]) => {
        setFormData(prev => ({ ...prev, ddi: country.code, address_country: country.name }))
        setShowDDIList(false)
    }

    const isFormValid = formData.name && formData.phone && formData.institution &&
        formData.graduation_year &&
        formData.address_city && formData.address_state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid || loading) return
        setLoading(true)

        try {
            const fullAddress = `${formData.address_street}, ${formData.address_number} - ${formData.address_city}/${formData.address_state}, ${formData.address_country} (CEP: ${formData.cep})`
            const fullPhone = `${formData.ddi} ${formData.phone}`

            await completeProfile({
                name: formData.name,
                phone: fullPhone,
                institution: formData.institution,
                graduation_year: formData.graduation_year,
                specialty_of_interest: formData.specialty_of_interest,
                address: fullAddress
            })
            setWizardStep(2)
        } catch (err: any) {
            console.error(err)
            alert('Falha ao salvar seu perfil. Verifique os dados e tente novamente.')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (!isHydrated) return

        if (!isAuthenticated) {
            router.push('/')
        } else if (user?.role === 'MASTER' || isMasterEmail(user?.email) || user?.profile_completed) {
            router.push('/dashboard')
        }
    }, [isHydrated, isAuthenticated, user, router])

    if (!isHydrated) return null
    if (!isAuthenticated || user?.role === 'MASTER' || isMasterEmail(user?.email) || user?.profile_completed) return null


    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-6 relative overflow-y-auto">
            {/* Background Decor */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl bg-card border border-border rounded-[2rem] md:rounded-[3rem] soft-shadow overflow-hidden relative z-10 m-auto"
            >
                {/* Header Section */}
                <div className="royal-gradient p-8 md:p-12 text-white relative">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="bg-white p-2 rounded-xl">
                            <Image src="/logo-icon.jpg" alt="QRub" width={28} height={28} className="rounded-lg" />
                        </div>
                        <span className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">QRub</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-2">
                        {wizardStep === 1 ? 'Quase lá!' : 'Escolha seu Plano'}
                    </h2>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed max-w-lg">
                        {wizardStep === 1 
                            ? 'Complete seu perfil para liberar acesso ao sistema.'
                            : 'Personalize seu acesso e libere a plataforma com a assinatura certa para você.'}
                    </p>
                </div>

                {wizardStep === 1 ? (
                    <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6 md:space-y-8 bg-card/50 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nome Completo */}
                        <div className="md:col-span-2">
                            <InputField
                                label="Nome Completo"
                                icon={<User className="w-4 h-4" />}
                                placeholder="Seu nome completo"
                                value={formData.name}
                                onChange={(val) => setFormData({ ...formData, name: val })}
                            />
                        </div>

                        {/* WhatsApp com DDI */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Telefone / WhatsApp</label>
                            <div className="flex gap-2">
                                <div className="relative w-32 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setShowDDIList(!showDDIList)}
                                        className="w-full h-[58px] bg-muted border border-border rounded-xl flex items-center justify-between px-3 hover:border-primary transition-all font-bold text-sm"
                                    >
                                        <span className="flex items-center gap-2">
                                            {COUNTRIES.find(c => c.code === formData.ddi)?.flag} {formData.ddi}
                                        </span>
                                        <ChevronDown className="w-4 h-4 opacity-50" />
                                    </button>
                                    <DropdownList
                                        show={showDDIList}
                                        onClose={() => setShowDDIList(false)}
                                        items={COUNTRIES.map(c => ({ id: c.code, name: `${c.flag} ${c.name} (${c.code})` }))}
                                        onSelect={(id) => handleDDISelect(COUNTRIES.find(c => c.code === id)!)}
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handlePhoneChange(e.target.value)}
                                        placeholder="DDD999999999"
                                        className="w-full h-[58px] bg-muted border border-border rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ano de Formação */}
                        <div className="space-y-2 relative">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Ano de Formação</label>
                            <button
                                type="button"
                                onClick={() => setShowYearList(!showYearList)}
                                className="w-full h-[58px] bg-muted border border-border rounded-xl flex items-center gap-4 px-4 hover:border-primary transition-all font-bold text-sm"
                            >
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className={formData.graduation_year ? 'text-foreground' : 'text-muted-foreground'}>
                                    {formData.graduation_year || 'Selecione o ano'}
                                </span>
                            </button>
                            <DropdownList
                                show={showYearList}
                                onClose={() => setShowYearList(false)}
                                items={years.map(y => ({ id: y, name: y }))}
                                onSelect={(val) => setFormData({ ...formData, graduation_year: val })}
                            />
                        </div>

                        {/* Instituição de Ensino */}
                        <div className="md:col-span-2">
                            <InputField
                                label="Instituição de Ensino"
                                icon={<BookOpen className="w-4 h-4" />}
                                placeholder="Nome da sua faculdade"
                                value={formData.institution}
                                onChange={(val) => setFormData({ ...formData, institution: val })}
                            />
                        </div>

                        {/* Endereço - Detalhado */}
                        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/30 p-4 rounded-3xl border border-dashed border-border/50">
                            <div className="col-span-2 md:col-span-1">
                                <InputField label="CEP" icon={<MapPin className="w-4 h-4" />} placeholder="00000-000" value={formData.cep} onChange={(val) => setFormData({ ...formData, cep: val })} />
                            </div>
                            <div className="col-span-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Estado (UF)</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowStateList(!showStateList)}
                                        className="w-full h-[58px] bg-muted border border-border rounded-xl flex items-center justify-between px-4 hover:border-primary transition-all font-bold text-sm text-left"
                                    >
                                        <span className={formData.address_state ? 'text-foreground' : 'text-muted-foreground'}>
                                            {formData.address_state ? `${formData.address_state} - ${BRAZIL_STATES.find(s => s.uf === formData.address_state)?.name}` : 'Selecione UF'}
                                        </span>
                                        <ChevronDown className="w-4 h-4 opacity-50" />
                                    </button>
                                    <DropdownList
                                        show={showStateList}
                                        onClose={() => setShowStateList(false)}
                                        items={BRAZIL_STATES.map(s => ({ id: s.uf, name: `${s.uf} - ${s.name}` }))}
                                        onSelect={(uf) => setFormData({ ...formData, address_state: uf })}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <InputField label="Cidade" icon={<MapPin className="w-4 h-4" />} placeholder="Cidade" value={formData.address_city} onChange={(val) => setFormData({ ...formData, address_city: val })} />
                            </div>
                            <div className="col-span-2 md:col-span-3">
                                <InputField label="Rua / Endereço" icon={<MapPin className="w-4 h-4" />} placeholder="Ex: Av. Brasil, Logradouro..." value={formData.address_street} onChange={(val) => setFormData({ ...formData, address_street: val })} />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <InputField label="Nº" icon={<MapPin className="w-4 h-4" />} placeholder="123" value={formData.address_number} onChange={(val) => setFormData({ ...formData, address_number: val })} />
                            </div>
                        </div>

                        {/* Especialidade de Interesse (Opcional) */}
                        <div className="md:col-span-2">
                            <InputField
                                label="Especialidade de Interesse (Opcional)"
                                icon={<Target className="w-4 h-4" />}
                                placeholder="Ex: Cardiologia, Radiologia..."
                                value={formData.specialty_of_interest}
                                onChange={(val) => setFormData({ ...formData, specialty_of_interest: val })}
                                required={false}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className="w-full h-16 md:h-20 royal-gradient text-white rounded-[24px] font-black text-lg md:text-xl uppercase tracking-widest soft-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save className="w-6 h-6" />
                                CONCLUIR CADASTRO
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={async () => {
                            await logout()
                            router.push('/')
                        }}
                        className="w-full h-12 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all border border-dashed border-border/50 rounded-2xl hover:bg-primary/5 hover:border-primary/50"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao Início
                    </button>

                    <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">
                        Sua jornada médica começa agora. Dados criptografados e seguros.
                    </p>
                </form>
                ) : (
                    <div className="p-6 md:p-10 space-y-8 bg-card/50 backdrop-blur-sm">
                        {/* Produto Toggle */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">1. Escolha a sua Plataforma Temática</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedProduct('qrub_concurso')}
                                    className={`py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                                        selectedProduct === 'qrub_concurso' 
                                        ? 'bg-[#7c3aed]/20 border-2 border-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' 
                                        : 'bg-muted border border-border text-muted-foreground hover:border-primary/50'
                                    }`}
                                >
                                    QRub Concurso
                                </button>
                                <button
                                    onClick={() => setSelectedProduct('qrub_saude')}
                                    className={`py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                                        selectedProduct === 'qrub_saude' 
                                        ? 'bg-[#10b981]/20 border-2 border-[#10b981] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                                        : 'bg-muted border border-border text-muted-foreground hover:border-primary/50'
                                    }`}
                                >
                                    QRub Saúde
                                </button>
                            </div>
                        </div>

                        {/* Planos Toggle */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">2. Escolha sua Duração</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'free', name: 'Free', price: 'Grátis' },
                                    { id: 'mensal', name: 'Mensal', price: 'R$ 29,99/m' },
                                    { id: 'trimestral', name: 'Trimestral', price: 'R$ 79,99/3m' },
                                    { id: 'semestral', name: 'Semestral', price: 'R$ 139,99/6m' },
                                    { id: 'anual', name: 'Acesso Anual', price: 'R$ 249,99/ano' }
                                ].map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedPlan(p.id as any)}
                                        className={`p-5 rounded-xl border-2 transition-all flex flex-col items-start gap-1 ${
                                            selectedPlan === p.id
                                            ? selectedProduct === 'qrub_concurso' ? 'border-[#7c3aed] bg-[#7c3aed]/10' : 'border-[#10b981] bg-[#10b981]/10'
                                            : 'border-border bg-muted hover:border-primary/50'
                                        }`}
                                    >
                                        <span className="font-bold uppercase text-xs tracking-widest">{p.name}</span>
                                        <span className="text-xl font-black italic">{p.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCheckout(true)}
                            disabled={!selectedPlan}
                            className="w-full h-16 md:h-20 royal-gradient text-white rounded-[24px] font-black text-lg md:text-xl uppercase tracking-widest soft-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale mt-8"
                        >
                            <Sparkles className="w-6 h-6" />
                            IR PARA PAGAMENTO
                        </button>

                        <button
                            type="button"
                            onClick={async () => {
                                await finishOnboarding()
                                router.push('/dashboard')
                            }}
                            className="w-full h-12 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all rounded-2xl hover:bg-primary/5"
                        >
                            Decidir Depois (Ir para Painel Free)
                        </button>
                    </div>
                )}
            </motion.div>

            {selectedPlan && (
                <CheckoutModal 
                    isOpen={showCheckout}
                    onClose={() => setShowCheckout(false)}
                    plan={selectedPlan}
                    product={selectedProduct}
                />
            )}
        </div>
    )
}

function InputField({ label, icon, placeholder, value, onChange, required = true }: { label: string, icon: any, placeholder: string, value: string, onChange: (val: string) => void, required?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">{icon}</div>
                <input
                    required={required}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-[58px] bg-muted border border-border rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm placeholder:opacity-40"
                />
            </div>
        </div>
    )
}

function DropdownList({ show, onClose, items, onSelect, hasSearch }: { show: boolean, onClose: () => void, items: { id: string, name: string }[], onSelect: (id: string) => void, hasSearch?: boolean }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filtered = items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <AnimatePresence>
            {show && (
                <>
                    <div className="fixed inset-0 z-40" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute left-0 right-0 top-full mt-2 z-50 bg-card border border-border rounded-2xl soft-shadow max-h-[300px] overflow-hidden flex flex-col"
                    >
                        {hasSearch && (
                            <div className="p-3 border-b border-border bg-muted/30">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        autoFocus
                                        type="text"
                                        className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Buscar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            {filtered.length > 0 ? (
                                filtered.map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => { onSelect(item.id); onClose(); }}
                                        className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-primary/10 transition-colors flex items-center justify-between group"
                                    >
                                        <span className="group-hover:text-primary transition-colors">{item.name}</span>
                                        <Check className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-xs text-muted-foreground font-bold uppercase tracking-widest">Nenhum resultado</div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
