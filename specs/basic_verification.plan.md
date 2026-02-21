# Basic Playwright Verification Plan

## Application Overview

This plan outlines the steps to verify that Playwright is correctly configured and can interact with a live website. We will use example.com as a simple, stable target.

## Test Scenarios

### 1. Verification Suite

**Seed:** `seed.spec.ts`

#### 1.1. Verify Homepage Load

**File:** `tests/verification.spec.ts`

**Steps:**
  1. Navigate to https://example.com
    - expect: The URL should be 'https://example.com/'
    - expect: The page title should be 'Example Domain'
  2. Check for specific text content on the page
    - expect: The text 'More information...' should be visible on the page
