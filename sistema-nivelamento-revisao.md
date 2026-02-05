# Sistema de Nivelamento, Revisão Espaçada e Calendário - QRub

## 🎯 Objetivo

Implementar um sistema completo, automático e individualizado de:
- ✅ Nivelamento por assunto (10 questões fixas)
- ✅ Revisão espaçada (intervalo baseado em nota)
- ✅ Calendário automático de estudos
- ✅ Controle anti-repetição de questões
- ✅ Priorização diária inteligente

---

## 📊 Status Atual do Sistema

### ✅ Já Implementado
- [x] Store SRS (`use-srs.ts`) com lógica de nivelamento e revisão
- [x] Tabela `questao_base` com questões aprovadas
- [x] Tabela `users` com planos (FREE, PREMIUM, INSANO)
- [x] Sistema de especialidades médicas (`MEDICAL_HIERARCHY`)

### ❌ Faltando Implementar
- [ ] Tabelas do banco de dados (assuntos, sessões, agenda, etc.)
- [ ] API endpoints para sessões e calendário
- [ ] UI do calendário (DIA / SEMANA / MÊS)
- [ ] Dashboard diário com priorização
- [ ] Sistema de anti-repetição robusto
- [ ] Validação por plano (FREE/PREMIUM/INSANO)

---

## 🗂️ Fase 1: Estrutura de Dados (Database Schema)

### 1.1 Tabela `assuntos`
```sql
CREATE TABLE assuntos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    specialty_id VARCHAR(50) NOT NULL, -- Referência ao MEDICAL_HIERARCHY
    subspecialty_id VARCHAR(50),
    tema VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_assuntos_specialty ON assuntos(specialty_id);
```

### 1.2 Tabela `assunto_progresso`
```sql
CREATE TABLE assunto_progresso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID REFERENCES assuntos(id) ON DELETE CASCADE,
    
    -- Estados: NAO_NIVELADO, NIVELADO, AGUARDANDO_REVISAO, REVISAO_VENCIDA
    estado VARCHAR(50) CHECK (estado IN ('NAO_NIVELADO', 'NIVELADO', 'AGUARDANDO_REVISAO', 'REVISAO_VENCIDA')) DEFAULT 'NAO_NIVELADO',
    
    -- Nível atual (0-10)
    nivel_atual DECIMAL(3, 1) DEFAULT 0,
    ultima_nota DECIMAL(3, 1),
    
    -- Estatísticas
    total_questoes_respondidas INT DEFAULT 0,
    total_acertos INT DEFAULT 0,
    
    -- Datas
    data_ultima_sessao TIMESTAMP WITH TIME ZONE,
    data_proxima_revisao TIMESTAMP WITH TIME ZONE,
    intervalo_dias INT DEFAULT 7,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, assunto_id)
);

CREATE INDEX idx_progresso_user ON assunto_progresso(user_id);
CREATE INDEX idx_progresso_estado ON assunto_progresso(estado);
CREATE INDEX idx_progresso_proxima_revisao ON assunto_progresso(data_proxima_revisao);
```

### 1.3 Tabela `sessoes`
```sql
CREATE TABLE sessoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID REFERENCES assuntos(id) ON DELETE CASCADE,
    
    -- Tipos: NIVELAMENTO, REVISAO
    tipo VARCHAR(50) CHECK (tipo IN ('NIVELAMENTO', 'REVISAO')) NOT NULL,
    
    -- Status: EM_ANDAMENTO, FINALIZADA, CANCELADA
    status VARCHAR(50) CHECK (status IN ('EM_ANDAMENTO', 'FINALIZADA', 'CANCELADA')) DEFAULT 'EM_ANDAMENTO',
    
    -- Resultados
    total_questoes INT DEFAULT 10,
    total_acertos INT DEFAULT 0,
    nota DECIMAL(3, 1),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finalized_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_sessoes_user ON sessoes(user_id);
CREATE INDEX idx_sessoes_assunto ON sessoes(assunto_id);
CREATE INDEX idx_sessoes_status ON sessoes(status);
```

### 1.4 Tabela `sessao_itens`
```sql
CREATE TABLE sessao_itens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sessao_id UUID REFERENCES sessoes(id) ON DELETE CASCADE,
    questao_id UUID REFERENCES questao_base(id) ON DELETE CASCADE,
    
    -- Ordem da questão na sessão (1-10)
    ordem INT NOT NULL,
    
    -- Resposta do usuário
    resposta_usuario CHAR(1),
    esta_correta BOOLEAN,
    tempo_resposta_segundos INT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(sessao_id, ordem)
);

CREATE INDEX idx_sessao_itens_sessao ON sessao_itens(sessao_id);
```

