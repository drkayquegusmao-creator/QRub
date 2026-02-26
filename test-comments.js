const { chromium } = require('playwright');

(async () => {
    let browser;
    try {
        browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

        console.log('Navegando...');
        await page.goto('http://localhost:3000/dashboard/quiz/auto-test?mode=TREINO&count=1', { waitUntil: 'networkidle' });

        // Screenshot
        await page.screenshot({ path: 'test-screenshot.png', fullPage: true });

        console.log('Procurando pela Discussão...');
        const hasCommentsSection = await page.waitForSelector('text="Discussão da Questão"', { timeout: 15000 }).catch(() => null);

        if (hasCommentsSection) {
            console.log('✅ A seção "Discussão da Questão" existe!');
        } else {
            console.log('❌ A seção de comentários não apareceu.');
        }

    } catch (err) {
        console.error('❌ Erro:', err.message);
    } finally {
        if (browser) await browser.close();
    }
})();
