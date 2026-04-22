import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";
import { Main } from "../../pages/main.page";

test.describe("@smoke @main-page Main page", () => {
  let header: Header;
  let main: Main;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    main = new Main(page);
  });

  test("should display the hero slider with an active slide", async () => {
    await expect(main.slider).toBeVisible();
    await expect(main.getActiveSlide()).toBeVisible();
  });

  test("should navigate to correct page on active slide click", async ({ page }) => {
    const urlPattern = await main.clickActiveSlide();

    await expect(page).toHaveURL(urlPattern);
  });

  test("should display all section headings", async () => {
    await expect(main.nowPlayingHeader).toBeVisible();
    await expect(main.comingSoonHeader).toBeVisible();
    await expect(main.watchInFormatHeader).toBeVisible();
    await expect(main.familyFriendlyHeader).toBeVisible();
    await expect(main.eventsHeader).toBeVisible();
  });

  test("should open cinema picker on buy ticket click", async () => {
    await main.buyTicketButton.click();

    await expect(header.selectCinemaLink).toBeVisible();
  });

  test("should navigate to blog page", async ({ page }) => {
    await expect(main.blogHeading).toBeVisible();
    await main.blogLink.click();

    await expect(page).toHaveURL(/blog/);
  });

  test("should display format cards", async () => {
    await main.formatsTab.click();

    await expect(main.vipCard).toBeVisible();
    await expect(main.screenxCard).toBeVisible();
    await expect(main.comfortSeatCard).toBeVisible();
    await expect(main.laserProjectionCard).toBeVisible();
  });

  test("should display recommended cards", async () => {
    await main.recommendedTab.click();

    await expect(main.unlimitedCard).toBeVisible();
    await expect(main.spinCityCard).toBeVisible();
    await expect(main.gameZoneCard).toBeVisible();
    await expect(main.myCinemaCityCard).toBeVisible();
  });

  test("should display bar cards", async () => {
    await main.barKinoTab.click();

    await expect(main.vipSnacksCard).toBeVisible();
    await expect(main.concessionOfferCard).toBeVisible();
    await expect(main.movieMerchCard).toBeVisible();
    await expect(main.popcornCard).toBeVisible();
  });

  test("should display firm cards", async () => {
    await main.firmTab.click();

    await expect(main.exceptionalVipCard).toBeVisible();
    await expect(main.bestEventsCard).toBeVisible();
    await expect(main.unlimitedForBusinessCard).toBeVisible();
  });

  test("should display school cards", async () => {
    await main.schoolTab.click();

    await expect(main.forGroupCard).toBeVisible();
    await expect(main.imaxEducationCard).toBeVisible();
    await expect(main.worldOfChildCard).toBeVisible();
    await expect(main.teacherClubCard).toBeVisible();
  });
});
