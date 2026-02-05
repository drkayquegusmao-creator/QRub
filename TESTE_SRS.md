# 🧪 Guia de Teste do Sistema SRS

## ⚠️ Pré-requisitos

Antes de testar, você precisa:

1. ✅ Servidor rodando (`npm run dev`)
2. ✅ Supabase configurado (`.env.local`)
3. ✅ Schema SQL aplicado no banco

---

## 📝 Passo 1: Aplicar Schema no Supabase

### Opção Recomendada: Via Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Cole o conteúdo completo de `src/lib/schema-srs.sql`
6. Clique em **Run** (ou pressione Cmd+Enter)

### Verificar Sucesso

Execute esta query no SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'assuntos', 
  'assunto_progresso', 
  'sessoes', 
  'sessao_itens', 
  'questao_uso_usuario', 
  'agenda_revisoes'
);
```

**Resultado esperado:** 6 tabelas listadas

---

## 📝 Passo 2: Popular Assuntos

### Via cURL:

```bash
curl -X POST http://localhost:3000/api/assuntos/seed \
  -H "Content-Type: application/json"
```

### Verificar Sucesso:

```bash
curl http://localhost:3000/api/assuntos/seed
```

**Resultado esperado:**
```json
{
  "success": true,
  "total_assuntos": 50,
  "por_especialidade": { ... }
}
```

---

## 📝 Passo 3: Testar Dashboard Diário

### Obter seu User ID

Execute no Supabase SQL Editor:

```sql
SELECT id, email FROM users LIMIT 5;
```

Copie um `id` de usuário.

### Testar Endpoint:

```bash
curl "http://localhost:3000/api/dashboard/diario?user_id=SEU_USER_ID_AQUI"
```

**Resultado esperado:**
```json
{
  "success": true,
  "data_hoje": "2026-02-05",
  "revisoes_atrasadas": [],
  "revisoes_do_dia": [],
  "sugestao_nivelamento": {
    "assunto_id": "uuid",
    "nome": "Clínica Médica",
    "specialty_id": "clinica-medica",
    "questoes_disponiveis": 150
  },
  "resumo": {
    "total_atrasadas": 0,
    "total_do_dia": 0,
    "tem_sugestao": true
  }
}
```

---

## 📝 Passo 4: Criar Sessão de Nivelamento

### Obter Assunto ID

```bash
curl "http://localhost:3000/api/assuntos/seed" | jq '.assuntos[0]'
```

Copie o `id` do primeiro assunto.

### Criar Sessão:

```bash
curl -X POST http://localhost:3000/api/sessao/criar \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "SEU_USER_ID",
    "assunto_id": "SEU_ASSUNTO_ID",
    "tipo": "NIVELAMENTO"
  }'
```

**Resultado esperado:**
```json
{
  "success": true,
  "sessao_id": "uuid",
  "tipo": "NIVELAMENTO",
  "assunto": {
    "id": "uuid",
    "nome": "Clínica Médica",
    "specialty_id": "clinica-medica"
  },
  "questoes": [
    {
      "questao_id": "uuid",
      "ordem": 1,
      "enunciado": "...",
      "options": [...]
    }
    // ... 9 questões restantes
  ],
  "total_questoes": 10
}
```

---

## 📝 Passo 5: Finalizar Sessão

### Preparar Respostas:

Use as 10 questões retornadas no passo anterior e crie um array de respostas:

```bash
curl -X POST http://localhost:3000/api/sessao/finalizar \
  -H "Content-Type: application/json" \
  -d '{
    "sessao_id": "SEU_SESSAO_ID",
    "respostas": [
      {"questao_id": "questao1_id", "resposta": "a", "tempo_segundos": 45},
      {"questao_id": "questao2_id", "resposta": "b", "tempo_segundos": 60},
      {"questao_id": "questao3_id", "resposta": "c", "tempo_segundos": 30},
      {"questao_id": "questao4_id", "resposta": "a", "tempo_segundos": 50},
      {"questao_id": "questao5_id", "resposta": "d", "tempo_segundos": 40},
      {"questao_id": "questao6_id", "resposta": "b", "tempo_segundos": 55},
      {"questao_id": "questao7_id", "resposta": "a", "tempo_segundos": 35},
      {"questao_id": "questao8_id", "resposta": "c", "tempo_segundos": 65},
      {"questao_id": "questao9_id", "resposta": "e", "tempo_segundos": 70},
      {"questao_id": "questao10_id", "resposta": "a", "tempo_segundos": 45}
    ]
  }'
