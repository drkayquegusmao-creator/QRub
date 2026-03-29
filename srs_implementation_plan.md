# SRS Implementation Plan: Módulo de Revisão Espaçada

## FASE 1: Banco de Dados e Migração (Backend)
1. **Nova Tabela:** `concurso_user_srs`
   - Campos: `user_id`, `questao_id`, `disciplina_id`, `subtema_id`, `peso`, `status` (novo, em_revisao, em_risco), `intervalo_dias`, `proxima_revisao`, `facilidade` (2.5 default), `repeticoes`, `forca_memoria` (0-100), `sequencia_acertos`, `sequencia_erros`, `historico` (JSON array).
2. **Setup Legacy:** Criar edge function ou script que valide quem já respondeu questões (`concurso_user_respostas`) e crie uma carga SRS inicial com `status: "novo"` e `repeticoes: 0`.

## FASE 2: Motor Inteligente (Sessões)
1. **Fábrica de Sessão (PostgreSQL RPC ou Next.js API):**
   - Buscar até **10 questões** baseadas nas regras de priorização:
     1. Atrasadas.
     2. Status "Em Risco" (força < 40 ou erros > 40%).
     3. Revisão Agendada (proxima_revisao <= hoje).
     4. Novas (baseadas no ciclo/edital atual do usuário).
   - Ajuste dinâmico do limite local (máximo absoluto de 10).

## FASE 3: Algoritmo Adaptativo
1. **Ponderação e Atualização:**
   - Criar `updateSRSProfile(userId, questaoId, isCorrect, difficulty)` no `src/store/concursos/use-quiz.ts` ou via backend.
   - Regras Matemáticas:
     - **Errou:** Volta `intervalo` para 1, `forca_memoria` reduz 25, `sequencia_erros` ++.
     - **Acertou:** Aumenta `repeticoes`, `forca_memoria` aumenta 15. Calcula o salto dos dias (2, 5, 10, 20...).
     - **Modo Recuperação Threshold:** Força < 40 ou 3 erros mapeia a disciplina para "Em Risco".

## FASE 4: UI e Frontend (Visão do Usuário)
1. **Dashboard SRS (Overview):**
   - Mostrar `Força de Memória Geral`.
   - Cards com as Sessões Pendentes listadas.
   - Alerta Crítico (Em Risco) exibindo recuperação imediata.
2. **Sessão Prática:**
   - Forçar limite de 10 na UI de Quiz (já existente, adaptar a listagem gerada pelo backend).
   - Fallback Anti-tela Branca com Call To Action de Nivelamento.
