import { test, expect } from '@playwright/test';

test('@demo Scrape top 5 Hacker News headlines', async ({ page }) => {
    // Use environment variable if available, otherwise fallback to hardcoded URL
    // Matches the requested structure using process.env
    const url = process.env.HN_APP_URL || 'https://news.ycombinator.com';
    await page.goto(url);

    // Wait for the headline elements to be present
    await page.waitForSelector('.titleline > a');

    // Extract the top 5 headlines
    const headlines = await page.$$eval('.titleline > a', (anchors) => {
        return anchors.slice(0, 5).map(anchor => anchor.innerText);
    });

    console.log('Top 5 Hacker News Headlines:');
    headlines.forEach((headline, index) => {
        console.log(`${index + 1}. ${headline}`);
    });

    // Verify we got 5 headlines
    expect(headlines.length).toBe(5);

    // Keep browser open for a few seconds (optional for visibility)
    await page.waitForTimeout(2000);
});
