import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { amount, plan, product, userId, userEmail, userDoc } = body

        if (!amount || !plan || !product || !userId) {
            return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
        }

        const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

        // Se não tiver token configurado, retorna erro explicativo (ou mantém simulação se preferir)
        if (!accessToken || accessToken === 'seu_access_token_aqui') {
            console.warn('⚠️ Mercado Pago Access Token não configurado. Usando modo simulação.');
            // MODO SIMULAÇÃO (Fallback)
            const mockPaymentId = `PIX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const mockPixCode = `00020126580014br.gov.bcb.pix0136${mockPaymentId}520400005303986540${amount.toFixed(2)}5802BR5913QRub Platform6009SAO PAULO62070503***6304`
            // QR Code base64 genérico para teste
            const mockQrCodeBase64 = "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+"

            return NextResponse.json({
                payment_id: mockPaymentId,
                qr_code: mockPixCode,
                qr_code_base64: mockQrCodeBase64,
                status: 'pending',
                amount,
                plan,
                product,
                is_simulation: true
            })
        }

        // MODO PRODUÇÃO
        const client = new MercadoPagoConfig({ accessToken: accessToken });
        const payment = new Payment(client);

        const paymentData = {
            transaction_amount: Number(amount),
            description: `Assinatura QRub - Plano ${plan}`,
            payment_method_id: 'pix',
            payer: {
                email: userEmail || 'email@teste.com',
                first_name: 'Aluno',
                last_name: 'QRub',
                identification: {
                    type: 'CPF',
                    number: userDoc || '19119119100' // CPF genérico se não informado (MP requer CPF válido em prod)
                }
            },
            // Mercado Pago exige URL válida (https). Localhost falha. Usando URL placeholder para passar na validação em dev.
            notification_url: (process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost'))
                ? 'https://qrub.com.br/api/payments/webhook'
                : `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')}/api/payments/webhook`,
            metadata: {
                user_id: userId,
                plan: plan,
                product: product
            }
        };

        const result = await payment.create({ body: paymentData });

        return NextResponse.json({
            payment_id: result.id,
            qr_code: result.point_of_interaction?.transaction_data?.qr_code,
            qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
            ticket_url: result.point_of_interaction?.transaction_data?.ticket_url,
            status: result.status,
            amount,
            plan,
            product
        });

    } catch (error: any) {
        console.error('Error creating PIX payment:', error)
        return NextResponse.json(
            { error: error.message || 'Erro ao processar pagamento.' },
            { status: 500 }
        )
    }
}
