# 🔐 Configuração de Autenticação com Supabase - QRub

## 📋 Visão Geral

Este guia mostra como configurar a autenticação completa do QRub usando Supabase como backend.

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - **Name**: QRub
   - **Database Password**: (escolha uma senha forte)
   - **Region**: South America (São Paulo) - para melhor latência
4. Aguarde a criação do projeto (~2 minutos)

### 2. Obter Credenciais

1. No painel do Supabase, vá em **Settings** → **API**
2. Copie as seguintes credenciais:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (chave pública)

3. Adicione ao arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

### 3. Configurar Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `/src/lib/supabase-schema.sql`
4. Cole no editor e clique em **Run**
5. Aguarde a execução (deve completar sem erros)

### 4. Configurar Autenticação

1. Vá em **Authentication** → **Providers**
2. Configure o **Email Provider**:
   - ✅ Enable Email provider
   - ✅ Confirm email (recomendado para produção)
   - ✅ Secure email change
   - ✅ Secure password change

3. (Opcional) Configure provedores sociais:
   - Google OAuth
   - GitHub OAuth
   - Outros conforme necessário

### 5. Configurar Políticas de Email

1. Vá em **Authentication** → **Email Templates**
2. Personalize os templates:
   - **Confirm signup**: Email de confirmação de cadastro
   - **Magic Link**: Link mágico para login
   - **Change Email Address**: Confirmação de mudança de email
   - **Reset Password**: Redefinição de senha

### 6. Criar Usuário Master

Após configurar tudo, crie seu primeiro usuário master:

1. Vá em **SQL Editor**
2. Execute:

```sql
-- Primeiro, crie o usuário via interface de autenticação do Supabase
-- Depois, promova-o a MASTER:
UPDATE public.users 
SET role = 'MASTER', 
    plan_level = 'INSANO', 
    profile_completed = TRUE
WHERE email = 'seu-email@exemplo.com';
```

### 7. Testar Autenticação

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse: http://localhost:3000/auth

3. Teste o cadastro:
   - Preencha nome, email e senha
   - Clique em "Criar Conta"
   - Verifique o email de confirmação (se habilitado)

4. Teste o login:
   - Use as credenciais criadas
   - Deve redirecionar para `/onboarding` ou `/dashboard`

## 🔒 Segurança Implementada

### Row Level Security (RLS)

Todas as tabelas têm RLS habilitado:

- ✅ **Users**: Usuários só veem/editam seus próprios dados
- ✅ **Questions**: Todos podem ler, apenas MASTER pode modificar
- ✅ **User Responses**: Usuários só acessam suas próprias respostas
- ✅ **Payments**: Usuários só veem seus próprios pagamentos
- ✅ **Error Notebook**: Usuários só acessam seu próprio caderno

### Triggers Automáticos

- ✅ **Auto-criação de perfil**: Quando um usuário se cadastra, o perfil é criado automaticamente
- ✅ **Updated_at automático**: Campos `updated_at` são atualizados automaticamente
- ✅ **Validações**: Constraints garantem integridade dos dados

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

1. **users** - Perfis de usuários
2. **questions** - Banco de questões
3. **user_responses** - Respostas dos usuários
4. **payments** - Histórico de pagamentos
5. **error_notebook** - Sistema SRS de revisão

## 🎯 Fluxo de Autenticação

### Cadastro (Signup)
```
1. Usuário preenche formulário
2. Supabase cria conta em auth.users
3. Trigger cria perfil em public.users
4. Email de confirmação enviado (opcional)
5. Usuário é redirecionado para /onboarding
```

### Login
```
1. Usuário envia email/senha
2. Supabase valida credenciais
3. App busca perfil em public.users
4. Zustand armazena sessão localmente
5. Redirecionamento baseado em profile_completed
```

### Logout
```
1. Usuário clica em logout
2. Supabase encerra sessão
3. Zustand limpa estado local
4. Redirecionamento para /
```

## 🔧 Troubleshooting

### Erro: "Invalid API key"
- Verifique se as credenciais no `.env.local` estão corretas
- Reinicie o servidor após alterar `.env.local`

### Erro: "Email not confirmed"
- Desabilite confirmação de email em **Authentication** → **Providers**
- Ou confirme o email manualmente no painel

### Erro: "Row Level Security policy violation"
- Verifique se as políticas RLS estão criadas corretamente
- Execute novamente o script SQL

### Usuário não é criado em public.users
- Verifique se o trigger `on_auth_user_created` está ativo
- Execute manualmente:
  ```sql
  INSERT INTO public.users (id, email, name, role, plan_level)
  VALUES ('user-id-from-auth', 'email@exemplo.com', 'Nome', 'ALUNO', 'FREE');
  ```

## 📱 Recursos Adicionais

### Monitoramento

Acesse **Logs** no painel do Supabase para ver:
- Tentativas de login
- Erros de autenticação
- Queries executadas
- Violações de RLS

### Backup

Configure backups automáticos em **Settings** → **Database**:
- Daily backups (recomendado)
- Point-in-time recovery (planos pagos)

## ✅ Checklist de Produção

- [ ] Projeto Supabase criado
- [ ] Credenciais adicionadas ao `.env.local`
- [ ] Schema SQL executado com sucesso
- [ ] RLS policies verificadas
- [ ] Email provider configurado
- [ ] Templates de email personalizados
- [ ] Usuário master criado e testado
- [ ] Cadastro testado
- [ ] Login testado
- [ ] Logout testado
- [ ] Redirecionamentos funcionando
- [ ] Backups configurados

## 🎉 Pronto!

Sua autenticação com Supabase está configurada! Agora você tem:

- ✅ Autenticação segura com email/senha
- ✅ Banco de dados PostgreSQL gerenciado
- ✅ Row Level Security para proteção de dados
- ✅ Triggers automáticos
- ✅ Sistema de perfis de usuário
- ✅ Integração completa com o app QRub

## 📚 Documentação Útil

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript/introduction)
