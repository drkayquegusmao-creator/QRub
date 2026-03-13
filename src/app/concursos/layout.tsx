"use client"

import DashboardLayout from '@/app/dashboard/layout'

export default function ConcursoLayout({ children }: { children: React.ReactNode }) {
  // We reuse the dashboard layout but we can inject specific Concursos logic here if needed
  return <DashboardLayout>{children}</DashboardLayout>
}
