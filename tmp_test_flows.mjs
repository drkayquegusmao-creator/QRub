import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("==> Iniciando teste do Fluxo SAÚDE...");
    await page.goto('http://localhost:3000');
    
    // Clica no botão Saúde no nav
    console.log("Clicando no botão de Saúde...");
    await page.click('text=Saúde');
    
    await page.waitForTimeout(2000);
    console.log("URL Atual (Deve ser /auth ou /saude):", page.url());

    // Fazer signup (se estiver no auth)
    if (page.url().includes('/auth')) {
        console.log("Preenchendo registro em /auth...");
        // Tentar encontrar os campos de auth (supondo que a página tem 'Email' e 'Senha' e um toggle pra Criar Conta)
        // Isso é genérico: vou preencher email
        try {
            await page.fill('input[type="email"]', `teste_saude_${Date.now()}@qrub.com`);
            const pwdInputs = await page.$$('input[type="password"]');
            for(let input of pwdInputs) {
                await input.fill('12345678');
            }
            await page.click('button[type="submit"]');
            await page.waitForTimeout(5000);
            console.log("URL Após Submit:', page.url()");
        } catch(e) {
            console.log("Não foi possível preencher formulário automaticamente. Error:", e.message.substring(0,50));
        }
    }

    console.log("Fim do Teste.");
    await browser.close();
})();
