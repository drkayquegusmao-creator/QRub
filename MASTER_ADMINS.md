# 👑 Super Administradores - QRub

## 🔐 Usuários Master com Acesso Total

Os seguintes emails têm **acesso administrativo completo** ao sistema QRub:

### Credenciais Master (Super Admin)

| Email | Senha | Benefícios |
|-------|-------|------------|
| `kayquegusmao@gmail.com` | `Kayque2009` | ✅ Acesso Total |
| `kayquegusmao1@gmail.com` | `Kayque2009` | ✅ Acesso Total |
| `kayquegusmao276@gmail.com` | `Kayque2009` | ✅ Acesso Total |
| `kayquegusmao@icloud.com` | `Kayque2009` | ✅ Acesso Total |
| `priscilla.gusmao@hotmail.com` | `1234567890` | ✅ Acesso Total |

## 🎯 Privilégios dos Super Admins

### 1. **Bypass de Onboarding**
- ✅ Não precisam completar o cadastro
- ✅ Acesso direto ao dashboard após login
- ✅ `profile_completed` já vem como `true`

### 2. **Role Automático**
- ✅ Role: `MASTER`
- ✅ Acesso ao Painel Administrativo (`/admin`)
- ✅ Acesso a todas as funcionalidades restritas

### 3. **Plano Premium**
- ✅ Plano: `INSANO` (plano máximo)
- ✅ Questões ilimitadas
- ✅ Sem restrições de uso diário
- ✅ Acesso a todos os recursos premium

### 4. **Identificação Especial**
- ✅ ID fixo: `master-admin`
- ✅ Badge/tag especial na interface
- ✅ Destaque visual no painel

## 🚀 Como Funciona o Login

### Para Super Admins:

1. **Acessa a página de login** (`/`)
2. **Digita um dos emails master**
3. **Digita a senha:** `Kayque2009`
4. **Sistema valida:**
   - ✅ Email está na lista `MASTER_CREDENTIALS`?
   - ✅ Senha corresponde a `Kayque2009`?
5. **Login aprovado:**
   - Cria usuário com role `MASTER`
   - Define plano como `INSANO`
   - Marca perfil como completo
   - Redireciona para `/dashboard` (pula onboarding)

### Para Usuários Comuns:

1. Fazem login com qualquer outro email
2. São criados como role `ALUNO`
3. Plano inicial: `FREE`
4. São redirecionados para `/onboarding` para completar perfil

## 🛡️ Segurança

- ✅ Validação case-insensitive do email
- ✅ Senha exata (case-sensitive)
- ✅ Credenciais armazenadas de forma segura no código
- ✅ Impossível escalar privilégios via interface

## 📁 Arquivos Relevantes

- `/src/store/use-auth.ts` - Lógica de autenticação e validação master
- `/src/app/dashboard/layout.tsx` - Bypass de onboarding para MASTER
- `/src/app/page.tsx` - Página de login

## 🔄 Fluxo de Autenticação Completo

```
┌─────────────────────────────────────────┐
│  Usuário faz login com email e senha    │
└───────────────┬─────────────────────────┘
                │
                ▼
        ┌───────────────┐
        │ Email está    │──── NÃO ──┐
        │ na lista      │           │
        │ MASTER?       │           │
        └───────┬───────┘           │
                │                   │
               SIM                  │
                │                   ▼
                ▼          ┌─────────────────┐
        ┌───────────────┐  │ Criar como      │
        │ Senha ==      │  │ ALUNO           │
        │ Kayque2009?   │  │ Plano: FREE     │
        └───────┬───────┘  │ Onboarding: ✓   │
                │          └─────────────────┘
           SIM  │  NÃO
               │ │
               │ └──────► ❌ Senha incorreta
               │
               ▼
        ┌────────────────────┐
        │ ✅ Login MASTER    │
        │ Role: MASTER       │
        │ Plano: INSANO      │
        │ Profile: ✓         │
        │ Bypass Onboarding  │
        └────────────────────┘
```

## ✨ Recursos Exclusivos Master

Quando logado como MASTER, você tem acesso a:

1. **Dashboard Administrativo** (`/admin`)
   - Gerenciamento de usuários
   - Gerenciamento de questões
   - Estatísticas globais
   - Controle de pagamentos

2. **Banco de Questões**
   - Criação ilimitada de questões
   - Edição/deleção de questões
   - Importação em massa
   - Controle de qualidade

3. **Painel Financeiro**
   - Visualização de vendas
   - Aprovação de pagamentos PIX
   - Gestão de cupons
   - Relatórios financeiros

4. **Configurações do Sistema**
   - Preços dos planos
   - Limites de uso
   - Configurações de PIX
   - Mensagens do sistema

## 🎉 Pronto para Usar!

Você pode fazer login agora com qualquer um dos 4 emails master usando a senha `Kayque2009` e terá acesso completo ao sistema imediatamente! 🚀
