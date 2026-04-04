# Cinema City Playwright

As a movie fan, I chose [cinema-city.pl](https://www.cinema-city.pl/) as the subject of this test automation project. The goal was to simulate real user interactions with a familiar product while applying practical Playwright and TypeScript testing patterns.

This project focuses on building a clean, maintainable UI test framework that reflects real-world QA practices.

---

## How to Run Tests

```bash
npm install
npx playwright install
npx playwright test
```

---

## Project Structure

```
pages/           Page Objects (POM)
tests/           Test suites (smoke, regression, auth)
helpers/         Utility logic (e.g. date handling)
test-data/       Test data
global-setup.ts  Pre-test setup (cookies, storage state)
```

---

## Testing Principles

- Prefer stable selectors (`data-automation-id`) over CSS class names or XPath
- Avoid hardcoded data — use dynamic dates and dynamic locators where possible
- Separate UI logic from utility logic (helpers vs page objects)
- Keep tests readable by encapsulating multi-step actions in page object methods
- Handle external blockers (e.g. Cloudflare) gracefully and document the reason

---

## Known Limitations

The target site uses Cloudflare Turnstile (anti-bot protection) on login and checkout flows. As a result:

- Automated end-to-end login via the UI is not included — the suite covers login page UI validation instead
- The `logIn()` method in `LoginPage` exists to demonstrate the pattern but is not called in tests
- In a real project, authentication would be handled via an API login request in `global-setup.ts`, saving a `storageState` that all tests consume

For local development, a manually generated `storageState.json` can be placed in the project root. It is excluded from version control.

---

## Login Module

### Page Objects

The login flow is split across three dedicated page objects, each with a single responsibility:

| File | Responsibility |
|---|---|
| `pages/login.page.ts` | Login form locators and actions |
| `pages/reset-password.page.ts` | Forgot password page locators |
| `pages/register.page.ts` | Registration form locators |

All locators prefer `data-automation-id` attributes for stability.

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

---

## Header Module

### Page Object

| File | Responsibility |
|---|---|
| `pages/components/header.component.ts` | All header locators and reusable navigation actions |

Key design decisions:
- `getSelectedCinemaLabel(cinemaName: string)` is a method rather than a fixed locator, so it works for any cinema name selected in tests
- Multi-step interactions (language switch, cinema selection, search) are wrapped in named methods, keeping tests readable
- `data-automation-id` attributes used where available for selector stability

### Test Coverage (`tests/smoke/header-navigation.spec.ts`)

| Test | What it verifies |
|---|---|
| Language switch | Switching to English shows "What's On" link; switching back shows "Repertuar" |
| Cinema search | Searching by name and clicking the result navigates to the correct repertoire page and URL |
| Navigate to registration | Clicking the register button opens the registration page with the correct heading |
| Navigate to login | Clicking the login button opens the login modal with the correct heading |
| Select a cinema | Selecting a cinema from the picker shows the cinema name in the header |
| Logo navigation | Clicking the Cinema City logo from any page returns to the homepage |

---

## What's On Module

### Page Object & Helper

| File | Responsibility |
|---|---|
| `pages/whats-on.page.ts` | All What's On locators, movie/showtime/date picker actions |
| `helpers/dateHelper.ts` | Pure date math — no Playwright, builds Polish-language aria-labels |

Key design decisions:
- `dateHelper.ts` is kept separate from the page object — date logic has zero Playwright dependency and can be reasoned about in isolation
- `findNextActiveDay()` dynamically skips disabled calendar days rather than relying on hardcoded dates, making tests stable across weeks
- Disabled days are detected by checking `button count === 0` in the DOM, which is how Cinema City marks them (no `<button>` rendered at all)
- Date picker methods are `private`/`public` split — internal locator logic is hidden from tests

### Test Coverage (`tests/smoke/whats-on.spec.ts`)

| Test | What it verifies |
|---|---|
| Open first movie | Clicking the first movie navigates to the correct film page and URL |
| Open purchase window | Buy Ticket → showtime → modal shows login, register, and guest options |
| Filter by Dolby Atmos | Selecting Dolby Atmos from the screening type dropdown applies the filter |
| Navigate days sequentially | Clicking each enabled day in the strip advances the selected date forward |
| Open movie from dropdown | Selecting a movie from the dropdown navigates to the correct film heading |
| Display today in date picker | Opening the calendar popup shows today's date button |
| Select next available day | Finds the first non-disabled day, clicks it, and verifies the date heading updates |

---

## Tech Stack

- [Playwright](https://playwright.dev/) — test runner and browser automation
- TypeScript
- Page Object Model pattern
