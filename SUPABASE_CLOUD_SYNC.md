# 🌐 Supabase Cloud Sync - QRub

## 📋 Visão Geral

O QRub agora possui **sincronização completa em nuvem** através do Supabase, permitindo que os dados dos usuários sejam persistidos e acessados de qualquer dispositivo.

## ✅ Recursos Implementados

### 1. **Autenticação de Usuários**
- ✅ Login/Cadastro com Supabase Auth
- ✅ Modo Mock (fallback local quando Supabase não está configurado)
- ✅ Perfis de usuário na tabela `users`
- ✅ Criação automática de perfil via trigger
- ✅ Onboarding com sincronização de dados

### 2. **Sistema SRS (Spaced Repetition System)**
- ✅ Tabela `subject_progress` para rastrear progresso por especialidade
- ✅ Sincronização automática após cada resposta
- ✅ Carregamento de progresso ao montar o dashboard
- ✅ Métricas de nivelamento e revisão
- ✅ Histórico de performance por assunto

### 3. **Banco de Questões**
- ✅ Tabela `questions` com todas as questões
- ✅ CRUD completo via `useQuestions` store
- ✅ Geração automática de questões
- ✅ Filtros por curso, especialidade, subespecialidade e assunto
- ✅ Sincronização com IndexedDB local

### 4. **Respostas dos Usuários**
- ✅ Tabela `user_responses` para rastrear todas as respostas
- ✅ Sincronização automática após cada resposta
- ✅ Métricas de acurácia e performance
- ✅ Carregamento de histórico no dashboard

### 5. **Gerenciamento de Usuários**
- ✅ Tabela `users` sincronizada
- ✅ Store `useUserDb` com operações CRUD
- ✅ Atualização de planos (FREE, PREMIUM, INSANO)
- ✅ Atualização de perfil completo

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### `users`
```sql
- id (UUID, PK)
- email (TEXT, UNIQUE)
- name (TEXT)
- role (TEXT) -- 'MASTER' | 'ALUNO' | 'VISITANTE'
- plan_level (TEXT) -- 'FREE' | 'PREMIUM' | 'INSANO'
- profile_completed (BOOLEAN)
- phone, institution, graduation_year, specialty_of_interest
- created_at, updated_at
```

#### `questions`
```sql
- id (UUID, PK)
- course_id, specialty_id, subspecialty_id, subject_id
- enunciado (TEXT)
- options (JSONB)
- correct_option_id (TEXT)
- explanation (TEXT)
- difficulty (TEXT)
- references (TEXT)
- created_at, updated_at
```

#### `user_responses`
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users)
- question_id (UUID, FK -> questions)
- specialty_id (TEXT)
- is_correct (BOOLEAN)
- timestamp (TIMESTAMPTZ)
```

#### `subject_progress`
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users)
- subject_id (TEXT)
- stage (TEXT) -- 'NEUTRAL' | 'LEVELING' | 'ACTIVE'
- level (TEXT) -- 'FRACO' | 'REGULAR' | 'BOM' | 'FORTE' | 'NOT_LEVELED'
- leveling_count, leveling_correct
- total_questions, total_correct, streak
- current_interval, last_accuracy
- last_eval_date, next_review_date
- history (JSONB)
- created_at, updated_at
```

## 🔐 Segurança (RLS)

Todas as tabelas possuem **Row Level Security (RLS)** ativado:

- **users**: Usuários podem ver/editar apenas seus próprios dados
- **questions**: Leitura pública, escrita apenas para MASTER
- **user_responses**: Usuários podem gerenciar apenas suas próprias respostas
- **subject_progress**: Usuários podem gerenciar apenas seu próprio progresso

## 🔄 Fluxo de Sincronização

### Login/Cadastro
1. Usuário faz login na página `/auth`
2. `useAuth.loginWithPassword()` é chamado
3. Supabase Auth autentica o usuário
4. Perfil é criado/atualizado na tabela `users`
5. `useUserDb.addUser()` sincroniza com o banco

### Resposta a Questão
1. Usuário responde uma questão no quiz
2. `useQuiz.add_response()` salva localmente e no Supabase
3. `useSRS.process_answer()` atualiza o progresso SRS
4. `useSRS.save_progress()` sincroniza com `subject_progress`

### Carregamento do Dashboard
1. Dashboard monta e detecta `user.id`
2. `useQuiz.load_responses(user.id)` carrega histórico
3. `useSRS.load_progress(user.id)` carrega progresso SRS
4. Métricas são calculadas e exibidas

## 📦 Stores Atualizadas

### `useAuth` (`/src/store/use-auth.ts`)
- ✅ `loginWithPassword()` agora é async
- ✅ `completeProfile()` agora é async e sincroniza com Supabase
- ✅ `updatePlan()` sincroniza com o banco

### `useSRS` (`/src/store/use-srs.ts`)
- ✅ `process_answer(user_id, response, subject_id)` - agora async
- ✅ `load_progress(user_id)` - carrega do Supabase
- ✅ `save_progress(user_id, subject_id)` - salva no Supabase
- ✅ `loading` state para indicar carregamento

### `useQuiz` (`/src/store/use-quiz.ts`)
- ✅ `add_response()` sincroniza com Supabase
- ✅ `load_responses(user_id)` carrega histórico
- ✅ Métricas calculadas a partir de dados reais

### `useQuestions` (`/src/store/use-questions.ts`)
- ✅ `loadQuestions()` carrega do Supabase
- ✅ `addQuestion()` adiciona no Supabase
- ✅ `deleteQuestion()` remove do Supabase
- ✅ `generateQuestions()` gera e salva no Supabase

### `useUserDb` (`/src/store/use-user-db.ts`)
- ✅ `loadUsers()` carrega todos os usuários
- ✅ `addUser()` adiciona e sincroniza
- ✅ `updateUserPlan()` atualiza plano
- ✅ `updateUserProfile()` atualiza perfil completo
- ✅ `deleteUser()` remove usuário

## 🚀 Como Usar

### Modo Mock (Desenvolvimento Local)
Se o Supabase não estiver configurado, o sistema funciona em **modo mock**:
- Dados salvos em `localStorage`
- Autenticação simulada
- Sem sincronização em nuvem

### Modo Produção (Supabase Ativo)
1. Configure as variáveis de ambiente:
```env
NEXT_PUBLIC_SUPABASE_URL=sua-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
```

2. Execute o schema SQL no Supabase SQL Editor:
```bash
# Arquivo: /src/lib/supabase-schema.sql
```

3. A sincronização acontece automaticamente!

## 🎯 Próximos Passos

### Implementações Futuras
- [ ] Sincronização offline com queue
- [ ] Conflict resolution para edições simultâneas
- [ ] Backup automático de dados
- [ ] Migração de dados do localStorage para Supabase
- [ ] Real-time subscriptions para atualizações ao vivo
- [ ] Compressão de histórico SRS para otimizar storage

## 🐛 Troubleshooting

### Erro: "Failed to load progress"
- Verifique se as credenciais do Supabase estão corretas
- Confirme que o schema foi executado
- Verifique as políticas RLS

### Dados não sincronizam
- Abra o console do navegador e verifique erros
- Confirme que `isSupabaseConfigured()` retorna `true`
- Verifique a conexão com a internet

### Performance lenta
- Considere adicionar índices adicionais
- Verifique o plano do Supabase (free tier tem limites)
- Otimize queries com `select()` específico

## 📚 Referências

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Zustand Persist](https://github.com/pmndrs/zustand#persist-middleware)

---

**Status**: ✅ Integração Completa e Funcional
**Última Atualização**: 2026-01-30
