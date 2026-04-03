const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1360, height: 768 });
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot_test.png', fullPage: false });
    console.log('Screenshot taken: screenshot_test.png');
  } catch (e) {
    console.error("Navigation failed:", e);
  }
  await browser.close();
})();