### 1.5 Tabela `questao_uso_usuario`
```sql
CREATE TABLE questao_uso_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID REFERENCES assuntos(id) ON DELETE CASCADE,
    questao_id UUID REFERENCES questao_base(id) ON DELETE CASCADE,
    
    -- Controle de uso
    foi_usada BOOLEAN DEFAULT TRUE,
    foi_acertada BOOLEAN,
    data_uso TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sessao_id UUID REFERENCES sessoes(id),
    
    UNIQUE(user_id, assunto_id, questao_id)
);

CREATE INDEX idx_uso_user_assunto ON questao_uso_usuario(user_id, assunto_id);
CREATE INDEX idx_uso_questao ON questao_uso_usuario(questao_id);
```

### 1.6 Tabela `agenda_revisoes`
```sql
CREATE TABLE agenda_revisoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID REFERENCES assuntos(id) ON DELETE CASCADE,
    
    -- Data programada
    data_programada DATE NOT NULL,
    
    -- Status: PENDENTE, CONCLUIDA, ATRASADA
    status VARCHAR(50) CHECK (status IN ('PENDENTE', 'CONCLUIDA', 'ATRASADA')) DEFAULT 'PENDENTE',
    
    -- Referência à sessão quando concluída
    sessao_id UUID REFERENCES sessoes(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(user_id, assunto_id, data_programada)
);

CREATE INDEX idx_agenda_user ON agenda_revisoes(user_id);
CREATE INDEX idx_agenda_data ON agenda_revisoes(data_programada);
CREATE INDEX idx_agenda_status ON agenda_revisoes(status);
```

---

## ⚙️ Fase 2: Lógica de Backend (API Endpoints)

### 2.1 `GET /api/dashboard/diario`
**Função:** Retorna a priorização diária do usuário

**Lógica:**
1. Buscar revisões ATRASADAS (status = ATRASADA)
2. Buscar revisões DO DIA (data_programada = hoje)
3. Se nenhuma existir → buscar 1 assunto NÃO_NIVELADO
4. Retornar lista ordenada por prioridade

**Resposta:**
```json
{
  "revisoes_atrasadas": [
    {
      "assunto_id": "uuid",
      "nome": "Clínica Médica - ICC",
      "dias_atrasado": 3,
      "nivel_atual": 6.5
    }
  ],
  "revisoes_do_dia": [...],
  "sugestao_nivelamento": {
    "assunto_id": "uuid",
    "nome": "Ginecologia - Sangramento uterino"
  }
}
```

### 2.2 `POST /api/sessao/criar`
**Função:** Criar uma nova sessão (NIVELAMENTO ou REVISAO)

**Body:**
```json
{
  "user_id": "uuid",
  "assunto_id": "uuid",
  "tipo": "NIVELAMENTO"
}
```

**Lógica:**
1. Validar assunto existente
2. Validar questões APROVADAS ≥ 10
3. Buscar 10 questões não usadas (anti-repetição)
4. Criar sessão
5. Criar 10 itens de sessão
6. Retornar payload para UI

**Resposta:**
```json
{
  "sessao_id": "uuid",
  "questoes": [
    {
      "questao_id": "uuid",
      "ordem": 1,
      "enunciado": "...",
      "options": [...]
    }
  ]
}
```

### 2.3 `POST /api/sessao/finalizar`
**Função:** Finalizar sessão e atualizar progresso

**Body:**
```json
{
  "sessao_id": "uuid",
  "respostas": [
    { "questao_id": "uuid", "resposta": "a", "tempo_segundos": 45 }
  ]
}
```

**Lógica:**
1. Calcular acertos
2. Calcular nota (0–10)
3. Atualizar uso das questões
4. Atualizar assunto_progresso
5. Calcular intervalo (3/7/14/30/45 dias)
6. Criar/atualizar agenda
7. Marcar sessão como FINALIZADA

**Resposta:**
```json
{
  "nota": 8.0,
  "acertos": 8,
  "total": 10,
  "nivel_atual": 8.0,
  "proxima_revisao": "2026-03-07"
}
```

### 2.4 `GET /api/calendario`
**Função:** Retornar calendário do usuário (DIA/SEMANA/MÊS)

**Query Params:**
- `user_id`: UUID
- `visao`: "DIA" | "SEMANA" | "MES"
- `data`: ISO Date (opcional, default = hoje)

**Resposta:**
```json
{
  "visao": "SEMANA",
  "periodo": {
    "inicio": "2026-02-03",
    "fim": "2026-02-09"
  },
  "eventos": [
    {
      "data": "2026-02-05",
      "tipo": "REVISAO",
      "status": "ATRASADA",
      "assunto": "Clínica Médica - ICC"
    }
  ]
}
```

