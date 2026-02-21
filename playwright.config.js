const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    reporter: 'html',
    use: {
        browserName: 'chromium',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
});