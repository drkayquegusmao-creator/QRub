import { NextRequest, NextResponse } from 'next/server'

// Webhook para receber notificações de pagamento do Mercado Pago
// Este endpoint deve ser configurado no painel do Mercado Pago

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Mercado Pago envia diferentes tipos de notificações
        // Documentação: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks

        const { type, data } = body

        if (type === 'payment') {
            const paymentId = data.id

            // IMPORTANTE: Em produção, consulte o pagamento no Mercado Pago para validar
            /*
            const { MercadoPagoConfig, Payment } = require('mercadopago');
            
            const client = new MercadoPagoConfig({ 
                accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
            });
            
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: paymentId });
            
            if (paymentData.status === 'approved') {
                // Atualizar plano do usuário no banco de dados
                const userId = paymentData.metadata.user_id;
                const plan = paymentData.metadata.plan;
                
                // Aqui você atualizaria o plano do usuário no seu banco de dados
                await updateUserPlan(userId, plan);
                
                // Enviar email de confirmação
                await sendConfirmationEmail(userId, plan);
            }
            */

            console.log('Payment notification received:', { type, paymentId })
        }

        // IMPORTANTE: Sempre retorne 200 para o Mercado Pago
        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error: any) {
        console.error('Webhook error:', error)
        // Retornar 200 mesmo com erro para não sobrecarregar o Mercado Pago com tentativas
        return NextResponse.json({ success: false }, { status: 200 })
    }
}

// Função auxiliar para atualizar plano do usuário (implementar com seu banco de dados)
async function updateUserPlan(userId: string, plan: string) {
    // Implementar lógica de atualização do plano no banco de dados
    console.log(`Updating user ${userId} to plan ${plan}`)
}

// Função auxiliar para enviar email (opcional)
async function sendConfirmationEmail(userId: string, plan: string) {
    // Implementar envio de email de confirmação
    console.log(`Sending confirmation email to user ${userId} for plan ${plan}`)
}
