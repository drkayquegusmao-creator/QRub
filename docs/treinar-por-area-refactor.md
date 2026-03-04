# Refatoração Treinar por Área

## Objetivos
Refatorar completamente o módulo "Treinar por Área", garantindo alta performance para bancos de dados com mais de 100 mil questões, estabelecendo fluxo de treinamento sem travamentos (anti tela branca), com prevenção de repetição de questões, rastreamento de histórico de respostas (acertos e erros) e modo de revisão.

## Tarefas de Banco de Dados (Supabase)
- [ ] Criar Índices: `idx_qb_specialty`, `idx_qb_subspecialty`, `idx_qb_subject`, `idx_qb_status`, `idx_qb_difficulty`
- [ ] Criar Views: `view_question_taxonomy`, `view_specialty_counts`
- [ ] Criar Tabelas: `user_question_history`, `training_sessions`, `client_errors`

## Frontend - Rota `/treinar-area`
- [ ] Construir layout (Título, Subtítulo).
- [ ] Dropdowns dinâmicos carregando da `view_specialty_counts` e `view_question_taxonomy`.
- [ ] Suporte a busca inteligente (pesquisar assunto específico).
- [ ] Filtros extras: Dificuldade (Qualquer, Fácil, Média, Difícil), Quantidade (10, 20, 30, 50), Modo (Aleatório, Sequencial).
- [ ] Resumo do total disponível e opção "Iniciar Treino".
- [ ] Cache no `localStorage` do último setup.

## Frontend - Rota `/treino-area`
- [ ] Buscar as questões aplicando todas as regras (Status ativo e aprovado, course medicina, etc).
- [ ] Regra Anti-Repetição: Excluir questões resolvidas nos últimos 30 dias pelo usuário E as últimas 200 respondidas globalmente.
- [ ] Lidar com tela branca: Try/Catch, timeout 10s, Loading/Error/Empty states, pular questões com opções inválidas no Parse do JSON.
- [ ] UI de execução da questão com breadcrumbs.
- [ ] Após escolha: mostrar correta/incorreta, gravação do histórico via chamada assíncrona p/ `user_question_history`.
- [ ] Progresso final com acertos, erros e percentual.
- [ ] Botões para treinar novamente e voltar.
- [ ] Botão "Modo Revisão" para re-treinar apenas os erros do usuário baseados no `user_question_history`.
