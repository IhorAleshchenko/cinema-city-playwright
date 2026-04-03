# Cinema City Playwright

As a movie fan, I chose [cinema-city.pl](https://www.cinema-city.pl/) as the subject of this test automation project. The goal was to simulate real user interactions with a familiar product while applying practical Playwright and TypeScript testing patterns.

This project focuses on building a clean, maintainable UI test framework that reflects real-world QA practices.
---

## Login Module

### Page Objects

The login flow is split across three dedicated page objects, each with a single responsibility:

| File | Responsibility |
|---|---|
| `pages/login.page.ts` | Login form locators and actions |
| `pages/reset-password.page.ts` | Forgot password page locators |
| `pages/register.page.ts` | Registration form locators |

All locators prefer `data-automation-id` attributes for stability. The `LoginPage` exposes a `logIn()` method representing the full reusable auth flow — see the note below on why it is not called in tests.

### Test Coverage (`tests/auth/login-tests.spec.ts`)

| Test | What it verifies |
|---|---|
| Display all required elements | Login heading, email/password inputs, forgot password link, register link, and URL |
| Validation errors on empty submit | Both required-field errors appear when form is submitted empty |
| Email format error | Invalid email input triggers the format validation alert |
| Password visibility toggle | Toggle switches input type between `password` and `text`, button label updates accordingly |
| Forgot password navigation | Clicking the link navigates to the reset password page with correct URL and elements |
| Registration form fields | Navigating to registration shows all expected inputs and the correct URL |
| Registration validation errors | Invalid email, weak password, and empty required fields all produce the correct error messages |
| Terms checkbox | Checkbox can be checked and unchecked, state is verified via DOM property |
| Marketing consent checkbox | Same pattern as terms checkbox |

### Authentication Note

The real login flow is protected by Cloudflare Turnstile (anti-bot). Automated end-to-end login via the UI was intentionally excluded to keep the suite stable.

In a real project, authentication would be handled via an API login request in `global-setup.ts`, saving a `storageState` that all tests consume — bypassing the UI and CAPTCHA entirely. The `logIn()` method in `LoginPage` demonstrates this pattern.

For local development, a manually generated `storageState.json` can be placed in the project root (it is excluded from version control).

---

## Tech Stack

- [Playwright](https://playwright.dev/) — test runner and browser automation
- TypeScript
- Page Object Model pattern
