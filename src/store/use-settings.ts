import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PlanPrices {
    premium: number
    insano: number
}

interface PixConfig {
    key: string
    beneficiary: string
    institution: string
}

interface SettingsState {
    prices: PlanPrices
    pix: PixConfig
    updatePrices: (prices: Partial<PlanPrices>) => void
    updatePix: (pix: Partial<PixConfig>) => void
    coupons: string[]
    addCoupon: (code: string) => void
    removeCoupon: (code: string) => void
}

export const useSettings = create<SettingsState>()(
    persist(
        (set) => ({
            prices: {
                premium: 29.90,
                insano: 49.90
            },
            pix: {
                key: '',
                beneficiary: '',
                institution: ''
            },
            coupons: [],
            updatePrices: (newPrices) => set((state) => ({
                prices: { ...state.prices, ...newPrices }
            })),
            updatePix: (newPix) => set((state) => ({
                pix: { ...state.pix, ...newPix }
            })),
            addCoupon: (code) => set((state) => ({
                coupons: [...state.coupons, code.toUpperCase()]
            })),
            removeCoupon: (code) => set((state) => ({
                coupons: state.coupons.filter(c => c !== code)
            }))
        }),
        {
            name: 'qrub-settings-storage'
        }
    )
)
