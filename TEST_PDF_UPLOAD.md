# 🧪 Teste Manual: Upload de PDF no QRub

## ✅ Pré-requisitos
- Servidor dev rodando em `http://localhost:3000`
- Acesso ao painel admin (usuário MASTER)
- Um arquivo PDF qualquer para teste

## 📋 Passo a Passo

### 1. Acesse o Admin Panel
```
URL: http://localhost:3000/admin/database
```

### 2. Navegue até a aba "Editais & Caixinhas"
- Você verá um botão **"Novo Edital"** no canto superior direito
- Clique nele

### 3. Preencha o Formulário
Insira os seguintes dados:

| Campo | Valor |
|-------|-------|
| **Nome do Documento** | Teste Upload PDF QRub |
| **Instituição** | Teste Automatizado |
| **Ano** | 2024 |
| **Tipo de Prova** | Residência Médica |

### 4. Anexe um PDF
- Clique na área **"Anexar Edital PDF"**
- Selecione qualquer arquivo PDF do seu computador
- Você verá um ícone verde ✅ e o nome do arquivo quando selecionado

### 5. Abra o Console do Navegador
**Pressione F12** ou **Cmd+Option+I** (Mac) para abrir as DevTools

### 6. Clique em "Gerar Base de Estudo"
Observe os logs no console. Você deve ver:

```
📤 Iniciando upload do PDF: [nome-do-arquivo.pdf] ([tamanho] MB)
✅ Upload concluído: [timestamp]-[random].pdf
🔗 URL pública gerada: https://czguyzdbvqfyjsfwcpnh.supabase.co/storage/v1/object/public/blueprints/...
```

### 7. Verifique o Resultado

**✅ Sucesso se você ver:**
- Mensagem de sucesso: "Edital processado com sucesso!"
- O novo edital aparece na lista com status "Processado"
- 2 caixinhas foram criadas automaticamente

**❌ Erro se você ver:**
- Mensagem de erro no alert
- Logs de erro no console (começando com ❌)
- O formulário não fecha

## 🔍 Logs Esperados (Console)

### Upload Bem-Sucedido:
```javascript
📤 Iniciando upload do PDF: edital-teste.pdf (2.45 MB)
✅ Upload concluído: 1769947560148-abc123.pdf
🔗 URL pública gerada: https://czguyzdbvqfyjsfwcpnh.supabase.co/storage/v1/object/public/blueprints/1769947560148-abc123.pdf
```

### Erro de Upload:
```javascript
❌ Erro no upload do PDF: {
  message: "...",
  statusCode: "...",
  error: {...}
}
❌ Erro crítico no uploadPDF: Error: Falha no upload: ...
```

## 🐛 Troubleshooting

### Problema: "Bucket não encontrado"
**Solução:** O bucket `blueprints` já existe no Supabase. Verifique se está usando as credenciais corretas no `.env.local`

### Problema: "Permissão negada"
**Solução:** As políticas RLS do bucket estão configuradas como públicas. Isso não deve acontecer.

### Problema: "Arquivo muito grande"
**Solução:** Use um PDF menor que 50MB para teste.

## 📸 Screenshots Esperados

Tire screenshots de:
1. ✅ Formulário preenchido com PDF anexado
2. ✅ Console mostrando logs de sucesso
3. ✅ Lista de editais mostrando o novo item processado
4. ✅ Detalhes das caixinhas geradas

## ✅ Critérios de Aprovação

- [ ] PDF foi enviado para o Supabase Storage
- [ ] URL pública foi gerada corretamente
- [ ] Edital foi criado no banco de dados
- [ ] 2 caixinhas mock foram criadas automaticamente
- [ ] Status do edital mudou para "active"
- [ ] Nenhum erro apareceu no console

---

**🎯 Resultado Esperado:**
Após completar o teste, você deve ter um novo edital na lista com 2 caixinhas de estudo prontas para gerar questões.
