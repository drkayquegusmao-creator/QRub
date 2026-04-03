import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { supabase } from '@/lib/supabase'

// Official flow statuses
export type SubscriptionStatus =
  | "active"
  | "pending_payment"
  | "expired"
  | "payment_failed"
  | "canceled";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data, action } = body

        // Only interested in payment completions
        if (type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
            const paymentId = data?.id || body.data?.id
            
            if (!paymentId) {
                return NextResponse.json({ success: true })
            }

            const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN
            if (!accessToken) {
                console.error('❌ MP Access Token missing in Webhook')
                return NextResponse.json({ success: true })
            }

            const client = new MercadoPagoConfig({ accessToken })
            const payment = new Payment(client)
            
            const paymentData = await payment.get({ id: paymentId })

            if (paymentData.status === 'approved') {
                const { user_id, product, plan } = paymentData.metadata
                const price = paymentData.transaction_amount
                
                console.log(`✅ Payment Approved! Activating ${plan} for ${product} (User: ${user_id})`)

                // Call the RPC function to handle the official subscription flow logic
                const { error } = await supabase.rpc('handle_user_subscription', {
                    p_user_id: user_id,
                    p_product: product,
                    p_plan: plan,
                    p_status: 'active',
                    p_payment_method: paymentData.payment_method_id,
                    p_price: price,
                    p_mp_payment_id: paymentId.toString()
                })

                if (error) {
                    console.error('❌ Error updating subscription via RPC:', error)
                    throw error
                }
            } else {
                console.log(`ℹ️ Payment status update: ${paymentData.status} for ID ${paymentId}`)
            }
        }

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error: any) {
        console.error('❌ Webhook error:', error)
        return NextResponse.json({ success: false }, { status: 200 })
    }
}
