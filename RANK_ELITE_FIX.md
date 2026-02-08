# 🔴 PROBLEMA IDENTIFICADO: Rank Elite - Tabelas Não Criadas

## Diagnóstico

Ao clicar no módulo Rank Elite, aparece o erro:

```
Application error: a client-side exception has occurred while loading q-rub.vercel.app
```

### Causa Raiz

As **tabelas do Rank Elite não foram criadas no banco de dados Supabase**. O código tenta fazer queries em tabelas que não existem:

- `rank_seasons`
- `rank_leagues`
- `rank_profiles`
- `rank_xp_profiles`
- `rank_matches`
- `rank_mission_templates`
- `rank_user_missions`
- `rank_rewards`
- `rank_user_rewards`

### Evidência

No arquivo `src/store/use-rank-elite.ts`, linha 96-100, o código tenta buscar a temporada ativa:

```typescript
const { data: seasons, error: seasonErr } = await supabase
    .from('rank_seasons')
    .select('id, name')
    .eq('status', 'ACTIVE')
    .maybeSingle();
```

Como a tabela `rank_seasons` não existe, o Supabase retorna um erro, que é capturado e exibido na tela.

---

## ✅ Solução

### Opção 1: Aplicar Migração via Supabase CLI (Recomendado)

A migração já existe em: `supabase/migrations/20260207192448_rank_elite_schema.sql`

**Passos:**

1. **Linkar o projeto ao Supabase:**
   ```bash
   npx supabase login
   npx supabase link --project-ref yndqoytqwhgqijrvgqkw
   ```

2. **Aplicar a migração:**
   ```bash
   npx supabase db push
   ```

3. **Verificar se as tabelas foram criadas:**
   ```bash
   npx supabase db diff
   ```

---

### Opção 2: Executar SQL Manualmente no Dashboard do Supabase

Se não conseguir usar o CLI, você pode executar o SQL manualmente:

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard/project/yndqoytqwhgqijrvgqkw
2. Vá em **SQL Editor**
3. Cole o conteúdo do arquivo `supabase/migrations/20260207192448_rank_elite_schema.sql`
4. Execute o SQL

---

### Opção 3: Criar Script de Inicialização Automática

Adicionar verificação no código para criar tabelas automaticamente se não existirem (não recomendado para produção, mas útil para desenvolvimento):

**Arquivo:** `src/lib/init-rank-elite.ts`

```typescript
import { supabase } from './supabase';

export async function ensureRankEliteTables() {
  try {
    // Verifica se a tabela rank_seasons existe
    const { error } = await supabase
      .from('rank_seasons')
      .select('id')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.warn('⚠️ Tabelas do Rank Elite não encontradas. Execute a migração!');
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Erro ao verificar tabelas do Rank Elite:', err);
    return false;
  }
}
```

E chamar essa função antes de inicializar o módulo.

---

## 🧪 Teste Após Aplicar a Solução

Depois de criar as tabelas, teste novamente:

1. Recarregue a página
2. Clique em "Rank Elite"
3. Verifique se o lobby carrega corretamente
4. Confirme que não há mais erros no console

---

## 📊 Checklist de Verificação

- [ ] Tabelas criadas no Supabase
- [ ] Dados iniciais inseridos (Ligas e Season 1)
- [ ] RLS (Row Level Security) configurado
- [ ] Módulo Rank Elite abre sem erros
- [ ] Lobby renderiza com informações do usuário
- [ ] Botão "Jogar Agora" funciona

---

## 🔗 Arquivos Relacionados

- **Migração:** `supabase/migrations/20260207192448_rank_elite_schema.sql`
- **Store:** `src/store/use-rank-elite.ts`
- **Componente:** `src/components/rank-elite/index.tsx`
- **README:** `src/components/rank-elite/README.md`

---

## 💡 Próximos Passos

1. **Aplicar a migração** (escolha uma das opções acima)
2. **Testar o módulo** no navegador
3. **Verificar logs** do Supabase para confirmar que as queries funcionam
4. **Executar testes E2E** novamente para validar todas as funcionalidades
