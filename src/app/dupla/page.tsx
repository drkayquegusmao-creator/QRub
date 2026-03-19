import DuplaModule from '@/components/dupla-module'

export const metadata = {
  title: 'QRub Dupla | Estudo Colaborativo',
  description: 'Estude lado a lado com seus colegas de concurso de forma síncrona.',
}

export default function DuplaPage() {
  return (
    <div className="min-h-screen bg-[#0B0616] pt-16">
      <DuplaModule />
    </div>
  )
}
