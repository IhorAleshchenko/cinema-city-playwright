import test, { expect } from "@playwright/test";
import { Header } from "../../pages/components/header.component";
import { Footer } from "../../pages/components/footer.component";

test.describe("@smoke @footer What's On", () => {
  test.describe.configure({ retries: 1 });
  let header: Header;
  let footer: Footer;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    footer = new Footer(page);
    // await header.selectCinema("wrocław", "Wrocław - Korona");
    // await header.whatsOnLinkPl.click();
  });

  test("should display all about us section headings", async () => {
    await expect(footer.aboutSection).toBeVisible();
    await expect(footer.cinemaCityLink).toBeVisible();
    await expect(footer.newsLink).toBeVisible();
    await expect(footer.jobsLink).toBeVisible();
    await expect(footer.newsletterLink).toBeVisible();
    await expect(footer.contactLink).toBeVisible();
  });

   test("should open all about us links section headings", async ({page}) => {
    await expect(footer.aboutSection).toBeVisible();
    await footer.cinemaCityLink.click();
    await expect(page).toHaveURL(/o-nas/);
    await header.cinemaCityLabel.click();
    await footer.newsLink.click();
    await expect(page).toHaveURL(/blog/);
    await header.cinemaCityLabel.click();
    await footer.jobsLink.click();
    await expect(page).toHaveURL(/oferty-pracy/);
    await header.cinemaCityLabel.click();
    await expect(footer.newsletterLink).toBeVisible();
    await footer.contactLink.click();
    await expect(page).toHaveURL(/support/);
  });

  test("should display offers section headings", async () => {
    await expect(footer.offersSection).toBeVisible();
    await expect(footer.unlimitedLink).toBeVisible();
    await expect(footer.weddingLink).toBeVisible();
    await expect(footer.birthdayLink).toBeVisible();
  });
  test("should display offers b2b section headings", async () => {
    await expect(footer.offersB2BSection).toBeVisible();
    await expect(footer.vouchersLink).toBeVisible();
    await expect(footer.rentHallLink).toBeVisible();
    await expect(footer.vipZoneLink).toBeVisible();
  });
 test("should display information section headings", async () => {
    await expect(footer.infoSection).toBeVisible();
    await expect(footer.regulationsLink).toBeVisible();
    await expect(footer.privacyPolicyLink).toBeVisible();
    await expect(footer.manageCookiesLink).toBeVisible();
    await expect(footer.cookiesPolicyLink).toBeVisible();
    await expect(footer.taxStrategyLink).toBeVisible();
  });
  test("should display link section headings", async () => {
    await expect(footer.linksSection).toBeVisible();
    await expect(footer.forumFilmLink).toBeVisible();
    await expect(footer.cinemaAdsLink).toBeVisible();
  })
  test("should display social media section headings", async () => {
    await expect(footer.socialAndAppColumn).toBeVisible();
    await expect(footer.facebookLink).toBeVisible();
    await expect(footer.instagramLink).toBeVisible();
    await expect(footer.youtubeLink).toBeVisible();
    await expect(footer.linkedInLink).toBeVisible();
    await expect(footer.androidLink).toBeVisible();
    await expect(footer.iosLink).toBeVisible();
  })
});
