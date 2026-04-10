import { test as base, Response } from "@playwright/test";

const CINEMA_CITY_DOMAIN = "cinema-city.pl";

export const test = base.extend<{ page: typeof base.prototype["page"] }>({
  page: async ({ page }, use, testInfo) => {
    const errors: string[] = [];

    page.on("response", (response: Response) => {
      const url = response.url();
      const status = response.status();

      if (!url.includes(CINEMA_CITY_DOMAIN)) return;

      if (status >= 500) {
        errors.push(`[${status}] ${url}`);
      }

      if (status === 404 && !url.includes("/static/")) {
        errors.push(`[404] ${url}`);
      }
    });

    await use(page);

    if (errors.length > 0) {
      throw new Error(
        `HTTP errors detected on ${CINEMA_CITY_DOMAIN}:\n${errors.join("\n")}`
      );
    } else {
      console.log(`✓ [${testInfo.title}] No HTTP errors detected on ${CINEMA_CITY_DOMAIN}`);
    }
  },
});

export { expect } from "@playwright/test";

/**
 * errorListener fixture — HTTP response monitoring layer
 *
 * Functional tests verify UI behavior: buttons, navigation, modals.
 * But a page can look correct while a server-side failure happens silently underneath.
 * This fixture adds a second assertion layer by monitoring HTTP responses during every test.
 *
 * What it catches:
 *   - 5xx responses: server errors on cinema-city.pl resources (broken API, server crash)
 *   - 404 responses: missing internal resources (excluding /static/ assets)
 *
 * What it ignores:
 *   - All third-party domains (analytics, ads, CDNs) — we don't own those
 *   - /static/ 404s — expected for optional assets like images
 *
 * After each test, if any errors were collected the test fails with the list of
 * affected URLs. If none were found, a confirmation is logged to the console.
 *
 * Applied to: smoke tests only (as a baseline — extend to other suites once stable)
 */
