"use client"

import { motion } from 'framer-motion'
import { Rocket, BrainCircuit, ArrowLeft, Hexagon, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#1A1033] text-white overflow-hidden selection:bg-purple-500/30">
            {/* Nav */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12 max-w-7xl mx-auto">
                <Link href="/dashboard" className="flex items-center gap-2 group">
                    <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Voltar</span>
                </Link>
                <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-all">
                    <div className="relative w-8 h-8 overflow-hidden rounded-lg border border-white/20">
                        <Image src="/logo-icon.jpg" alt="QRub" fill className="object-cover" />
                    </div>
                    <span className="text-xl font-black tracking-tighter uppercase italic">QRub</span>
                </Link>
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-32">

                {/* Intro QRub */}
                <section className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="p-4 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            <Rocket className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Quem é o QRub?</h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-medium"
                    >
                        <p>
                            O <span className="text-white font-bold">QRub</span> não é apenas mais um banco de questões; é uma <span className="text-purple-400 font-bold">Plataforma de Alta Performance</span> desenhada para quem não aceita nada menos que a aprovação. Com uma base sólida em áreas críticas como Medicina, Enfermagem, Direito e Fisioterapia, o QRub une tecnologia de ponta com o rigor acadêmico necessário para vencer as bancas mais difíceis do país.
                        </p>
                        <p>
                            Nascemos para resolver o caos dos estudos. No QRub, cada filtro é cirúrgico, cada simulado é uma batalha real e cada erro é transformado em conhecimento através de métricas detalhadas. Somos o ecossistema definitivo para o estudante que busca eficiência, clareza e resultados.
                        </p>
                    </motion.div>
                </section>

                {/* Intro Dr. QRub */}
                <section className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <BrainCircuit className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Quem é o Dr. QRub?</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-medium"
                    >
                        <p>
                            O <span className="text-emerald-400 font-bold">Dr. QRub</span> é o seu Mentor de Inteligência Artificial, treinado especificamente nos protocolos brasileiros (SUS, Sociedades Brasileiras e bibliografias padrão). Ele é o cérebro por trás do nosso <span className="text-orange-500 font-bold">Plano Insano</span>.
                        </p>
                        <p>
                            Diferente de uma IA genérica, o Dr. QRub entende o contexto das provas brasileiras, como o Revalida. Ele não apenas aponta o erro, mas analisa a sua linha de raciocínio, explica o &quot;porquê&quot; de cada alternativa e gerencia o seu Caderno de Erros através de algoritmos de repetição espaçada.
                        </p>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mt-8">
                            <p className="italic text-gray-400">
                                &quot;Quando você cansa, o Dr. QRub assume a estratégia, montando sua agenda diária e garantindo que você nunca estude o que já sabe, mas sim o que precisa para passar.&quot;
                            </p>
                        </div>
                    </motion.div>
                </section>

            </main>

            {/* Footer Simple */}
            <footer className="border-t border-white/10 bg-black/20 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/10 p-1.5 rounded-lg">
                            <Hexagon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">© 2026 QRub Saab</span>
                    </div>

                    <div className="flex gap-4">
                        {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                            <a key={i} href="#" className="hover:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}
