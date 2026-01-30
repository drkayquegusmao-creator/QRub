# 💳 Integração de Pagamento PIX - QRub

## 📋 Visão Geral

Este sistema implementa pagamentos via PIX usando o **Mercado Pago** como gateway de pagamento. Atualmente está em **modo de simulação** para desenvolvimento, mas está pronto para ser ativado em produção.

## 🎯 Funcionalidades Implementadas

- ✅ Modal de checkout com geração de PIX
- ✅ QR Code PIX automático
- ✅ Monitoramento em tempo real do status do pagamento
- ✅ Atualização automática do plano após aprovação
- ✅ API routes prontas para produção
- ✅ Webhook para receber notificações

## 🚀 Como Ativar em Produção

### 1. Criar Conta no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers
2. Crie uma conta ou faça login
3. Acesse "Suas integrações" → "Criar aplicação"
4. Anote suas credenciais:
   - **Access Token de Produção**
   - **Public Key de Produção**

### 2. Instalar SDK do Mercado Pago

```bash
npm install mercadopago
```

### 3. Configurar Variáveis de Ambiente

Crie/atualize o arquivo `.env.local`:

```env
# Mercado Pago Credentials
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_aqui
MERCADO_PAGO_PUBLIC_KEY=sua_public_key_aqui

# URL do seu site (para webhook)
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

### 4. Ativar Código de Produção

Nos arquivos abaixo, **descomente** o código de produção e **comente/remova** o código de simulação:

#### `/src/app/api/payments/create-pix/route.ts`

Remova o código de simulação (linhas marcadas com "SIMULAÇÃO") e descomente o código real do Mercado Pago.

#### `/src/app/api/payments/check/route.ts`

Remova o código de simulação e descomente a integração real.

#### `/src/app/api/payments/webhook/route.ts`

Descomente as funções `updateUserPlan` e `sendConfirmationEmail` e implemente a lógica com seu banco de dados.

### 5. Configurar Webhook no Mercado Pago

1. Acesse o painel do Mercado Pago → "Webhooks"
2. Configure a URL do webhook:
   ```
   https://seudominio.com/api/payments/webhook
   ```
3. Selecione os eventos:
   - `payment` (pagamentos)
   - `merchant_order` (pedidos)

### 6. Implementar Banco de Dados

Crie uma tabela para armazenar os pagamentos:

```sql
CREATE TABLE payments (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    plan VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 7. Testar em Modo Sandbox

Antes de ir para produção:

1. Use o **Access Token de Teste** do Mercado Pago
2. Use contas de teste fornecidas pelo Mercado Pago
3. Teste todo o fluxo:
   - Gerar PIX
   - Simular pagamento
   - Verificar webhook
   - Confirmar atualização do plano

## 📱 Fluxo de Pagamento

1. **Usuário clica em "Assinar Plano"**
2. **Sistema gera código PIX** via Mercado Pago
3. **Exibe QR Code e código copiável**
4. **Usuário paga via app do banco**
5. **Mercado Pago notifica via webhook**
6. **Sistema atualiza plano automaticamente**
7. **Usuário recebe confirmação**

## 🔐 Segurança

- ✅ Todas as transações são processadas pelo Mercado Pago
- ✅ Nenhum dado de cartão é armazenado no sistema
- ✅ Webhook valida a autenticidade das notificações
- ✅ Tokens nunca são expostos no front-end

## 💰 Preços Configurados

- **Premium**: R$ 29,90/mês
- **Insano**: R$ 129,90/mês

Para alterar os preços, edite em `/src/components/checkout-modal.tsx`

## 📊 Monitoramento

Você pode monitorar os pagamentos em:
- Painel do Mercado Pago (tempo real)
- Seu banco de dados (histórico)
- Logs da aplicação

## 🆘 Resolução de Problemas

### Pagamento não é aprovado automaticamente

- Verifique se o webhook está configurado corretamente
- Confirme que a URL do webhook está acessível publicamente
- Verifique os logs do Mercado Pago

### QR Code não aparece

- Verifique se o Access Token está correto
- Confirme que a conta do Mercado Pago está ativa
- Veja os logs da API em `/api/payments/create-pix`

### Plano não é atualizado

- Verifique se o webhook está recebendo notificações
- Confirme que a função `updateUserPlan` está implementada
- Veja os logs do webhook

## 📚 Documentação Útil

- [Mercado Pago - Documentação Oficial](https://www.mercadopago.com.br/developers/pt/docs)
- [SDK Node.js do Mercado Pago](https://github.com/mercadopago/sdk-nodejs)
- [Webhooks do Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks)
- [PIX - Guia Completo](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/pix)

## ✅ Checklist de Produção

- [ ] Criar conta no Mercado Pago
- [ ] Obter credenciais de produção
- [ ] Instalar SDK do Mercado Pago
- [ ] Configurar variáveis de ambiente
- [ ] Descomentar código de produção
- [ ] Implementar integração com banco de dados
- [ ] Configurar webhook no painel do Mercado Pago
- [ ] Testar em modo sandbox
- [ ] Testar webhooks
- [ ] Testar pagamento real
- [ ] Documentar processo interno
- [ ] Monitorar primeiros pagamentos

## 🎉 Pronto!

Após seguir todos os passos, seu sistema de pagamento PIX estará funcionando em produção! 🚀
