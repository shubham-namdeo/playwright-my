const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.linkedin.com/login');

  console.log('👉 Log in manually, then press ENTER here');
  process.stdin.once('data', async () => {
    await context.storageState({ path: 'linkedin_state.json' });
    await browser.close();
    console.log('✅ Session saved');
  });
})();