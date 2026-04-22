import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";
import { ImaxPage } from "../../pages/imax.page";

test.describe("@regression @imax Imax", () => {
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

  test("should have correct hrefs for cinema locations", async () => {
    await imax.assertLinksHref([
      { locator: imax.sadybaLink, expectedHref: /\/kina\/sadyba/ },
      { locator: imax.poznanPlazaLink, expectedHref: /\/kina\/poznanplaza/ },
      { locator: imax.punkt44Link, expectedHref: /\/kina\/punkt44/ },
      { locator: imax.manufakturaLink, expectedHref: /\/kina\/manufaktura/ },
      { locator: imax.wroclaviaLink, expectedHref: /\/kina\/wroclavia/ },
      { locator: imax.zakopiankaLink, expectedHref: /\/kina\/zakopianka/ },
    ]);
  });

  test("should switch between tabs correctly", async () => {
    await imax.moreAboutImax.click();
    await expect(imax.moreAboutImax).toHaveAttribute("aria-selected", "true");
    await imax.getToKnow.click();
    await expect(imax.getToKnow).toHaveAttribute("aria-selected", "true");
    await expect(imax.moreAboutImax).toHaveAttribute("aria-selected", "false");
  });

  test("should display Experience IMAX content headings", async () => {
    await imax.moreAboutImax.click();
    await expect(imax.filmAdventureHeading).toBeVisible();
    await expect(imax.imaxWithLaserHeading).toBeVisible();
  });

  test("should display video slider on Experience tab", async () => {
    await imax.getToKnow.click();

    await expect(imax.videoSlider).toBeVisible();
    await expect(imax.activeVideoThumb).toBeVisible();
  });

  test("should load schedule after selecting a cinema", async () => {
    await imax.katowiceButton.click();
    await expect(imax.getScheduleHeading("Katowice")).toBeVisible();
  });

  test("should display all IMAX cinemas in Poland", async () => {
    await expect(imax.selectCinemaHeading).toBeVisible();
    await expect(imax.katowiceButton).toBeVisible();
    await expect(imax.krakowButton).toBeVisible();
    await expect(imax.lodzButton).toBeVisible();
    await expect(imax.poznanButton).toBeVisible();
    await expect(imax.warszawaButton).toBeVisible();
    await expect(imax.wroclawButton).toBeVisible();
  });
});
