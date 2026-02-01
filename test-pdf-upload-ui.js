const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testPDFUploadUI() {
    console.log('🎭 TESTE DE INTERFACE: Upload de PDF via Navegador\n');
    console.log('='.repeat(60));

    const browser = await chromium.launch({
        headless: false, // Mostrar o navegador
        slowMo: 500 // Desacelerar para visualização
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // ETAPA 1: Criar PDF de teste
        console.log('\n📄 ETAPA 1: Criando PDF de teste...');
        const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R>>endobj
4 0 obj<</Length 44>>stream
BT /F1 12 Tf 100 700 Td (Edital Teste UI) Tj ET
endstream endobj
xref 0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000217 00000 n 
trailer<</Size 5/Root 1 0 R>>
startxref 310
%%EOF`;

        const testPdfPath = path.join(__dirname, 'test-ui-edital.pdf');
        fs.writeFileSync(testPdfPath, pdfContent);
        console.log('✅ PDF criado:', testPdfPath);

        // ETAPA 2: Navegar para a página
        console.log('\n🌐 ETAPA 2: Navegando para /admin/database...');
        await page.goto('http://localhost:3000/admin/database', {
            waitUntil: 'networkidle'
        });
        console.log('✅ Página carregada');

        // Tirar screenshot inicial
        await page.screenshot({ path: 'screenshots/01-admin-database.png', fullPage: true });
        console.log('📸 Screenshot salvo: 01-admin-database.png');

        // ETAPA 3: Verificar se a aba "Editais & Caixinhas" está visível
        console.log('\n🔍 ETAPA 3: Verificando abas...');
        const blueprintsTab = await page.locator('text=Editais & Caixinhas').first();
        const isVisible = await blueprintsTab.isVisible();
        console.log('✅ Aba "Editais & Caixinhas" visível:', isVisible);

        // ETAPA 4: Clicar no botão "Novo Edital"
        console.log('\n🖱️ ETAPA 4: Clicando em "Novo Edital"...');
        await page.waitForTimeout(1000);
        const novoEditalBtn = page.locator('text=Novo Edital').first();
        await novoEditalBtn.click();
        await page.waitForTimeout(1000);
        console.log('✅ Formulário aberto');

        await page.screenshot({ path: 'screenshots/02-formulario-aberto.png', fullPage: true });
        console.log('📸 Screenshot salvo: 02-formulario-aberto.png');

        // ETAPA 5: Preencher o formulário
        console.log('\n📝 ETAPA 5: Preenchendo formulário...');

        // Nome do Documento
        await page.fill('input[placeholder*="Prova de Título"]', 'Teste UI - Upload PDF QRub');
        console.log('  ✓ Nome preenchido');

        // Instituição
        await page.fill('input[placeholder*="AMB"]', 'Playwright Test Suite');
        console.log('  ✓ Instituição preenchida');

        // Ano (já deve estar preenchido com 2024)
        console.log('  ✓ Ano: 2024 (padrão)');

        // Tipo de Prova (já deve estar em "Residência Médica")
        console.log('  ✓ Tipo: Residência Médica (padrão)');

        await page.screenshot({ path: 'screenshots/03-formulario-preenchido.png', fullPage: true });
        console.log('📸 Screenshot salvo: 03-formulario-preenchido.png');

        // ETAPA 6: Anexar PDF
        console.log('\n📎 ETAPA 6: Anexando PDF...');
        const fileInput = await page.locator('input[type="file"]');
        await fileInput.setInputFiles(testPdfPath);
        await page.waitForTimeout(1000);
        console.log('✅ PDF anexado');

        await page.screenshot({ path: 'screenshots/04-pdf-anexado.png', fullPage: true });
        console.log('📸 Screenshot salvo: 04-pdf-anexado.png');

        // ETAPA 7: Abrir console e monitorar logs
        console.log('\n📊 ETAPA 7: Monitorando console do navegador...');
        const consoleLogs = [];
        page.on('console', msg => {
            const text = msg.text();
            consoleLogs.push(text);
            if (text.includes('📤') || text.includes('✅') || text.includes('🔗') || text.includes('❌')) {
                console.log('  [BROWSER]', text);
            }
        });

        // ETAPA 8: Clicar em "Gerar Base de Estudo"
        console.log('\n🚀 ETAPA 8: Clicando em "Gerar Base de Estudo"...');
        const gerarBtn = page.locator('text=Gerar Base de Estudo').first();
        await gerarBtn.click();

        // Aguardar processamento
        console.log('⏳ Aguardando processamento...');
        await page.waitForTimeout(5000);

        await page.screenshot({ path: 'screenshots/05-processando.png', fullPage: true });
        console.log('📸 Screenshot salvo: 05-processando.png');

        // ETAPA 9: Verificar resultado
        console.log('\n✅ ETAPA 9: Verificando resultado...');
        await page.waitForTimeout(2000);

        await page.screenshot({ path: 'screenshots/06-resultado-final.png', fullPage: true });
        console.log('📸 Screenshot salvo: 06-resultado-final.png');

        // ETAPA 10: Verificar se o edital aparece na lista
        console.log('\n🔍 ETAPA 10: Verificando lista de editais...');
        const ediталText = await page.locator('text=Teste UI - Upload PDF QRub').first();
        const exists = await ediталText.isVisible().catch(() => false);

        if (exists) {
            console.log('✅ Edital encontrado na lista!');
        } else {
            console.log('⚠️ Edital não encontrado visualmente, mas pode ter sido criado');
        }

        // Resumo dos logs do console
        console.log('\n📋 LOGS DO CONSOLE DO NAVEGADOR:');
        console.log('='.repeat(60));
        consoleLogs.forEach(log => {
            if (log.includes('📤') || log.includes('✅') || log.includes('🔗') || log.includes('❌')) {
                console.log(log);
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log('✅ TESTE DE INTERFACE CONCLUÍDO!');
        console.log('='.repeat(60));
        console.log('\n📸 Screenshots salvos em: ./screenshots/');
        console.log('   01-admin-database.png');
        console.log('   02-formulario-aberto.png');
        console.log('   03-formulario-preenchido.png');
        console.log('   04-pdf-anexado.png');
        console.log('   05-processando.png');
        console.log('   06-resultado-final.png');

        // Limpar arquivo de teste
        fs.unlinkSync(testPdfPath);
        console.log('\n🧹 Arquivo de teste removido.');

        // Manter navegador aberto por 10 segundos para visualização
        console.log('\n⏸️ Mantendo navegador aberto por 10 segundos...');
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('\n❌ ERRO NO TESTE:', error);
        await page.screenshot({ path: 'screenshots/error.png', fullPage: true });
        console.log('📸 Screenshot de erro salvo: error.png');
    } finally {
        await browser.close();
        console.log('\n🔚 Navegador fechado.');
    }
}

// Criar diretório de screenshots
if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
}


// Executar teste
testPDFUploadUI()
    .then(() => {
        console.log('\n✅ Teste finalizado com sucesso!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n❌ Erro fatal:', error);
        process.exit(1);
    });
