import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { amount, plan, product, userId, userEmail } = body

        if (!amount || !plan || !product || !userId) {
            return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
        }

        const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

        if (!accessToken) {
            return NextResponse.json({ error: 'Token não configurado' }, { status: 500 })
        }

        const client = new MercadoPagoConfig({ accessToken: accessToken });
        const preference = new Preference(client);

        // Get site URL with robust fallbacks
        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
        
        // Sanitize URL
        siteUrl = siteUrl.trim().replace(/\/$/, '');
        if (!siteUrl || !siteUrl.startsWith('http')) {
            siteUrl = 'https://q-rub.vercel.app';
        }

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: plan,
                        title: `Assinatura QRub - Plano ${plan}`,
                        unit_price: Number(amount),
                        quantity: 1,
                        currency_id: 'BRL'
                    }
                ],
                payer: {
                    email: userEmail || 'aluno@qrub.com.br'
                },
                notification_url: `${siteUrl}/api/payments/webhook`,
                back_urls: {
                    success: `${siteUrl}/dashboard`,
                    failure: `${siteUrl}/`,
                    pending: `${siteUrl}/dashboard`
                },
                auto_return: 'approved',
                metadata: {
                    user_id: userId,
                    plan: plan,
                    product: product
                }
            }
        });

        return NextResponse.json({ init_point: result.init_point });

    } catch (error: any) {
        console.error('Error creating Card preference:', error)
        return NextResponse.json(
            { error: error.message || 'Erro ao processar pagamento.' },
            { status: 500 }
        )
    }
}