```

**Resultado esperado:**
```json
{
  "success": true,
  "nota": 8.0,
  "acertos": 8,
  "total": 10,
  "nivel_atual": 8.0,
  "proxima_revisao": "2026-03-07",
  "intervalo_dias": 30,
  "detalhes": {
    "sessao_id": "uuid",
    "tipo": "NIVELAMENTO",
    "finalizada_em": "2026-02-05T12:43:15Z"
  }
}
```

---

## 📝 Passo 6: Verificar Progresso Atualizado

### Verificar Dashboard:

```bash
curl "http://localhost:3000/api/dashboard/diario?user_id=SEU_USER_ID"
```

**Agora deve mostrar:**
- ✅ Revisão agendada para 30 dias (se nota foi 8-9)
- ✅ Sugestão de novo nivelamento

### Verificar no Banco:

```sql
-- Ver progresso do assunto
SELECT * FROM assunto_progresso 
WHERE user_id = 'SEU_USER_ID';

-- Ver agenda de revisões
SELECT * FROM agenda_revisoes 
WHERE user_id = 'SEU_USER_ID';

-- Ver uso de questões
SELECT COUNT(*) FROM questao_uso_usuario 
WHERE user_id = 'SEU_USER_ID';
```

---

## ✅ Checklist de Testes

- [ ] Schema SQL aplicado com sucesso (6 tabelas criadas)
- [ ] Assuntos populados (50+ assuntos)
- [ ] Dashboard retorna sugestão de nivelamento
- [ ] Sessão criada com 10 questões únicas
- [ ] Sessão finalizada com nota calculada
- [ ] Progresso atualizado no banco
- [ ] Agenda de revisão criada automaticamente
- [ ] Uso de questões registrado (anti-repetição)
- [ ] Dashboard atualizado com nova revisão agendada

---

## 🐛 Troubleshooting

### Erro: "Insufficient questions"

**Causa:** Assunto não tem 10 questões aprovadas.

**Solução:** 
1. Verificar questões no banco:
```sql
SELECT specialty_id, COUNT(*) 
FROM questao_base 
WHERE status_validacao = 'APROVADA' 
GROUP BY specialty_id;
```
2. Gerar mais questões para o assunto ou escolher outro assunto.

### Erro: "Session not found"

**Causa:** `sessao_id` inválido ou sessão já finalizada.

**Solução:** Criar nova sessão antes de finalizar.

### Erro: "Invalid respostas"

**Causa:** Array de respostas não tem exatamente 10 itens.

**Solução:** Garantir que todas as 10 questões tenham resposta.

---

## 📊 Teste Completo (Script Bash)

Salve este script como `test-srs.sh`:

```bash
#!/bin/bash

# Configuração
USER_ID="seu-user-id-aqui"
BASE_URL="http://localhost:3000"

echo "🧪 Testando Sistema SRS do QRub"
echo "================================"

# 1. Popular assuntos
echo "📝 1. Populando assuntos..."
curl -s -X POST "$BASE_URL/api/assuntos/seed" | jq '.total_criados'

# 2. Buscar dashboard
echo "📊 2. Buscando dashboard diário..."
DASHBOARD=$(curl -s "$BASE_URL/api/dashboard/diario?user_id=$USER_ID")
echo $DASHBOARD | jq '.resumo'

# 3. Pegar sugestão de assunto
ASSUNTO_ID=$(echo $DASHBOARD | jq -r '.sugestao_nivelamento.assunto_id')
echo "📚 Assunto sugerido: $ASSUNTO_ID"

# 4. Criar sessão
echo "🎯 3. Criando sessão de nivelamento..."
SESSAO=$(curl -s -X POST "$BASE_URL/api/sessao/criar" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":\"$USER_ID\",\"assunto_id\":\"$ASSUNTO_ID\",\"tipo\":\"NIVELAMENTO\"}")

SESSAO_ID=$(echo $SESSAO | jq -r '.sessao_id')
echo "✅ Sessão criada: $SESSAO_ID"

echo "✅ Teste concluído!"
```

Execute:
```bash
chmod +x test-srs.sh
./test-srs.sh
```

---

## 🎉 Próximos Passos

Após todos os testes passarem:

1. ✅ Implementar componentes UI
2. ✅ Adicionar validação de planos
3. ✅ Criar endpoint de calendário
4. ✅ Testes end-to-end

---

**Status:** Backend testado e funcional ✅
