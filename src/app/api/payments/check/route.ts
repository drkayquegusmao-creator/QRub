import { NextRequest, NextResponse } from 'next/server'

// Simulação de banco de dados de pagamentos (em produção, use um banco real)
const mockPayments = new Map<string, { status: string, approvedAt?: number }>()

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const paymentId = searchParams.get('paymentId')

        if (!paymentId) {
            return NextResponse.json(
                { error: 'Payment ID não fornecido' },
                { status: 400 }
            )
        }

        // SIMULAÇÃO PARA DESENVOLVIMENTO
        // Em produção, você consultaria o status real no Mercado Pago:
        /*
        const { MercadoPagoConfig, Payment } = require('mercadopago');
        
        const client = new MercadoPagoConfig({ 
            accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
        });
        
        const payment = new Payment(client);
        const result = await payment.get({ id: paymentId });
        
        return NextResponse.json({
            status: result.status, // 'pending', 'approved', 'rejected', etc.
            status_detail: result.status_detail,
            payment_id: result.id
        });
        */

        // SIMULAÇÃO: Aprovar automaticamente após 10 segundos
        let paymentData = mockPayments.get(paymentId)

        if (!paymentData) {
            // Primeira verificação - criar registro pendente
            paymentData = {
                status: 'pending',
                approvedAt: Date.now() + 10000 // Aprovar em 10 segundos
            }
            mockPayments.set(paymentId, paymentData)
        }

        // Verificar se já passou o tempo de aprovação
        if (paymentData.status === 'pending' && paymentData.approvedAt && Date.now() >= paymentData.approvedAt) {
            paymentData.status = 'approved'
            mockPayments.set(paymentId, paymentData)
        }

        return NextResponse.json({
            status: paymentData.status,
            payment_id: paymentId
        })

    } catch (error: any) {
        console.error('Error checking payment:', error)
        return NextResponse.json(
            { error: 'Erro ao verificar pagamento' },
            { status: 500 }
        )
    }
}
