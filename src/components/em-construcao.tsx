import { Hexagon, Wrench, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function EmConstrucao({ title, backHref = '/dashboard' }: { title: string, backHref?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-700">
            <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150" />
                <div className="w-24 h-24 rounded-[32px] bg-[#111827] border-2 border-emerald-500/20 flex items-center justify-center relative z-10 shadow-2xl">
                    <Wrench className="w-12 h-12 text-emerald-500" />
                </div>
            </div>

            <div className="space-y-4 max-w-md relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    Em Desenvolvimento
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-[#111827] dark:text-white">
                    {title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Estamos preparando esta área com recursos exclusivos para impulsionar seus estudos. Fique atento às próximas atualizações!
                </p>
            </div>

            <Link href={backHref} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 relative z-10">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Início
            </Link>
        </div>
    )
}
