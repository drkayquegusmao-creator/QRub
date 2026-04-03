const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(3000);
  } catch (e) {
    console.error("Navigation failed:", e);
  }
  await browser.close();
})();
