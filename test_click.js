const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1360, height: 768 });
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('Page loaded. Clicking Entrar button...');
    await page.click('button:has-text("Entrar no Qrub Concurso")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot_modal.png', fullPage: false });
    console.log('Screenshot of modal taken: screenshot_modal.png');
  } catch (e) {
    console.error("Interaction failed:", e);
  }
  await browser.close();
})();
