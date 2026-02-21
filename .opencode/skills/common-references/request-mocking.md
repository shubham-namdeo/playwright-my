# Request Mocking in Playwright

Intercept, mock, modify, and block network requests using Playwright's `page.route` API.

## Core Concepts

### URL Patterns
- `**/api/users` - Exact path match
- `**/api/*/details` - Wildcard in path
- `**/*.{png,jpg,jpeg}` - Match file extensions
- `**/search?q=*` - Match query parameters

## Common Patterns (via `browser_run_code`)

### Conditional Response Based on Request
```javascript
async page => {
  await page.route('**/api/login', route => {
    const body = route.request().postDataJSON();
    if (body.username === 'admin') {
      route.fulfill({ body: JSON.stringify({ token: 'mock-token' }) });
    } else {
      route.fulfill({ status: 401, body: JSON.stringify({ error: 'Invalid' }) });
    }
  });
}
```

### Modify Real Response
```javascript
async page => {
  await page.route('**/api/user', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.isPremium = true;
    await route.fulfill({ response, json });
  });
}
```

### Simulate Network Failures
```javascript
async page => {
  await page.route('**/api/offline', route => route.abort('internetdisconnected'));
}
// Options: connectionrefused, timedout, connectionreset, internetdisconnected
```

### Delayed Response
```javascript
async page => {
  await page.route('**/api/slow', async route => {
    await new Promise(r => setTimeout(r, 3000));
    route.fulfill({ body: JSON.stringify({ data: 'loaded' }) });
  });
}
```
