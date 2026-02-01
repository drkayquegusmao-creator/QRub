"use client"
// Build Trigger: 2026-01-31 22:45 - PDF Upload RLS and Path Fix
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Shield, Zap, Globe, Instagram, Twitter, Linkedin, Facebook, Target } from 'lucide-react'
import { AuthModal } from '@/components/auth-modal'
import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/store/use-auth'
import { useSettings } from '@/store/use-settings'
import { useTheme } from 'next-themes'

export default function Home() {
  const { setTheme } = useTheme()
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  // const { prices } = useSettings()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    setTheme('light')
  }, [setTheme])

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isHydrated, isAuthenticated, router])

  if (!isHydrated) return null

  // plans variable removed


  return (
    <div className="min-h-screen relative overflow-hidden bg-background selection:bg-primary/30">
      {/* Background Orbs */}
      <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 overflow-hidden rounded-2xl shadow-2xl border border-white/10 ring-2 ring-primary/20">
            <Image src="/qrub_premium_logo_3d.jpg" alt="QRub Premium Logo" fill className="object-cover" />
          </div>
          <span className="text-3xl font-black tracking-tighter uppercase italic">QRub</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            {/* <a href="#planos" className="hover:text-primary transition-colors">Planos</a> */}
            <a href="#recursos" className="hover:text-primary transition-colors">Recursos</a>
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
          </div>
          <Link
            href="/auth"
            className="px-6 py-2.5 rounded-full border border-primary/20 font-bold hover:bg-primary/5 transition-all text-sm uppercase tracking-wider bg-card"
          >
            Entrar
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-black uppercase tracking-widest mx-auto md:mx-0"
          >
            <Sparkles className="w-4 h-4" />
            Nova Geração de Estudos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter"
          >
            Sua Aprovação <br />
            <span className="royal-gradient-text">Começa Aqui.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto md:mx-0"
          >
            A plataforma SaaS definitiva para estudantes de alta performance.
            Questões filtradas, simulados inteligentes e uma interface focada no que importa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-4"
          >
            <button
              onClick={() => setIsAuthOpen(true)}
              className="group relative px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-sm soft-shadow overflow-hidden transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 royal-gradient"
            >
              Começar Agora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <a
              href="#planos"
              className="px-7 py-3.5 rounded-xl border border-border font-bold text-sm hover:bg-muted/50 transition-all bg-card"
            >
              Ver Planos
            </a> */}
          </motion.div>


        </div>

        <div className="flex-1 relative hidden lg:flex items-center justify-center min-h-[600px]">
          {/* Intense Ambient Glow */}
          <div className="absolute inset-0 bg-primary/25 blur-[150px] rounded-full animate-pulse" />

          <div className="relative w-full h-full flex items-center justify-center">
            {/* Rotating Tech Orbits */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute z-0 w-[85%] aspect-square border-2 border-primary/10 rounded-full border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute z-0 w-[95%] aspect-square border border-primary/5 rounded-full"
            />

            {/* Neuro-Data Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4
                }}
                className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full blur-[1px]"
                style={{
                  top: `${15 + i * 12}%`,
                  left: `${10 + (i % 3) * 25}%`,
                  opacity: 0.6 // Locked opacity
                }}
              />
            ))}

            {/* The Main Premium Logo Piece - PERMANENTLY VISIBLE */}
            <motion.div
              style={{ opacity: 1 }}
              animate={{
                opacity: 1, // Constant loop visibility
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute z-20 w-[70%] aspect-square rounded-full overflow-hidden shadow-[0_0_120px_rgba(109,40,217,0.8)] border-4 border-white/20 ring-4 ring-primary/20"
            >
              <Image src="/qrub_premium_logo_3d.jpg" alt="QRub 3D Core" fill className="object-cover scale-110" priority />
            </motion.div>

            <motion.div
              animate={{
                scale: [0.99, 1.01, 0.99]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 w-full h-full grayscale-[0.3] contrast-[1.2]"
              style={{
                mixBlendMode: 'screen',
                opacity: 0.5 // Locked base opacity
              }}
            >
              <Image
                src="/qrub_3d_gladiator_ultra.png"
                alt="QRub Guardian"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

          </div>
        </div>
      </main>

      {/* Pricing Section */}
      {/* Pricing Section (Hidden for Free Launch) */}
      {/* 
      <section id="planos" className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 md:px-12">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Escolha seu Destino</h2>
          <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Planos feitos para quem quer ser aprovado ontem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-8 rounded-[40px] border-2 transition-all hover:scale-[1.02] ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 royal-gradient text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Mais Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-card border border-border">
                  {plan.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{plan.limit}</span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm font-medium mb-8 leading-relaxed">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-black italic">{plan.price}</span>
                <span className="text-muted-foreground font-bold uppercase text-[10px]">/mês</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-bold opacity-80">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsAuthOpen(true)}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 ${plan.popular ? 'royal-gradient text-white' : 'bg-card border border-border hover:bg-muted'}`}
              >
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </section> 
      */}

      {/* Features Section */}
      <section id="recursos" className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12">
        <div className="bg-card/50 border border-border rounded-[40px] p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
                <Zap className="w-4 h-4" />
                Potencial Infinito
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Recursos que <br />
                <span className="royal-gradient-text italic">Aceleram Tudo.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Não é apenas um banco de questões. É um ecossistema projetado para quem não tem tempo a perder e busca a elite da formação técnica.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureItem
                icon={<Sparkles className="w-6 h-6" />}
                title="Agenda do Dr. QRub"
                desc="Um plano de estudos que se adapta aos seus erros em tempo real."
              />
              <FeatureItem
                icon={<Shield className="w-6 h-6" />}
                title="Padrão Revalida"
                desc="Questões e casos clínicos densos, focados no padrão das maiores bancas."
              />
              <FeatureItem
                icon={<Globe className="w-6 h-6" />}
                title="Multi-Plataforma"
                desc="Estude de qualquer lugar, com sincronização Master instantânea."
              />
              <FeatureItem
                icon={<Target className="w-6 h-6" />}
                title="Heatmap Elite"
                desc="Gráficos de calor e métricas de precisão por subespecialidade."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Institutional / About Section - High Fidelity 3D Integration */}
      <section id="sobre" className="relative z-10 w-full py-32 mb-16 overflow-hidden bg-background">
        {/* Seamless Purple Background to replace the dark 'black box' */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[180px] rounded-full opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            <div className="space-y-12">
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                  <Globe className="w-3.5 h-3.5 animate-spin-slow" />
                  Ecossistema QRub
                </div>
                <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-[#1A1033]">
                  DOMINANDO A <br />
                  <span className="royal-gradient-text italic">FRONTEIRA TÉCNICA.</span>
                </h2>
                <p className="text-[#4B5563] text-xl leading-relaxed font-semibold max-w-xl">
                  Não somos apenas um banco de questões. Somos a força bruta tecnológica que você precisa para aniquilar as barreiras do REVALIDA, INEP e ENAMED.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-base text-[#1A1033]">Neural Engine</h4>
                  </div>
                  <p className="text-sm text-[#64748B] font-bold leading-relaxed">Algoritmos de IA que identificam falhas cognitivas antes mesmo de você percebê-las.</p>
                </div>
                <div className="group space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-base text-[#1A1033]">Elite Standard</h4>
                  </div>
                  <p className="text-sm text-[#64748B] font-bold leading-relaxed">Conteúdo denso e revisado para garantir que nada escape à sua preparação.</p>
                </div>
              </div>

              <div className="relative group bg-primary/[0.03] border border-primary/10 p-10 rounded-[50px] backdrop-blur-xl hover:bg-primary/[0.05] transition-all duration-700">
                <div className="absolute top-0 right-10 -translate-y-1/2">
                  <div className="bg-primary px-4 py-2 rounded-full shadow-[0_0_30px_rgba(109,40,217,0.3)]">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-xl md:text-3xl font-black leading-relaxed text-[#1A1033] italic">
                  "O QRub transforma a incerteza em autoridade. Onde houver um exame, nós seremos a sua vantagem competitiva."
                </p>
                <Link href="/about" className="mt-10 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-primary hover:text-[#1A1033] transition-all group">
                  EXPLORAR JORNADA ELITE
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center">
              {/* Central Glow to merge the robot into the purple theme */}
              <div className="absolute inset-0 bg-primary/30 blur-[120px] rounded-full opacity-70" />

              <div className="relative w-full h-full flex items-center justify-center">
                {/* The Main Premium Logo Piece - SPHERICAL PERMANENT */}
                <motion.div
                  style={{ opacity: 1 }}
                  animate={{
                    opacity: 1, // Force persistent visibility
                    scale: [1, 1.08, 1],
                    y: [0, -30, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-30 w-[85%] aspect-square rounded-full overflow-hidden shadow-[0_0_150px_rgba(109,40,217,0.9)] border-8 border-white/10"
                >
                  <Image src="/qrub_premium_logo_3d.jpg" alt="QRub 3D Institutional" fill className="object-cover scale-110" priority />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Corporate Stats integration */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-32 p-12 bg-white/[0.03] border border-white/5 rounded-[60px] text-center backdrop-blur-md">
            {[
              { val: "50k+", label: "Questões Ativas" },
              { val: "10k+", label: "Estudantes Elite" },
              { val: "99%", label: "Precisão Neural" },
              { val: "24/7", label: "Suporte Master" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-4xl md:text-6xl font-black italic tracking-tighter royal-gradient-text">{stat.val}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Tech Focused Dark Aesthetic */}
      <footer className="relative z-10 border-t border-border bg-card/10 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="relative w-14 h-14 overflow-hidden rounded-2xl shadow-2xl border border-white/10 ring-2 ring-primary/20">
                <Image src="/qrub_premium_logo_3d.jpg" alt="QRub Premium Logo" fill className="object-cover" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">QRub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              A força tecnológica definitiva para sua aprovação. Inteligência artificial aplicada à medicina de alta performance.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-xl bg-card border border-border hover:bg-primary hover:text-white transition-all shadow-xl">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Plataforma</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Setup Neural</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Banco de Dados</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Simulados Elite</a></li>
              <li><Link href="/about" className="text-primary hover:underline">Sobre a EdTech</Link></li>
            </ul>
          </div>

          <div className="space-y-8 text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Suporte</h4>
            <ul className="space-y-5 text-sm font-bold text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Central Master</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Comunidade</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contatos Técnicos</a></li>
            </ul>
          </div>

          <div className="space-y-8 text-center md:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Novidades</h4>
            <p className="text-xs font-medium text-muted-foreground">Inscreva-se para insights exclusivos.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 bg-muted/50 border border-border rounded-xl px-5 py-4 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-inner"
              />
              <button className="bg-primary px-6 rounded-xl text-white hover:bg-primary-foreground hover:text-primary border border-primary transition-all shadow-2xl">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-border/50 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-[10px] font-black uppercase tracking-widest text-center md:text-left">© 2026 QRub Advanced Systems. Brazil.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos Gerais</a>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}

function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl hover:border-primary/50 transition-colors space-y-4 group">
      <div className="bg-primary/10 text-primary p-3 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-black uppercase tracking-tight text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}