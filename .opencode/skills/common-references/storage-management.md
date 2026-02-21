# Storage Management in Playwright

Manage cookies, localStorage, and sessionStorage using Playwright's API.

## Common Operations (via `browser_run_code`)

### Authentication State Reuse
```javascript
// Set up authentication state
async page => {
  await page.evaluate(() => { 
    document.cookie = 'session=abc123'; 
    localStorage.setItem('user', 'john'); 
  });
}
```

### Setting Cookies with Options
```javascript
async page => {
  await page.context().addCookies([
    { 
      name: 'session_id', 
      value: 'sess_abc123', 
      domain: 'example.com', 
      path: '/', 
      httpOnly: true, 
      secure: true 
    }
  ]);
}
```

### Managing Local Storage
```javascript
async page => {
  await page.evaluate(() => {
    localStorage.setItem('token', 'jwt_abc123');
    localStorage.setItem('user_id', '12345');
    localStorage.setItem('theme', 'dark');
  });
}
```

### Managing Session Storage
```javascript
async page => {
  await page.evaluate(() => {
    sessionStorage.setItem('step', '3');
    sessionStorage.setItem('form_data', JSON.stringify({ name: 'John' }));
  });
}
```

### Clearing Storage
```javascript
async page => {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}
```

## Security Best Practices
- Never hardcode real production tokens in test scripts.
- Use environment variables for sensitive data.
- Ensure state files (if used) are added to `.gitignore`.
