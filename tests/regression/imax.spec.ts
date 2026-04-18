import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";
import { ImaxPage } from "../../pages/imax.page";

test.describe("@regression @imax Imax", () => {
  test.describe.configure({ retries: 1 });
  // Cloudflare may intercept on first load
  let header: Header;
  let imax: ImaxPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    imax = new ImaxPage(page);
    await header.imaxLink.click();
  });

  test("should open IMAX page", async ({ page }) => {
    await expect(page).toHaveURL(/\/imax/);
    await expect(imax.getToKnow).toBeVisible();
  });


  test("should display IMAX section heading", async () => {
    await expect(imax.imaxHeading).toBeVisible();
  });

  test("should display all cinema locations", async () => {
    await expect(imax.sadybaLink).toBeVisible();
    await expect(imax.poznanPlazaLink).toBeVisible();
    await expect(imax.punkt44Link).toBeVisible();
    await expect(imax.manufakturaLink).toBeVisible();
    await expect(imax.wroclaviaLink).toBeVisible();
    await expect(imax.zakopiankaLink).toBeVisible();
  });

  test("should have correct hrefs for cinema locations", async () => {
    await imax.assertLinksHref([
      { locator: imax.sadybaLink,      expectedHref: /\/kina\/sadyba/ },
      { locator: imax.poznanPlazaLink, expectedHref: /\/kina\/poznanplaza/ },
      { locator: imax.punkt44Link,     expectedHref: /\/kina\/punkt44/ },
      { locator: imax.manufakturaLink, expectedHref: /\/kina\/manufaktura/ },
      { locator: imax.wroclaviaLink,   expectedHref: /\/kina\/wroclavia/ },
      { locator: imax.zakopiankaLink,  expectedHref: /\/kina\/zakopianka/ },
    ]);
  });

  test("should open more about IMAX page", async ({ page }) => {
    await expect(page).toHaveURL(/\/imax/);
    await expect(imax.moreAboutImax).toBeVisible();
  });

});