---

## 🎨 Fase 3: Interface do Usuário (UI)

### 3.1 Dashboard Diário (Componente Principal)
**Arquivo:** `src/components/dashboard-diario.tsx`

**Estrutura:**
```tsx
<DashboardDiario>
  <SecaoRevisoesAtrasadas />
  <SecaoRevisoesDoDia />
  <SecaoNovoNivelamento />
  <BotaoIniciarSessao />
</DashboardDiario>
```

### 3.2 Calendário (3 Visões)
**Arquivo:** `src/components/calendario-estudos.tsx`

**Visões:**
- **DIA:** Lista de tarefas do dia (padrão)
- **SEMANA:** Grid 7 dias com ícones
- **MÊS:** Grid mensal com indicadores

**Interação:**
- Clicar em evento → Abre modal de sessão
- Cores: Vermelho (atrasada), Roxo (do dia), Gradiente (nivelamento)

### 3.3 Modal de Sessão
**Arquivo:** `src/components/sessao-modal.tsx`

**Fluxo:**
1. Exibir 10 questões uma por vez
2. Usuário responde
3. Ao final → Mostrar resultado
4. Atualizar calendário automaticamente

---

## 🔐 Fase 4: Validação por Plano

### 4.1 Regras por Plano

| Recurso | FREE | PREMIUM | INSANO |
|---------|------|---------|--------|
| Assuntos ativos | 3 | Ilimitado | Ilimitado |
| Sessões/dia | 1 | 3 | Ilimitado |
| Visão calendário | DIA | DIA + SEMANA | DIA + SEMANA + MÊS |
| Histórico | Não | Sim | Sim |
| Ajuste inteligente | Não | Não | Sim |

### 4.2 Middleware de Validação
**Arquivo:** `src/lib/plan-validator.ts`

```typescript
export function validarPlano(user: User, acao: string) {
  const limites = {
    FREE: { max_assuntos: 3, max_sessoes_dia: 1, visoes: ['DIA'] },
    PREMIUM: { max_assuntos: Infinity, max_sessoes_dia: 3, visoes: ['DIA', 'SEMANA'] },
    INSANO: { max_assuntos: Infinity, max_sessoes_dia: Infinity, visoes: ['DIA', 'SEMANA', 'MES'] }
  }
  
  const limite = limites[user.plan_level]
  // Validar ação contra limite
}
```

---

## ✅ Fase 5: Verificação e Testes

### 5.1 Checklist de Implementação
- [ ] Todas as tabelas criadas no Supabase
- [ ] Índices criados para performance
- [ ] API endpoints implementados
- [ ] Anti-repetição funcionando
- [ ] Calendário renderizando corretamente
- [ ] Validação de planos ativa
- [ ] Dashboard nunca vazio

### 5.2 Testes Críticos
1. **Nivelamento:** 10 questões únicas, nota calculada, agenda criada
2. **Revisão:** Intervalo correto, questões diferentes
3. **Anti-repetição:** Mesma questão não aparece 2x no mesmo assunto
4. **Calendário:** Revisões atrasadas marcadas corretamente
5. **Planos:** FREE bloqueado após 1 sessão/dia

---

## 📋 Ordem de Implementação

### Sprint 1: Database + Backend Core
1. Criar todas as tabelas no Supabase
2. Implementar `/api/sessao/criar`
3. Implementar `/api/sessao/finalizar`
4. Implementar lógica anti-repetição

### Sprint 2: Dashboard + Calendário
1. Criar `DashboardDiario` component
2. Criar `CalendarioEstudos` component
3. Implementar `/api/dashboard/diario`
4. Implementar `/api/calendario`

### Sprint 3: Validação + Polimento
1. Implementar validação de planos
2. Adicionar fallbacks (banco insuficiente)
3. Testes end-to-end
4. Ajustes de UX

---

## 🚀 Próximos Passos

1. **Confirmar defaults assumidos:**
   - Sistema zerado (sem migração)
   - Bloquear nivelamento se < 10 questões
   - Nível = última nota
   - Sugestão aleatória de novos assuntos
   - Mostrar todas revisões atrasadas

2. **Iniciar Sprint 1:**
   - Criar schema SQL completo
   - Executar migrations no Supabase
   - Implementar primeiro endpoint

---

**Defaults Assumidos (conforme Socratic Gate):**
- ✅ Sistema zerado (sem dados históricos)
- ✅ Bloquear nivelamento se < 10 questões aprovadas
- ✅ `nivel_atual` = última nota (simplicidade)
- ✅ Sugestão de nivelamento = aleatório entre não nivelados
- ✅ Revisões atrasadas = mostrar todas com destaque decrescente
