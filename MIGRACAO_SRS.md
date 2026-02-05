# Migração do Sistema SRS (Nivelamento e Revisão Espaçada)

## 🚀 Como Executar a Migração

### Opção 1: Via API (Recomendado)

```bash
# Aplicar schema (criar tabelas)
curl -X POST http://localhost:3000/api/srs-migration \
  -H "Content-Type: application/json" \
  -d '{"action": "apply"}'

# Rollback (remover tabelas)
curl -X POST http://localhost:3000/api/srs-migration \
  -H "Content-Type: application/json" \
  -d '{"action": "rollback"}'
```

### Opção 2: Via Supabase Dashboard

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Cole o conteúdo de `src/lib/schema-srs.sql`
4. Execute

---

## 📊 Tabelas Criadas

| Tabela | Descrição |
|--------|-----------|
| `assuntos` | Menor unidade de estudo (tema ou área+subárea+tema) |
| `assunto_progresso` | Progresso individual de cada usuário em cada assunto |
| `sessoes` | Sessões de estudo (NIVELAMENTO ou REVISÃO) |
| `sessao_itens` | Questões individuais de cada sessão (sempre 10) |
| `questao_uso_usuario` | Controle anti-repetição de questões |
| `agenda_revisoes` | Calendário automático de revisões |

---

## 🔐 Row Level Security (RLS)

Todas as tabelas possuem RLS habilitado:
- Usuários só acessam seus próprios dados
- Políticas de SELECT, INSERT e UPDATE configuradas
- Baseado em `auth.uid()`

---

## ⚙️ Funções Auxiliares

### `calcular_intervalo_revisao(nota DECIMAL)`
Calcula o intervalo de revisão baseado na nota:
- NOTA 0–3  → 3 dias
- NOTA 4–5  → 7 dias
- NOTA 6–7  → 14 dias
- NOTA 8–9  → 30 dias
- NOTA 10   → 45 dias

### `atualizar_revisoes_atrasadas()`
Marca revisões vencidas como ATRASADAS.
Deve ser executada diariamente (via cron ou trigger).

---

## ✅ Verificação

Após executar a migração, verifique:

```sql
-- Listar todas as tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('assuntos', 'assunto_progresso', 'sessoes', 'sessao_itens', 'questao_uso_usuario', 'agenda_revisoes');

-- Verificar RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('assunto_progresso', 'sessoes', 'sessao_itens', 'questao_uso_usuario', 'agenda_revisoes');
```

---

## 🔄 Próximos Passos

1. ✅ Executar migração
2. ⏳ Criar API endpoints:
   - `POST /api/sessao/criar`
   - `POST /api/sessao/finalizar`
   - `GET /api/dashboard/diario`
   - `GET /api/calendario`
3. ⏳ Criar componentes UI:
   - `DashboardDiario`
   - `CalendarioEstudos`
   - `SessaoModal`
4. ⏳ Implementar validação de planos
5. ⏳ Testes end-to-end

---

## 🐛 Troubleshooting

### Erro: "function exec_sql does not exist"

Crie a função no Supabase:

```sql
CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
RETURNS void AS $$
BEGIN
  EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Erro: "permission denied"

Verifique se está usando `SUPABASE_SERVICE_ROLE_KEY` (não a chave anon).

---

## 📝 Notas Importantes

- **Backup:** Sempre faça backup antes de executar migrations em produção
- **Testes:** Execute primeiro em ambiente de desenvolvimento
- **RLS:** Certifique-se de que `auth.uid()` está configurado corretamente
- **Índices:** Todos os índices necessários já estão criados no schema
