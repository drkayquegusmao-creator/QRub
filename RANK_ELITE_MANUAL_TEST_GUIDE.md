# 🎮 Guia de Teste Manual - Rank Elite Module

**URL:** http://localhost:3000  
**Data:** 2026-02-07  
**Navegador Aberto:** ✅ Sim

---

## 📋 Checklist de Testes

Use este guia para testar manualmente o módulo Rank Elite no navegador. Marque cada item conforme for testando.

---

## 1️⃣ ACESSO À APLICAÇÃO

### Passo 1: Verificar Página Inicial
- [ ] A aplicação carregou em http://localhost:3000?
- [ ] Você está na página de login ou dashboard?

### Passo 2: Fazer Login (se necessário)
Se estiver na página de login:
- [ ] Tente fazer login com credenciais de teste
- [ ] Ou procure por um botão "Demo" ou "Continuar sem login"
- [ ] Conseguiu acessar o dashboard?

**Ação:** Faça login ou acesse o dashboard principal

---

## 2️⃣ ABRIR O RANK ELITE

### Passo 3: Localizar o Botão Rank Elite
No dashboard, procure por:
- [ ] Um botão com o texto "Rank Elite"
- [ ] Um ícone de coroa (👑)
- [ ] Cor âmbar/dourada ou amarela
- [ ] O botão está visível?

### Passo 4: Clicar no Botão
- [ ] Clique no botão "Rank Elite"
- [ ] Um modal/overlay foi aberto?
- [ ] A animação de abertura funcionou suavemente?

**Ação:** Abra o modal do Rank Elite

---

## 3️⃣ VERIFICAR ELEMENTOS DO LOBBY

### Passo 5: Elementos do Cabeçalho
Verifique se você vê:
- [ ] Título "RANK ELITE" em destaque
- [ ] Informação da season (ex: "Season 1: Genesis")
- [ ] Nome do usuário
- [ ] Nível do usuário (XP)
- [ ] Botão de fechar (X) no canto superior direito

### Passo 6: Informações de Liga
Verifique se você vê:
- [ ] Badge/emblema da liga atual (BRONZE, SILVER, GOLD, etc.)
- [ ] Nome da liga por extenso
- [ ] Pontos da season (ex: "1500 PONTOS DA SEASON")
- [ ] Barra de progresso ou indicador visual

### Passo 7: Botão "Jogar Agora"
- [ ] O botão "Jogar Agora" está visível?
- [ ] O botão tem um design destacado (cores vibrantes)?
- [ ] O botão está habilitado (não desabilitado/cinza)?

### Passo 8: Seção de Missões
Verifique se você vê:
- [ ] Título "Missões" ou similar
- [ ] Cards de missões individuais
- [ ] Cada missão mostra:
  - [ ] Nome da missão
  - [ ] Descrição
  - [ ] Progresso (ex: "5/10 partidas")
  - [ ] Recompensa (XP ou pontos)
- [ ] Alguma missão está completa?
- [ ] Se sim, há um botão "RESGATAR"?

### Passo 9: Botões de Navegação
- [ ] Botão "Recompensas & Nível" está visível?
- [ ] Outros botões de navegação (se houver)?

### Passo 10: Admin (se aplicável)
**Apenas se você estiver logado como admin:**
- [ ] Você vê um botão "Admin Rank Elite"?
- [ ] O botão tem ícone de configurações (⚙️)?

**Screenshot sugerido:** Tire um print da tela mostrando todo o lobby

---

## 4️⃣ TESTAR FUNCIONALIDADES

### Teste A: Iniciar Partida
1. [ ] Clique no botão "Jogar Agora"
2. O que aconteceu?
   - [ ] Abriu uma tela de seleção de modo?
   - [ ] Iniciou uma partida diretamente?
   - [ ] Apareceu uma arena com questões?
   - [ ] Mostrou alguma mensagem de erro?

**Anote o resultado:**
```
_____________________________________________
_____________________________________________
```

### Teste B: Resgatar Missão
**Apenas se houver missões completas:**
1. [ ] Localize uma missão com botão "RESGATAR"
2. [ ] Clique no botão "RESGATAR"
3. O que aconteceu?
   - [ ] Apareceu uma mensagem de sucesso?
   - [ ] Os pontos/XP foram atualizados?
   - [ ] O botão mudou de estado?
   - [ ] Houve alguma animação?

**Anote o resultado:**
```
_____________________________________________
_____________________________________________
```

### Teste C: Navegar para Recompensas
1. [ ] Clique no botão "Recompensas & Nível"
2. [ ] A view mudou para mostrar recompensas?
3. O que você vê na tela de Recompensas?
   - [ ] Título "Linha do Tempo de Recompensas"
   - [ ] Lista de níveis e recompensas
   - [ ] Nível atual destacado
   - [ ] Recompensas já desbloqueadas
   - [ ] Recompensas futuras bloqueadas

