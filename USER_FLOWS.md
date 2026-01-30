# 🎯 Fluxo Completo de Usuários - QRub

## 📋 Tipos de Usuários

### 1. 👤 Usuário Novo (Sem Cadastro)
**Como funciona:**
- Acessa o site e clica em "ENTRAR"
- Digita **email** e **senha** (cria credenciais)
- Sistema detecta que não é email master
- Cria conta automaticamente com:
  - **Role**: `ALUNO`
  - **Plano**: `FREE`
  - **Perfil**: Incompleto

**Fluxo de acesso:**
```
Login → Onboarding (completar perfil) → Dashboard FREE
```

**O que o usuário FREE tem acesso:**
- ✅ 20 questões por dia (limite diário)
- ✅ Dashboard com estatísticas básicas
- ✅ Seleção de áreas e especialidades
- ✅ Quiz com questões do banco
- ⚠️ Limite de acesso (paywall após 20 questões)

### 2. 👑 Super Admin (4 Emails Master)

**Emails configurados:**
- `kayquegusmao@gmail.com`
- `kayquegusmao1@gmail.com`
- `kayquegusmao276@gmail.com`
- `kayquegusmao@icloud.com`

**Senha fixa:** `Kayque2009`

**Como funciona:**
- Acessa o site e clica em "ENTRAR"
- Digita um dos **emails master** e **senha** `Kayque2009`
- Sistema detecta que é master
- Cria/loga automaticamente com:
  - **Role**: `MASTER`
  - **Plano**: `INSANO`
  - **Perfil**: Completo (bypass onboarding)

**Fluxo de acesso:**
```
Login → Dashboard INSANO (acesso total)
```

**O que o MASTER tem acesso:**
- ✅ Questões ilimitadas
- ✅ Dashboard administrativo
- ✅ Painel Master (`/admin`)
- ✅ Gerenciamento de usuários
- ✅ Gerenciamento de questões
- ✅ Aprovação de pagamentos
- ✅ Configurações do sistema
- ✅ Acesso VIP a todos os recursos

---

## 💰 Sistema de Upgrade (FREE → PREMIUM/INSANO)

### Como o Usuário FREE Faz Upgrade?

#### Opção 1: Via Perfil do Usuário
1. Usuário clica no **próprio nome** no header
2. Modal de perfil abre
3. Sistema detecta plano FREE
4. Exibe botão **"FAZER UPGRADE"**
5. Clica no botão → Modal de checkout abre
6. Escolhe plano (PREMIUM ou INSANO)
7. Gera código PIX
8. Paga via PIX
9. Sistema atualiza plano automaticamente

#### Opção 2: Via Paywall (Ao atingir limite)
1. Usuário FREE responde 20 questões no dia
2. Ao tentar abrir a 21ª questão
3. Modal de upgrade aparece automaticamente
4. "Você atingiu o limite diário. Faça upgrade para continuar!"
5. Botões: **PREMIUM** ou **INSANO**
6. Segue fluxo de pagamento PIX

---

## 📊 Comparação de Planos

| Recurso | FREE | PREMIUM | INSANO |
|---------|------|---------|--------|
| **Preço** | Grátis | R$ 29,90/mês | R$ 129,90/mês |
| **Questões/dia** | 20 | Ilimitadas | Ilimitadas |
| **Estatísticas** | Básicas | Avançadas | Avançadas + IA |
| **Prioridade Suporte** | ❌ | ✅ | ✅✅ (VIP) |
| **Filtros Avançados** | ❌ | ✅ | ✅ |
| **Simulados Personalizados** | ❌ | ✅ | ✅ |
| **Revisão com IA** | ❌ | ❌ | ✅ |
| **Acesso Offline** | ❌ | ✅ | ✅ |

---

## 🔄 Fluxo Visual Completo

```
┌─────────────────────────────────────────────────┐
│         USUÁRIO ACESSA O SITE                   │
└─────────────┬───────────────────────────────────┘
              │
              ▼
      ┌───────────────┐
      │ Clica ENTRAR  │
      └───────┬───────┘
              │
              ▼
   ┌──────────────────────┐
   │  Modal de Login      │
   │  - Email             │
   │  - Senha             │
   │  - Nome (opcional)   │
   └──────────┬───────────┘
              │
              ▼
        ┌─────────────────────┐
        │ Email é Master?     │
        └─────┬─────────┬─────┘
              │         │
             SIM       NÃO
              │         │
              ▼         ▼
    ┌──────────────┐  ┌──────────────┐
    │ LOGIN MASTER │  │ LOGIN ALUNO  │
    │ Role: MASTER │  │ Role: ALUNO  │
    │ Plano: INSANO│  │ Plano: FREE  │
    └──────┬───────┘  └──────┬───────┘
           │                 │
           │                 ▼
           │        ┌────────────────┐
           │        │  ONBOARDING    │
           │        │  Completar     │
           │        │  Perfil        │
           │        └────────┬───────┘
           │                 │
           └────────┬────────┘
                    │
                    ▼
          ┌─────────────────┐
          │   DASHBOARD      │
          └────────┬─────────┘
                   │
       ┌───────────┴───────────┐
       │                       │
       ▼                       ▼
┌──────────────┐      ┌──────────────┐
│ MASTER/INSANO│      │    FREE       │
│ Acesso Total │      │ Limite 20/dia │
└──────────────┘      └───────┬───────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ Atingiu limite│
                      │ ou quer mais? │
                      └───────┬───────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ UPGRADE MODAL │
                      │ Premium/Insano│
                      └───────┬───────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ Pagamento PIX │
                      └───────┬───────┘
                              │
                              ▼
                      ┌───────────────┐
                      │ Plano Upgrade │
                      │ ✅ Aprovado   │
                      └───────────────┘
```

---

## 🎯 Resumo dos Fluxos

### ✅ Fluxo 1: Usuário Novo → FREE
```
Cadastro → Onboarding → Dashboard FREE → Limite 20/dia → Upgrade opcional
```

### ✅ Fluxo 2: Master Admin → INSANO
```
Login direto → Dashboard INSANO → Acesso total imediato
```

### ✅ Fluxo 3: Upgrade FREE → PREMIUM/INSANO
```
Clicar perfil → Botão Upgrade → Escolher plano → PIX → Aprovado → Acesso liberado
```

---

## 🔐 Informações Técnicas

### Validação de Master
O sistema verifica se o email está na lista hardcoded:
```typescript
const MASTER_CREDENTIALS = [
    { email: 'kayquegusmao@gmail.com', password: 'Kayque2009' },
    { email: 'kayquegusmao1@gmail.com', password: 'Kayque2009' },
    { email: 'kayquegusmao276@gmail.com', password: 'Kayque2009' },
    { email: 'kayquegusmao@icloud.com', password: 'Kayque2009' }
]
```

### Criação de Novo Usuário
```typescript
// Se não é master, cria como ALUNO
{
    role: 'ALUNO',
    plan_level: 'FREE',
    profile_completed: false // Precisa completar onboarding
}
```

### Limite Diário FREE
```typescript
export const DAILY_QUESTION_LIMIT_FREE = 20
```

---

## 🎉 Sistema Completo e Funcional!

Todos os fluxos estão implementados e testados:
- ✅ Login com email e senha
- ✅ Criação automática de conta FREE
- ✅ Super admins com acesso INSANO
- ✅ Onboarding para novos usuários
- ✅ Sistema de upgrade com PIX
- ✅ Modal de perfil do usuário
- ✅ Limite diário para FREE
- ✅ Paywall configurado

**Pronto para produção!** 🚀
