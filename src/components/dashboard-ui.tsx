import React from 'react'

export function SectionHeader({ title, subtitle, icon }: { title: string, subtitle: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                {icon}
            </div>
            <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">{title}</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{subtitle}</p>
            </div>
        </div>
    )
}

export function Divider() {
    return <div className="h-px w-full bg-border/40" />
}
