import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PlanLevel } from './use-auth'

export type SaleStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Sale {
    id: string
    userId: string
    userName: string
    userEmail: string
    plan: PlanLevel
    amount: number
    status: SaleStatus
    date: string
    proofUrl?: string // Mock URL for now
}

interface SalesState {
    sales: Sale[]
    addSale: (sale: Omit<Sale, 'id' | 'status' | 'date'>) => void
    approveSale: (id: string) => void
    rejectSale: (id: string) => void
}

export const useSales = create<SalesState>()(
    persist(
        (set) => ({
            sales: [],
            addSale: (saleData) => set((state) => ({
                sales: [
                    {
                        ...saleData,
                        id: Math.random().toString(36).substr(2, 9),
                        status: 'PENDING',
                        date: new Date().toISOString()
                    },
                    ...state.sales
                ]
            })),
            approveSale: (id) => set((state) => ({
                sales: state.sales.map(s =>
                    s.id === id ? { ...s, status: 'APPROVED' } : s
                )
            })),
            rejectSale: (id) => set((state) => ({
                sales: state.sales.map(s =>
                    s.id === id ? { ...s, status: 'REJECTED' } : s
                )
            }))
        }),
        {
            name: 'qrub-sales-storage'
        }
    )
)
