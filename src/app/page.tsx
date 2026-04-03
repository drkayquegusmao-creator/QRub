"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone, Monitor, ChevronRight,
  Download, Laptop, Apple, Layout, 
  Rocket, HeartPulse, GraduationCap,
  MessageCircle, Instagram, Tablet,
  Play, Zap, ShieldCheck, Sparkles, CheckCircle2,
  Clock, Layers, MousePointer2, Globe, Target,
  LayoutGrid, RefreshCw, MonitorCheck, Music,
  ArrowRight, School, Laptop2
} from 'lucide-react'
import { AuthModal } from '@/components/auth-modal'
import { CheckoutModal } from '@/components/checkout-modal'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useTheme } from 'next-themes'
import { isMasterEmail } from '@/lib/auth-constants'

export default function Home() {
  const { setTheme } = useTheme()
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { isAuthenticated, user, setPendingPlan, getPendingPlan, clearPendingPlan } = useAuth()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false)
  const [activeTab, setActiveTab] = useState<'Recursos' | 'Metodologia' | 'Planos' | 'Sobre' | 'Contato'>('Recursos')
  const [activeProduct, setActiveProduct] = useState<'qrub_concurso' | 'qrub_saude'>('qrub_concurso')
  const [checkoutConfig, setCheckoutConfig] = useState<{ isOpen: boolean, plan: 'free' | 'mensal' | 'trimestral' | 'semestral' | 'anual', product: 'qrub_concurso' | 'qrub_saude' }>({
    isOpen: false,
    plan: 'free',
    product: 'qrub_concurso'
  })

  useEffect(() => {
    if (isAuthenticated) {
      const pending = getPendingPlan()
      if (pending) {
        setCheckoutConfig({ 
          isOpen: true, 
          plan: pending.plan as 'free' | 'mensal' | 'trimestral' | 'semestral' | 'anual', 
          product: pending.product 
        })
        clearPendingPlan()
      }
    }
  }, [isAuthenticated, getPendingPlan, clearPendingPlan])

  const handleEnvironmentAccess = (env: 'SAUDE' | 'CONCURSOS') => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('qrub_last_environment', env)
    }
    
    if (isAuthenticated) {
      if (user && isMasterEmail(user.email)) {
        router.push('/select-environment')
      } else {
        router.push(env === 'SAUDE' ? '/saude' : '/concursos')
      }
    } else {
      setIsAuthOpen(true)
    }
  }

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      // Remover redirecionamento automático para não atrapalhar o login passivo se o usuário quiser ficar na landing
      // router.push('/dashboard') (desabilitado para deixar landing page usável logado)
    }
  }, [isHydrated, isAuthenticated])

  if (!isHydrated) return null

  return (
    <div className="bg-[#0c1322] text-[#dce2f7] font-sans selection:bg-[#7c3aed] selection:text-white overflow-x-hidden min-h-screen">
      
      {/* 1. Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#2e1065]/60 backdrop-blur-xl border-none shadow-[0_24px_48px_-12px_rgba(115,46,228,0.08)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
          <div className="text-2xl font-black text-white tracking-tighter">QRUB</div>
          <div className="hidden md:flex items-center gap-8 tracking-tight font-semibold">
            <button 
              onClick={() => setActiveTab('Recursos')}
              className={`${activeTab === 'Recursos' ? 'text-violet-300 border-b-2 border-violet-500 pb-1' : 'text-slate-300'} hover:text-white transition-all`}
            >
              Recursos
            </button>
            <button 
              onClick={() => setActiveTab('Metodologia')}
              className={`${activeTab === 'Metodologia' ? 'text-violet-300 border-b-2 border-violet-500 pb-1' : 'text-slate-300'} hover:text-white transition-all`}
            >
              Metodologia
            </button>
            <button 
              onClick={() => setActiveTab('Planos')}
              className={`${activeTab === 'Planos' ? 'text-violet-300 border-b-2 border-violet-500 pb-1' : 'text-slate-300'} hover:text-white transition-all`}
            >
              Planos
            </button>
            <button 
              onClick={() => setActiveTab('Sobre')}
              className={`${activeTab === 'Sobre' ? 'text-violet-300 border-b-2 border-violet-500 pb-1' : 'text-slate-300'} hover:text-white transition-all`}
            >
              Sobre
            </button>
            <button 
              onClick={() => setActiveTab('Contato')}
              className={`${activeTab === 'Contato' ? 'text-violet-300 border-b-2 border-violet-500 pb-1' : 'text-slate-300'} hover:text-white transition-all`}
            >
              Contato
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Já sou usuário
            </button>
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="px-8 py-2.5 text-sm font-black uppercase tracking-widest rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-105 active:scale-95 duration-200 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] font-sans border border-white/10"
            >
              Entrar
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Content Rendering */}
      <AnimatePresence mode="wait">
        {activeTab === 'Recursos' && (
          <motion.div
            key="recursos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* 2. Hero Section */}
            <section className="relative pt-32 pb-20 px-8 overflow-hidden">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="z-10 text-center lg:text-left">
                  <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-[#7c3aed]/20 text-[#d2bbff] border border-[#7c3aed]/20">
                    PLATAFORMA COGNITIVA LUMINAR
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter mb-8">
                    Domine sua aprovação com um app feito para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] to-[#eaddff]">performance.</span>
                  </h1>
                  <p className="text-xl text-[#ccc3d8] leading-relaxed mb-10 max-w-2xl font-sans">
                    Estude com velocidade, foco e inteligência. O QRUB funciona como aplicativo no seu celular ou direto no navegador.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <button 
                      onClick={() => setActiveTab('Planos')}
                      className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#d2bbff] text-[#25005a] font-black text-xl shadow-[0_20px_40px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-95 transition-all font-sans flex items-center justify-center gap-2 group"
                    >
                      Começar Agora <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setIsAuthOpen(true)}
                      className="w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-white/10 bg-white/5 text-white font-black text-xl hover:bg-white/10 hover:border-white/20 transition-all font-sans flex items-center justify-center gap-2"
                    >
                      Já sou usuário <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-8 text-sm text-slate-500 font-medium flex items-center justify-center lg:justify-start gap-2">
                    <MonitorCheck className="w-4 h-4" />
                    Disponível para Android, iPhone, Windows e macOS
                  </p>
                </div>

                <div className="relative flex justify-center items-center">
                  {/* Ambient Glow Background */}
                  <div className="absolute w-[500px] h-[500px] bg-[#7c3aed]/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                  <div className="relative group flex justify-center w-full z-10 perspective-[1000px]">
                    {/* Celular Frame 3D */}
                    <div className="relative transform transition-all duration-700 hover:rotate-y-12 hover:rotate-x-6 hover:scale-105">
                      
                      {/* Borda Exterior do Celular (Glassmorphism & Metálico) */}
                      <div className="relative border-[#2a2f42] border-[10px] rounded-[3rem] h-[600px] w-[280px] sm:w-[320px] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_2px_rgba(255,255,255,0.1)] bg-[#0A0D14] overflow-hidden flex flex-col pt-8 pb-6 px-5 group-hover:shadow-[0_30px_60px_rgba(124,58,237,0.3)] transition-all">
                        
                        {/* Notch (Ilha Dinâmica) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#2a2f42] rounded-b-2xl z-20 flex justify-center items-center">
                          <div className="w-12 h-1.5 bg-black/50 rounded-full"></div>
                        </div>

                        {/* Header / Logo */}
                        <div className="flex items-center gap-2 mb-6 mt-2 relative z-10">
                          <div className="bg-[#7c3aed] p-1.5 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-extrabold text-white tracking-widest text-sm shadow-[0_0_10px_rgba(255,255,255,0.2)]">QRUB</span>
                        </div>

                        {/* Subtítulo */}
                        <div className="text-center mb-6 mt-[-30px] relative z-10">
                          <p className="text-[#a1a1aa] text-[10px] uppercase font-black tracking-widest drop-shadow-md">Seu estudo hoje</p>
                        </div>

                        {/* Círculo de Progresso e Badge */}
                        <div className="flex justify-between items-center mb-8 relative z-10 px-2">
                          {/* Anel de Progresso */}
                          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#1e1e2c] shadow-[0_0_30px_rgba(124,58,237,0.2),inset_0_4px_10px_rgba(0,0,0,0.5)]">
                            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]">
                              <circle cx="48" cy="48" r="40" stroke="rgba(124,58,237,0.15)" strokeWidth="8" fill="none" />
                              <circle cx="48" cy="48" r="40" stroke="#a78bfa" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="75" strokeLinecap="round" className="opacity-90" />
                            </svg>
                            {/* Ponto brilhante do anel */}
                            <div className="absolute top-[8px] left-[48px] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                            <span className="text-2xl font-black text-white tracking-tighter drop-shadow-lg">72%</span>
                          </div>

                          {/* Badge de Sequência */}
                          <div className="flex flex-col items-center">
                            <div className="bg-gradient-to-r from-orange-500/20 to-rose-500/10 border border-orange-500/30 text-orange-300 text-[9px] uppercase font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(249,115,22,0.2)] backdrop-blur-sm">
                              <span className="text-orange-500 text-xs text-shadow-glow">🔥</span> Sequência: 5 dias
                            </div>
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full mb-6 mt-2"></div>

                        {/* Questão */}
                        <div className="mb-5 relative z-10">
                          <span className="text-[#a78bfa] text-[10px] font-black uppercase tracking-[0.2em] block mb-2 drop-shadow-md">Questão do Dia</span>
                          <p className="text-white text-[12px] font-medium leading-relaxed drop-shadow-sm">Qual marcador indica imunidade por vacinação contra Hepatite B?</p>
                        </div>

                        {/* Alternativas */}
                        <div className="grid grid-cols-2 gap-2.5 mb-6 relative z-10 w-full">
                          {['A) HBsAg', 'B) Anti-HBc', 'C) HBeAg'].map(opt => (
                            <div key={opt} className="bg-[#181824] border border-white/5 text-[#a1a1aa] text-[11px] py-3.5 px-2 rounded-xl text-center shadow-inner hover:bg-white/5 hover:text-white transition-all cursor-crosshair">
                              {opt}
                            </div>
                          ))}
                          <div className="bg-[#7c3aed]/15 border-[1.5px] border-[#a78bfa] text-white text-[11px] font-bold py-3.5 px-2 rounded-xl text-center shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all flex flex-col justify-center">
                            D) Anti-HBs
                          </div>
                        </div>

                        {/* Botão de Ação */}
                        <div className="mt-auto relative z-10 w-full mb-2">
                          <button className="w-full bg-gradient-to-tr from-[#6d28d9] to-[#9333ea] text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-2xl shadow-[0_10px_30px_rgba(124,58,237,0.5)] hover:scale-[1.03] transition-transform active:scale-95">
                            Continuar Estudo
                          </button>
                        </div>

                        {/* Reflexo de Tela (Glass) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent w-[150%] h-[150%] -rotate-45 pointer-events-none opacity-50 mix-blend-overlay"></div>
                      </div>

                      {/* Botões LATERAIS do hardware do celular para ficar 100% realista */}
                      <div className="w-[3px] h-10 bg-[#1e2230] absolute -left-[13px] top-28 rounded-l-md shadow-md"></div>
                      <div className="w-[3px] h-14 bg-[#1e2230] absolute -left-[13px] top-44 rounded-l-md shadow-md"></div>
                      <div className="w-[3px] h-14 bg-[#1e2230] absolute -left-[13px] top-60 rounded-l-md shadow-md"></div>
                      <div className="w-[3px] h-20 bg-[#1e2230] absolute -right-[13px] top-40 rounded-r-md shadow-md"></div>

                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Section: Escolha seu QRUB */}
            <section className="py-24 px-8 bg-[#141b2b]">
              <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Escolha seu ecossistema</h2>
                <p className="text-slate-400">Ambientes especializados para diferentes trajetórias de sucesso.</p>
              </div>
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Card 1: Concurso */}
                <div className="bg-[#2e3545]/40 backdrop-blur-2xl p-10 rounded-2xl border border-white/5 hover:border-[#7c3aed]/30 transition-all group relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-3xl group-hover:bg-[#7c3aed]/20 transition-colors"></div>
                  <div className="mb-8 w-16 h-16 rounded-2xl bg-[#7c3aed] flex items-center justify-center text-white shadow-lg">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">QRUB Concurso</h3>
                  <p className="text-[#ccc3d8] text-lg leading-relaxed mb-10">
                    Ambiente focado em preparação estratégica e desempenho máximo para provas de alto nível.
                  </p>
                  <button 
                    onClick={() => setActiveTab('Planos')}
                    className="w-full py-4 bg-[#2e3545] rounded-xl text-white font-bold text-lg group-hover:bg-[#7c3aed] group-hover:text-white transition-all font-sans uppercase italic tracking-widest"
                  >
                    Escolher Plano
                  </button>
                </div>
                {/* Card 2: Saúde */}
                <div className="bg-[#2e3545]/40 backdrop-blur-2xl p-10 rounded-2xl border border-white/5 hover:border-[#d3bbff]/30 transition-all group relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#d3bbff]/10 rounded-full blur-3xl group-hover:bg-[#d3bbff]/20 transition-colors"></div>
                  <div className="mb-8 w-16 h-16 rounded-2xl bg-[#784fc3] flex items-center justify-center text-white shadow-lg">
                    <HeartPulse className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">QRUB Saúde</h3>
                  <p className="text-[#ccc3d8] text-lg leading-relaxed mb-10">
                    Ambiente voltado para estudantes e profissionais da saúde com conteúdos e revisões dinâmicas.
                  </p>
                  <button 
                    onClick={() => setActiveTab('Planos')}
                    className="w-full py-4 bg-[#2e3545] rounded-xl text-white font-bold text-lg group-hover:bg-[#d3bbff] group-hover:text-[#3f0689] transition-all font-sans uppercase italic tracking-widest"
                  >
                    Escolher Plano
                  </button>
                </div>
              </div>
            </section>

            {/* 4. Section: Multiplataforma */}
            <section className="py-24 px-8 bg-[#0c1322]">
              <div className="max-w-7xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-16 text-center">
                  Onde você estiver, o QRUB está com você.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full max-w-5xl">
                  <PlatformCard icon={<Smartphone className="w-12 h-12" />} label="Android" />
                  <PlatformCard icon={<Apple className="w-12 h-12" />} label="iPhone" />
                  <PlatformCard icon={<Layout className="w-12 h-12" />} label="Windows" />
                  <PlatformCard icon={<Monitor className="w-12 h-12" />} label="macOS" />
                  <PlatformCard icon={<Globe className="w-12 h-12" />} label="Browser" className="col-span-2 md:col-span-1" />
                </div>
              </div>
            </section>

            {/* 5. Section: Como Instalar */}
            <section className="py-24 px-8 bg-[#141b2b]">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                  <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2 uppercase italic">Simples de configurar</h2>
                  <p className="text-slate-400">Instale em segundos e comece sua jornada.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <InstallStep 
                    number="01" 
                    icon={<Smartphone className="text-[#7c3aed]" />} 
                    title="Android" 
                    desc='Acesse o portal e escolha "Instalar como Web App" ou baixe o APK direto para ter acesso nativo offline.' 
                  />
                  <InstallStep 
                    number="02" 
                    icon={<Smartphone className="text-[#7c3aed]" />} 
                    title="iPhone (iOS)" 
                    desc='Abra o Safari → Toque em Compartilhar → Selecione Adicionar à Tela de Início.' 
                  />
                  <InstallStep 
                    number="03" 
                    icon={<Laptop2 className="text-[#7c3aed]" />} 
                    title="Desktop" 
                    desc="Acesse via Chrome ou Edge e clique no ícone de instalação na barra de endereços para usar como App independente." 
                  />
                </div>
              </div>
            </section>

            {/* 6. Section: Benefícios */}
            <section className="py-24 px-8">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                <div className="lg:col-span-2 flex flex-col justify-center pr-8">
                  <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">Por que escolher o QRUB para seus estudos?</h2>
                  <p className="text-slate-400 text-lg mb-8">Nossa interface foi desenhada para eliminar distrações e maximizar a retenção cognitiva.</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-[#7c3aed] rounded-full"></div>
                    <span className="text-[#7c3aed] font-bold tracking-widest uppercase text-xs">Exclusividade QRUB</span>
                  </div>
                </div>
                <BenefitCard icon={<Zap />} title="Acesso Rápido" desc="Carregamento instantâneo de módulos e questões sem espera." />
                <BenefitCard icon={<Sparkles />} title="Experiência Fluida" desc="Transições suaves que mantêm seu cérebro no estado de Flow." />
                <BenefitCard icon={<Target />} title="Foco Total" desc="Zero anúncios ou elementos visuais irrelevantes durante o estudo." />
                <BenefitCard icon={<LayoutGrid />} title="Interface Otimizada" desc="Layout adaptável para qualquer tamanho de tela sem perda de recursos." />
                <BenefitCard icon={<RefreshCw />} title="Sincronia Real" desc="Comece no celular, termine no PC. Seus dados sempre atualizados." />
                <BenefitCard icon={<ShieldCheck />} title="Modo Offline" desc="Continue estudando mesmo sem conexão com a internet através do app." />
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'Metodologia' && (
          <motion.div
            key="metodologia"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 pb-24 px-8 max-w-7xl mx-auto"
          >
            <h2 className="text-6xl font-black text-white italic tracking-tighter mb-12 uppercase">
              Metodologia <span className="text-[#7c3aed]">Cognitiva</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="p-8 rounded-[32px] bg-[#1e2230] border border-white/5">
                  <h3 className="text-2xl font-bold text-white mb-4">Aprendizado Ativo</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Nossa metodologia foca na recuperação ativa de informações. Ao invés de apenas ler, você é desafiado constantemente, o que fortalece as conexões neurais e a memória de longo prazo.
                  </p>
                </div>
                <div className="p-8 rounded-[32px] bg-[#1e2230] border border-white/5">
                  <h3 className="text-2xl font-bold text-white mb-4">Repetição Espaçada</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Utilizamos algoritmos de SRS (Spaced Repetition System) que identificam o momento exato em que você esqueceria um conteúdo, garantindo uma revisão eficiente e precisa.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#7c3aed]/20 blur-[100px] rounded-full"></div>
                <div className="relative p-12 bg-gradient-to-br from-[#7c3aed]/30 to-transparent border border-white/10 rounded-[40px] backdrop-blur-xl">
                  <blockquote className="text-3xl font-black italic text-white leading-tight mb-8">
                    "O QRUB não é apenas um banco de questões, é um acelerador de performance cognitiva desenhado para a elite."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#7c3aed]"></div>
                    <div>
                      <div className="font-bold text-white">Equipe de Design QRUB</div>
                      <div className="text-sm text-slate-500 uppercase font-black tracking-widest">Cognitive Strategy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Planos' && (
          <motion.div
            key="planos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 pb-24 px-4 sm:px-8 max-w-[1400px] mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter mb-4 uppercase">
              Escolha seu <span className="text-[#a78bfa]">Plano de Evolução</span>
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl mb-12">Estude com consistência e acelere sua aprovação com o método Qrub.</p>
            
            {/* Toggle Concurso vs Saude */}
            <div className="flex justify-center mb-16">
              <div className="bg-[#1e2230] p-1.5 rounded-full inline-flex border border-white/10 shadow-lg">
                <button
                  onClick={() => setActiveProduct('qrub_concurso')}
                  className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                    activeProduct === 'qrub_concurso' 
                      ? 'bg-[#7c3aed] text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Qrub Concurso
                </button>
                <button
                  onClick={() => setActiveProduct('qrub_saude')}
                  className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                    activeProduct === 'qrub_saude' 
                      ? 'bg-[#10b981] text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Qrub Saúde
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 xl:gap-6 text-left items-start">
              
              {/* CARD 1 - FREEMIUM */}
              <div className={`bg-[#1e2230] border border-white/5 p-8 rounded-3xl transition-all flex flex-col h-full ${activeProduct === 'qrub_saude' ? 'hover:border-[#10b981]/30' : 'hover:border-[#7c3aed]/30'}`}>
                <div>
                  <h3 className="text-2xl font-black italic text-white uppercase mb-2">Free</h3>
                  <p className="text-sm text-slate-400 min-h-[40px] mb-4">Comece sem custo e evolua no seu ritmo.</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-sm font-bold text-slate-500">R$</span>
                    <span className="text-4xl font-black text-white tracking-tighter">0,00</span>
                    <span className="text-sm font-bold text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-slate-300 font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#10b981]' : 'text-[#7c3aed]'}`} /> 15 questões por dia
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#10b981]' : 'text-[#7c3aed]'}`} /> Acesso ao banco de questões
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#10b981]' : 'text-[#7c3aed]'}`} /> Experimente a plataforma
                    </li>
                    <li className="flex items-start gap-2 text-slate-500 opacity-60">
                      <span className="w-4 h-4 border border-slate-500 rounded-full shrink-0 flex items-center justify-center text-[10px]">&times;</span> Sem revisão espaçada
                    </li>
                    <li className="flex items-start gap-2 text-slate-500 opacity-60">
                      <span className="w-4 h-4 border border-slate-500 rounded-full shrink-0 flex items-center justify-center text-[10px]">&times;</span> Sem caderno de erros
                    </li>
                    <li className="flex items-start gap-2 text-slate-500 opacity-60">
                      <span className="w-4 h-4 border border-slate-500 rounded-full shrink-0 flex items-center justify-center text-[10px]">&times;</span> Sem Dr. Qrub
                    </li>
                    <li className="flex items-start gap-2 text-slate-500 opacity-60">
                      <span className="w-4 h-4 border border-slate-500 rounded-full shrink-0 flex items-center justify-center text-[10px]">&times;</span> Sem estatísticas completas
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (isAuthenticated) {
                      setCheckoutConfig({ isOpen: true, plan: 'free', product: activeProduct })
                    } else {
                      setPendingPlan('free', activeProduct)
                      setIsAuthOpen(true)
                    }
                  }}
                  className={`mt-auto w-full py-4 bg-white/5 rounded-xl text-white font-bold uppercase text-xs tracking-widest transition-all ${activeProduct === 'qrub_saude' ? 'hover:bg-[#10b981]' : 'hover:bg-[#7c3aed]'}`}
                >
                  Assinar Agora
                </button>
              </div>

              {/* CARD 2 - MENSAL */}
              <div className={`bg-[#242938] border border-white/10 p-8 rounded-3xl transition-all flex flex-col h-full ${activeProduct === 'qrub_saude' ? 'hover:border-[#10b981]/50' : 'hover:border-[#7c3aed]/50'}`}>
                <div>
                  <h3 className="text-2xl font-black italic text-white uppercase mb-2">Mensal</h3>
                  <p className="text-sm text-slate-400 min-h-[40px] mb-4">Flexibilidade total para começar agora.</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className={`text-sm font-bold ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`}>R$</span>
                    <span className="text-4xl font-black text-white tracking-tighter">29,99</span>
                    <span className="text-sm font-bold text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Questões ilimitadas
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Revisão espaçada
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Caderno de erros auto
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Dr. Qrub (mentor estratégico)
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Estatísticas completas
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Filtros avançados
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (isAuthenticated) {
                      setCheckoutConfig({ isOpen: true, plan: 'mensal', product: activeProduct })
                    } else {
                      setPendingPlan('mensal', activeProduct)
                      setIsAuthOpen(true)
                    }
                  }}
                  className={`mt-auto w-full py-4 bg-[#2e3545] border border-white/5 rounded-xl text-white font-bold uppercase text-xs tracking-widest transition-all ${activeProduct === 'qrub_saude' ? 'hover:border-[#10b981]' : 'hover:border-[#7c3aed]'}`}
                >
                  Assinar agora
                </button>
              </div>

              {/* CARD 3 - TRIMESTRAL */}
              <div className={`bg-[#242938] border p-8 rounded-3xl relative transition-all flex flex-col h-full ${activeProduct === 'qrub_saude' ? 'border-[#10b981]/30 hover:border-[#10b981]' : 'border-[#7c3aed]/30 hover:border-[#7c3aed]'}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Econômico
                </div>
                <div>
                  <h3 className="text-2xl font-black italic text-white uppercase mb-2">Trimestral</h3>
                  <p className="text-sm text-slate-400 min-h-[40px] mb-4">Compromisso com resultado.</p>
                  <div className="flex flex-col mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-sm font-bold ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`}>R$</span>
                      <span className="text-4xl font-black text-white tracking-tighter">79,99</span>
                      <span className="text-sm font-bold text-slate-500">/3m</span>
                    </div>
                    <span className={`text-xs font-bold mt-1 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`}>equivalente ~R$ 26,66/m</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Tudo do plano mensal
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Melhor custo-benefício
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (isAuthenticated) {
                      setCheckoutConfig({ isOpen: true, plan: 'trimestral', product: activeProduct })
                    } else {
                      setPendingPlan('trimestral', activeProduct)
                      setIsAuthOpen(true)
                    }
                  }}
                  className={`mt-auto w-full py-4 border rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                    activeProduct === 'qrub_saude'
                      ? 'bg-[#10b981]/20 border-[#10b981]/50 text-[#6ee7b7] hover:bg-[#10b981] hover:text-white'
                      : 'bg-[#7c3aed]/20 border-[#7c3aed]/50 text-[#d2bbff] hover:bg-[#7c3aed] hover:text-white'
                  }`}
                >
                  Assinar Agora
                </button>
              </div>

              {/* CARD 4 - SEMESTRAL (RECOMENDADO) */}
              <div className={`bg-gradient-to-b p-8 rounded-3xl relative p-8 shadow-[0_0_40px_rgba(124,58,237,0.3)] transform scale-105 z-10 flex flex-col h-full border ${
                activeProduct === 'qrub_saude' 
                  ? 'from-[#10b981] to-[#047857] shadow-[0_0_40px_rgba(16,185,129,0.3)] border-[#6ee7b7]/50' 
                  : 'from-[#7c3aed] to-[#4c1d95] shadow-[0_0_40px_rgba(124,58,237,0.3)] border-[#a78bfa]/50'
              }`}>
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl ${
                  activeProduct === 'qrub_saude' ? 'text-[#047857]' : 'text-[#4c1d95]'
                }`}>
                  Mais escolhido
                </div>
                <div>
                  <div className="flex mb-4 text-yellow-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black italic text-white uppercase mb-2">Semestral</h3>
                  <p className="text-sm text-white/80 min-h-[40px] mb-4">O plano de quem leva a aprovação a sério.</p>
                  <div className="flex flex-col mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-white/70">R$</span>
                      <span className="text-5xl font-black text-white tracking-tighter">159,99</span>
                      <span className="text-sm font-bold text-white/70">/6m</span>
                    </div>
                    <span className="text-xs font-black text-yellow-300 mt-1">equivalente ~R$ 26,66/m</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" /> Tudo do plano insano
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" /> Economia maior
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" /> Ideal para ciclos de estudo
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (isAuthenticated) {
                      setCheckoutConfig({ isOpen: true, plan: 'semestral', product: activeProduct })
                    } else {
                      setPendingPlan('semestral', activeProduct)
                      setIsAuthOpen(true)
                    }
                  }}
                  className={`mt-auto w-full py-4 bg-white rounded-xl font-black uppercase text-xs tracking-widest hover:scale-95 transition-all shadow-lg ${
                    activeProduct === 'qrub_saude' ? 'text-[#10b981]' : 'text-[#7c3aed]'
                  }`}
                >
                  Assinar Agora
                </button>
              </div>

              {/* CARD 5 - ANUAL */}
              <div className={`bg-[#242938] border p-8 rounded-3xl relative hover:bg-[#2c3244] transition-all flex flex-col h-full overflow-hidden ${
                activeProduct === 'qrub_saude' ? 'border-[#34d399]/50' : 'border-[#a78bfa]/50'
              }`}>
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] pointer-events-none ${
                  activeProduct === 'qrub_saude' ? 'bg-[#34d399]/10' : 'bg-[#a78bfa]/10'
                }`}></div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Melhor valor
                </div>
                <div>
                  <h3 className={`text-2xl font-black italic uppercase mb-2 ${activeProduct === 'qrub_saude' ? 'text-[#6ee7b7]' : 'text-[#d2bbff]'}`}>Anual</h3>
                  <p className="text-sm text-slate-400 min-h-[40px] mb-4">Um ano focado na sua aprovação.</p>
                  <div className="flex flex-col mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-sm font-bold ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`}>R$</span>
                      <span className="text-4xl font-black text-white tracking-tighter">319,99</span>
                      <span className="text-sm font-bold text-slate-500">/ano</span>
                    </div>
                    <span className={`text-xs font-bold mt-1 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`}>equivalente ~R$ 26,66/m</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Tudo liberado por 12 meses
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Máxima economia
                    </li>
                    <li className="flex items-start gap-2 text-white font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeProduct === 'qrub_saude' ? 'text-[#34d399]' : 'text-[#a78bfa]'}`} /> Para quem quer aprovação sem pausa
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (isAuthenticated) {
                      setCheckoutConfig({ isOpen: true, plan: 'anual', product: activeProduct })
                    } else {
                      setPendingPlan('anual', activeProduct)
                      setIsAuthOpen(true)
                    }
                  }}
                  className="mt-auto w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all shadow-lg"
                >
                  Assinar Agora
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'Sobre' && (
          <motion.div
            key="sobre"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 pb-24 px-8 max-w-7xl mx-auto text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-6xl font-black text-white italic tracking-tighter mb-8 uppercase">
                Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] to-white">e Tecnologia</span>
              </h2>
              <p className="text-slate-400 text-2xl leading-relaxed mb-12">
                O QRUB nasceu de uma frustração: plataformas de estudo lentas e complexas. Criamos um ecossistema que respeita seu tempo e potencializa seu aprendizado através de design de elite e engenharia de ponta.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-black text-[#7c3aed] mb-2">200k+</div>
                  <div className="text-xs text-slate-500 uppercase font-black tracking-widest">Questões</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#7c3aed] mb-2">50k+</div>
                  <div className="text-xs text-slate-500 uppercase font-black tracking-widest">Usuários</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#7c3aed] mb-2">98%</div>
                  <div className="text-xs text-slate-500 uppercase font-black tracking-widest">Aprovação</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#7c3aed] mb-2">24/7</div>
                  <div className="text-xs text-slate-500 uppercase font-black tracking-widest">Mentoria IA</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Contato' && (
          <motion.div
            key="contato"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pt-32 pb-24 px-8 max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-left">
                <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase">
                  Fale com o <span className="text-[#7c3aed]">Time</span>
                </h2>
                <p className="text-slate-400 text-xl leading-relaxed">
                  Estamos prontos para tirar suas dúvidas e ajudar você a alcançar o próximo nível na sua carreira médica ou em concursos.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#1e2230] border border-white/5 group hover:border-[#7c3aed]/30 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">WhatsApp Comercial</div>
                      <a href="https://wa.me/5583998689365" target="_blank" className="text-2xl font-black text-white hover:text-[#7c3aed] transition-colors">
                        (83) 99868-9365
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#1e2230] border border-white/5 group hover:border-white/20 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">E-mail de Suporte</div>
                      <a href="mailto:Qrubcomercial@gmail.com" className="text-2xl font-black text-white hover:text-slate-300 transition-colors">
                        Qrubcomercial@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-[#7c3aed]/20 blur-[120px] rounded-full"></div>
                <div className="relative p-1 bg-gradient-to-br from-[#7c3aed] to-[#d2bbff] rounded-[40px] overflow-hidden">
                  <div className="bg-[#0c1322] p-10 rounded-[39px]">
                    <h3 className="text-2xl font-bold text-white mb-6">Envie uma mensagem rápida</h3>
                    <div className="space-y-4">
                      <div className="bg-[#1e2230] p-4 rounded-xl border border-white/5 text-slate-500 text-sm italic">
                        Clique em um dos canais ao lado para ser atendido instantaneamente.
                      </div>
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/5583998689365" 
                        alt="WhatsApp QR Code"
                        className="mx-auto rounded-2xl w-40 h-40 opacity-80 hover:opacity-100 transition-opacity"
                      />
                      <p className="text-xs text-slate-500 font-medium">Escaneie para falar no WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Section: Contato */}
      <section className="py-24 px-8 bg-[#070e1d]">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#7c3aed]/20 to-[#191f2f] border border-[#7c3aed]/10 p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter">
            Ficou com dúvida? <br/><span className="text-[#7c3aed]">Fale com a gente.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="flex items-center gap-3 px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-xl font-bold hover:bg-[#25D366] hover:text-white transition-all scale-100 hover:scale-105 active:scale-95" href="https://wa.me/5583998689365" target="_blank">
              <MessageCircle className="w-5 h-5 fill-current" />
              WhatsApp
            </a>
            <a className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all scale-100 hover:scale-105 active:scale-95" href="https://instagram.com/Qrubmedicina" target="_blank">
              <Instagram className="w-5 h-5" />
              @Qrubmedicina
            </a>
            <a className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-black transition-all scale-100 hover:scale-105 active:scale-95" href="https://tiktok.com/@Qrub.App" target="_blank">
              <Music className="w-5 h-5" />
              Qrub.App
            </a>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="w-full py-16 px-8 border-t border-white/5 bg-[#020617]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-white mb-6">QRUB</div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs font-sans">
              © 2024 QRUB. A Luminária Cognitiva para estudos de alta performance. Transformando o potencial humano através do design e tecnologia.
            </p>
          </div>
          <FooterColumn title="Plataforma" links={["QRUB Concurso", "QRUB Saúde", "Novidades"]} />
          <FooterColumn title="Suporte" links={["Central de Ajuda", "Política de Privacidade", "Termos de Serviço"]} />
          <FooterColumn title="Institucional" links={["Carreira", "Contato", "Blog"]} />
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <Target className="w-5 h-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
            <Play className="w-5 h-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 text-slate-600 hover:text-primary cursor-pointer transition-colors" />
          </div>
          <p className="text-xs text-slate-700 font-sans">Feito com foco e precisão pela equipe QRUB.</p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        preventRedirect={!!getPendingPlan()}
      />
      <CheckoutModal 
        isOpen={checkoutConfig.isOpen} 
        onClose={() => setCheckoutConfig({ ...checkoutConfig, isOpen: false })} 
        plan={checkoutConfig.plan}
        product={checkoutConfig.product}
      />
    </div>
  )
}

