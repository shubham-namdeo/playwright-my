const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    use: {
        browserName: 'chromium',
    },
});