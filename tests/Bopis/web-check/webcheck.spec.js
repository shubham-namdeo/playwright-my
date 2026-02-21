const { chromium } = require('playwright');
const fs = require('fs');

const KEYWORDS = ['returns', 'ecommerce pricing', 'retailtech', 'omnichannel', 'retail', 'nrf2026', 'retail management' ];
const TARGET_PEOPLE = ['Nicholas Di Cuia', 'Anil Patel'];

function extractNumber(text = '') {
  const match = text.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: 'linkedin_state.json'
  });
  const page = await context.newPage();

  const query = KEYWORDS.join(' ');
  const url = `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(query)}`;

  await page.goto(url, { waitUntil: 'networkidle' });

  // Scroll for more posts
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(3000);
  }

  const posts = await page.$$eval(
    'div.feed-shared-update-v2',
    (cards, KEYWORDS, TARGET_PEOPLE) => {
      return cards.map(card => {
        const text = card.innerText || '';

        const hasKeyword = KEYWORDS.some(k =>
          text.toLowerCase().includes(k.toLowerCase())
        );
        const hasPerson = TARGET_PEOPLE.some(p =>
          text.toLowerCase().includes(p.toLowerCase())
        );

        if (!hasKeyword || !hasPerson) return null;

        const getText = sel => {
          const el = card.querySelector(sel);
          return el ? el.innerText : '0';
        };

        return {
          authorMatch: TARGET_PEOPLE.filter(p =>
            text.toLowerCase().includes(p.toLowerCase())
          ),
          text: text.slice(0, 400),
          likes: getText('span[aria-label*="like"]'),
          comments: getText('button[aria-label*="comment"]'),
          reposts: getText('button[aria-label*="repost"]')
        };
      }).filter(Boolean);
    },
    KEYWORDS,
    TARGET_PEOPLE
  );

  // Normalize engagement
  posts.forEach(p => {
    p.likes = extractNumber(p.likes);
    p.comments = extractNumber(p.comments);
    p.reposts = extractNumber(p.reposts);
    p.engagementScore = p.likes + (2 * p.comments) + (3 * p.reposts);
  });

  // Sort by engagement
  posts.sort((a, b) => b.engagementScore - a.engagementScore);

  console.table(posts.slice(0, 10));

  fs.writeFileSync('linkedin_posts.json', JSON.stringify(posts, null, 2));

  await browser.close();
})();
