# MASTER PROMPT: SISTEMA OPERACIONAL QRUB CONCURSO

**Objetivo:** Configurar a lógica comportamental, estrutural e de interconectividade dos módulos centrais do Qrub Concurso.
**Diretrizes de Execução:** O sistema deve operar sob a premissa de que o usuário é guiado por dados de desempenho. O foco é a eficiência cognitiva, redução de volume desnecessário e maximização da retenção a longo prazo.

---

## 1. MÓDULO: PLANO DE ESTUDO (O ORQUESTRADOR ADAPTATIVO)
O Plano de Estudo não é uma lista estática, mas a interface de comando do sistema.

### Definição e Estrutura:
* **Visualização:** Grid de cards por disciplina (Ex: Direito Constitucional, Português).
* **Métricas Exibidas por Card:**
    * **Completude:** Percentual de assuntos do edital já "vistos".
    * **Precisão Média:** Taxa de acerto real baseada no histórico total de questões daquela disciplina.
    * **Volume:** Contagem total de itens/questões resolvidos.
* **Hierarquia de Dados:** Disciplina > Assunto > Subtema. Cada assunto possui estados: `Não Iniciado`, `Em Progresso`, `Consolidado`.

### Lógica do Botão "Treinar Agora":
Ao ser acionado, o sistema deve executar o seguinte **Algoritmo de Priorização de Entrada**:
1.  **Prioridade 1 (Revisão Espaçada):** Verificar se existem itens com data de revisão ≤ hoje. Se sim, carregar sessão de SRS.
2.  **Prioridade 2 (Modo Recuperação):** Se não houver revisões, verificar se algum assunto em progresso caiu para `Força de Memória < 30%`.
3.  **Prioridade 3 (Nivelamento):** Se o usuário estiver estável, identificar o próximo assunto `Não Iniciado` e disparar o **Teste de Nivelamento Obrigatório**.

---

## 2. MÓDULO: TESTE DE NIVELAMENTO (A REGRA INQUEBRÁVEL)
Nenhum usuário inicia um assunto novo sem passar pelo filtro de nivelamento.

### Configuração da Sessão:
* **Quantidade:** Exatamente 10 questões (fixas).
* **Distribuição de Dificuldade (Mix):**
    * 3 questões de base conceitual (Fáceis).
    * 4 questões de aplicação prática (Médias).
    * 3 questões de nível complexo/jurisprudencial (Difíceis).
* **Sistema de Pesos:** Questão Fácil = Peso 1; Média = Peso 2; Difícil = Peso 3.

### Cálculo de Classificação:
* **Iniciante:** Se < 40%. O sistema inicia o SRS com intervalos curtos e maior densidade.
* **Intermediário:** 40% ≤ Se < 75%. O sistema foca em preencher lacunas e aumentar o espaçamento.
* **Avançado:** Se ≥ 75%. O assunto entra como "Consolidado" e o SRS foca apenas em manutenção.

---

## 3. MÓDULO: CENTRO DE SIMULADOS (A ARENA DE COMPETIÇÃO)
Ferramenta de diagnóstico macro e validação de progresso sob pressão.

### Funcionalidades:
* **Simulado Geral:** Prova completa baseada em editais específicos (PCDF, TSE, TJSP, etc.).
* **Simulado Inteligente:** O sistema gera uma prova personalizada baseada nos 20% de assuntos onde o usuário possui a menor `Precisão Média`.
* **Cronometragem Reversa:** Tempo de prova estrito com alerta de 15 minutos restantes.

### Integração Pós-Simulado (Fluxo de Dados):
* **Alimentação do Caderno de Erros:** Todo erro cometido em simulado é automaticamente tagueado e enviado ao Caderno de Erros com a etiqueta "Origem: Simulado".
* **Impacto no SRS:** Erros em simulados reduzem a `Força de Memória` do assunto correspondente em 50% mais do que erros em treinos comuns.

---

## 4. MÓDULO: CADERNO DE ERROS (O MOTOR DE CORREÇÃO)
Não é um arquivo de lixo, mas um módulo de reprocessamento cognitivo.

### Regras de Funcionamento:
* **Classificação Obrigatória:** Ao errar uma questão, o usuário deve selecionar o motivo: `Falta de Conhecimento`, `Desatenção`, `Interpretação` ou `Decoreba`.
* **Sessão de Expurgo:** O sistema gera sessões de "limpeza do caderno" onde o usuário resolve questões similares às que errou.
* **Modo de Recuperação Automática:** Se o sistema detectar 3 erros consecutivos no mesmo subtema, ele interrompe o Plano de Estudo e força uma "Sessão de Recuperação" de 10 questões focadas apenas naquele ponto cego.

---

## 5. MÓDULO: FAVORITOS (O CURADOR PESSOAL)
Permite a curadoria manual de itens de alta relevância estratégica.

### Funcionalidades:
* **Categorização:** O usuário pode favoritar por "Dificuldade", "Pegadinha de Banca" ou "Importante para Revisão de Véspera".
* **Filtro na Revisão:** Opção de incluir apenas questões favoritas na próxima sessão de estudo.
* **Integração de Peso:** Marcar uma questão como favorita aumenta sua probabilidade de reaparecer no ciclo de revisão (Boost de Prioridade).

---

## 6. LÓGICA DE INTEGRAÇÃO SRS (SPACED REPETITION SYSTEM)
A alma do Qrub que conecta todos os módulos acima.

* **Limite Adaptativo:** Sessões nunca excedem 10 questões para manter o foco (Micro-Learning).
* **Micro-Revisão Injetada:** Em sessões de conteúdo novo, o sistema deve injetar 2 ou 3 questões de assuntos antigos (com alta força de memória) para manter a base ativa sem cansar o usuário.
* **Agenda Inteligente:** A agenda deve ser recalculada a cada 24 horas, consolidando os dados do Caderno de Erros, Simulados e Favoritos para gerar o "Roteiro do Dia".

---

## NAVEGAÇÃO LATERAL (SIDEBAR)
A navegação lateral deve refletir exatamente esta estrutura:
1. Home
2. Plano de Estudo
3. Questões
4. Simulados
5. Revisão Espaçada
6. Agenda
7. Disciplinas
8. Assuntos
9. Caderno de Erros
10. Favoritos

**Nota Técnica:** Manter esquema de cores roxo/azul escuro. Não alterar o banco de dados de saúde.