function PlatformCard({ icon, label, className = "" }: any) {
  return (
    <div className={`flex flex-col items-center gap-4 p-8 bg-[#2e3545]/40 backdrop-blur-xl rounded-2xl border border-white/5 hover:bg-[#323949] transition-colors ${className}`}>
      <div className="text-[#7c3aed]">{icon}</div>
      <span className="font-bold text-slate-300">{label}</span>
    </div>
  )
}

function InstallStep({ number, icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl bg-[#191f2f] border border-white/5 relative group">
      <div className="text-6xl font-black text-white/5 absolute right-4 top-4 select-none">{number}</div>
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>
      <p className="text-[#ccc3d8] leading-relaxed font-sans">
        {desc}
      </p>
    </div>
  )
}

function BenefitCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl bg-[#191f2f] hover:translate-y-[-4px] transition-all border border-white/5">
      <div className="text-[#7c3aed] mb-6">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-sm text-[#ccc3d8] leading-relaxed font-sans">{desc}</p>
    </div>
  )
}

function FooterColumn({ title, links }: any) {
  return (
    <div>
      <h4 className="text-white font-bold mb-6">{title}</h4>
      <ul className="space-y-4">
        {links.map((link: string) => (
          <li key={link}>
            <a className="text-sm text-slate-500 hover:text-violet-300 transition-colors font-sans" href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}