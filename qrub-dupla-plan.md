# Plano de Implementação: QRub Dupla (MVP)

Data: 2026-03-19
Objetivo: Módulo isolado de estudo concorrente e sincronizado para dois usuários.

## FASE 1: Banco de Dados e Supabase Realtime (Backend)
- [ ] Criar tabela `duo_sessions` (state, configuração, participantes).
- [ ] Criar tabela `duo_session_participants` (metadata, status de presença e mídia).
- [ ] Criar tabela `duo_session_answers` (respostas individuais).
- [ ] Criar tabela `duo_session_messages` (chat).
- [ ] Criar tabela `duo_session_events` (histórico/event log para resiliência).
- [ ] Criar tabela `duo_session_results` (relatorio final).
- [ ] Configurar RLS (Row Level Security) e ativar Supabase Realtime (replicação e Broadcast/Presence) para essas tabelas.

## FASE 2: Camada de Serviços (Frontend/Backend Logic)
- [ ] Criar em `src/lib/` o serviço genérico `duo-service.ts` com tipagens completas.
- [ ] Implementar validação e criação de sala (Geração de códigos únicos `QRUB-DPL-XXXXXX`).
- [ ] Implementar engine Realtime `duo-realtime.ts` abstraindo os Handlers (Channels, Presence, Broadcast).
- [ ] Criar Error Boundaries e Providers React para o Engine de Sincronização.

## FASE 3: UI - Entrada, Sala de Espera, Configuração
- [ ] Implementar tela `DuoModuleHome` (Cards Geração/Input de Código).
- [ ] Implementar componente `DuoWaitingRoom` (Verificação de status e *Ready Check*).
- [ ] Implementar funcionalidade do Host de buscar de questões (`DuoContentSelector`), puxando IDs das mesas `questao_base`.

## FASE 4: UI - Sessão Ativa & Reidratação (Core Funcional)
- [ ] Construir o contêiner mestre de sessão `DuoSessionShell`.
- [ ] Criar componentes de Exibição das Questoes `DuoQuestionCard` + Respostas.
- [ ] Fluxo de Liberação de "Avançar" condicionado ao preenchimento mútuo.
- [ ] Tratamentos para lidar com dados vazios/ausentes e reidratação em reconexão total.
- [ ] Painel lateral com Chat nativo pelo Supabase Channels.

## FASE 5: Encerramento e Métricas
- [ ] Computação dos resultados do teste para ambos os usuários.
- [ ] Screen display para sumário de concordância x divergência.
- [ ] Integração final do menu/card de acesso no módulo de dashboard principal de Concursos.

> *Status da Fase Atual: Planejamento concluído e Arquitetura Validada. Em espera pela liberação da Fase 3 (Solutioning DB/Arquitetura).*