**Screenshot sugerido:** Tire um print da view de Recompensas

**Anote o resultado:**
```
_____________________________________________
_____________________________________________
```

4. [ ] Volte para o lobby (deve ter um botão "Voltar" ou similar)
5. [ ] Conseguiu voltar para o lobby normalmente?

### Teste D: Admin Dashboard (apenas admin)
**Pule este teste se não for admin:**
1. [ ] Clique no botão "Admin Rank Elite"
2. [ ] Abriu o painel de admin?
3. O que você vê?
   - [ ] Título "ADMIN RANK ELITE"
   - [ ] Opções de gerenciamento
   - [ ] Estatísticas gerais

**Anote o resultado:**
```
_____________________________________________
_____________________________________________
```

### Teste E: Fechar Modal
1. [ ] Clique no botão X (fechar) no canto superior direito
2. [ ] O modal fechou?
3. [ ] Você voltou para o dashboard principal?
4. [ ] A animação de fechamento funcionou suavemente?

---

## 5️⃣ TESTES DE RESPONSIVIDADE (Opcional)

### Teste F: Diferentes Tamanhos de Tela
1. [ ] Redimensione a janela do navegador
2. [ ] Abra o Rank Elite novamente
3. [ ] O layout se adapta corretamente?
4. [ ] Todos os elementos estão visíveis?
5. [ ] Não há overflow ou corte de conteúdo?

### Teste em Mobile (Simulado)
1. [ ] Abra o DevTools (F12)
2. [ ] Ative o modo de dispositivo móvel (Toggle device toolbar)
3. [ ] Selecione um dispositivo (ex: iPhone 12)
4. [ ] Abra o Rank Elite
5. [ ] A interface está responsiva?
6. [ ] Todos os botões são clicáveis?

---

## 6️⃣ VERIFICAÇÃO DE ERROS

### Console do Navegador
1. [ ] Abra o Console do DevTools (F12 → Console)
2. [ ] Há algum erro vermelho?
3. [ ] Há algum warning amarelo relacionado ao Rank Elite?

**Se houver erros, anote aqui:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```

### Network Tab
1. [ ] Abra a aba Network no DevTools
2. [ ] Recarregue a página
3. [ ] Abra o Rank Elite
4. [ ] Alguma requisição falhou (status 400, 500)?
5. [ ] As imagens/assets carregaram corretamente?

**Se houver falhas, anote aqui:**
```
_____________________________________________
_____________________________________________
```

---

## 7️⃣ CHECKLIST VISUAL

### Design e Estética
- [ ] As cores do Rank Elite condizem com o tema (âmbar/dourado)?
- [ ] As fontes estão legíveis?
- [ ] Os ícones estão renderizando corretamente?
- [ ] Não há sobreposição de elementos?
- [ ] Os espaçamentos estão adequados?
- [ ] As animações são suaves (sem travamentos)?

### Acessibilidade Básica
- [ ] Você consegue navegar usando Tab (teclado)?
- [ ] Os botões têm feedback visual ao passar o mouse (hover)?
- [ ] Os textos têm contraste adequado?

---

## 📝 RELATÓRIO FINAL

### Resumo dos Testes
Preencha após completar todos os testes:

**Total de testes executados:** _____  
**Testes bem-sucedidos:** _____  
**Testes com falha:** _____  
**Problemas encontrados:** _____

### Problemas Identificados
Liste todos os problemas encontrados:

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________
4. _______________________________________________
5. _______________________________________________

### Sugestões de Melhoria
Liste sugestões para melhorar o módulo:

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Status Final
Marque o status final do módulo Rank Elite:

- [ ] ✅ **APROVADO** - Tudo funcionando perfeitamente
- [ ] ⚠️ **APROVADO COM RESSALVAS** - Funciona, mas há pequenos problemas
- [ ] ❌ **REPROVADO** - Problemas críticos impedem o uso

---

## 🎯 Conclusão

**Data do teste:** __________________  
**Testado por:** __________________  
**Tempo total de teste:** __________________

**Observações finais:**
```
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## 📸 Screenshots Recomendados

Para documentação completa, tire screenshots de:

1. [ ] Lobby principal do Rank Elite
2. [ ] Seção de missões (com detalhes)
3. [ ] View de Recompensas & Nível
4. [ ] Admin Dashboard (se aplicável)
5. [ ] Qualquer erro encontrado
6. [ ] Vista mobile (responsividade)

---

**🚀 Boa sorte com os testes!**

Se encontrar qualquer problema, documente com screenshots e descrições detalhadas para facilitar a correção.
