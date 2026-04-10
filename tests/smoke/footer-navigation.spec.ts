import { test, expect } from "../../fixtures/errorListener.fixture";
import { Footer } from "../../pages/components/footer.component";

test.describe("@smoke @footer What's On", () => {
  test.describe.configure({ retries: 1 });
  // Cloudflare may block on first attempt or similar
  let footer: Footer;
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    footer = new Footer(page);
  });

  test("should display all footer headings", async () => {
    await expect(footer.aboutSection).toBeVisible();
    await expect(footer.offersSection).toBeVisible();
    await expect(footer.offersB2BSection).toBeVisible();
    await expect(footer.infoSection).toBeVisible();
    await expect(footer.linksSection).toBeVisible();
    await expect(footer.socialAndAppColumn).toBeVisible();
  });
  test("should have correct hrefs for about us links", async () => {
    await footer.assertLinksHref([
      { locator: footer.cinemaCityLink,  expectedHref: /\/o-nas/ },
      { locator: footer.newsLink,        expectedHref: /\/blog/ },
      { locator: footer.jobsLink,        expectedHref: /\/oferty-pracy/ },
      { locator: footer.newsletterLink,  expectedHref: /newsletter\.cinema-city\.pl/ },
      { locator: footer.contactLink,     expectedHref: /\/kontakt/ },
    ]);
  });
  test("should have correct hrefs for offers links", async () => {
    await footer.assertLinksHref([
      { locator: footer.unlimitedLink,        expectedHref: /\/unlimited/ },
      { locator: footer.weddingLink,        expectedHref: /\/slub-i-zareczyny/ },
      { locator: footer.birthdayLink,     expectedHref: /\/urodziny/ },
    ]);
  });
   test("should have correct hrefs for b2b offers links", async () => {
    await footer.assertLinksHref([
      { locator: footer.vouchersLink,        expectedHref: /\/vouchery-dla-firm/ },
      { locator: footer.rentHallLink,        expectedHref: /\/wynajem-sal-eventy/ },
      { locator: footer.vipZoneLink,     expectedHref: /\/strefa-vip-dla-firm/ },
    ]);
  });
   test("should have correct hrefs for information links", async () => {
    await footer.assertLinksHref([
      { locator: footer.regulationsLink,        expectedHref: /\/regulacje-footer/ },
      { locator: footer.privacyPolicyLink,        expectedHref: /\/privacy-policy-pl/ },
      { locator: footer.manageCookiesLink,     expectedHref: /OneTrust/ },
      { locator: footer.cookiesPolicyLink,     expectedHref: /\/cookies/ },
      { locator: footer.taxStrategyLink,       expectedHref: /strategia-podatkowa/ },
    ]);
  });
  test("should have correct hrefs for link section", async () => {
    await footer.assertLinksHref([
      { locator: footer.forumFilmLink, expectedHref: /forumfilm/ },
      { locator: footer.cinemaAdsLink, expectedHref: /newagemedia/ },
    ]);
  });

  test("should have correct hrefs for social media section", async () => {
    await footer.assertLinksHref([
      { locator: footer.facebookLink,        expectedHref: /facebook/ },
      { locator: footer.instagramLink,        expectedHref: /instagram/ },
      { locator: footer.youtubeLink,        expectedHref: /youtube/ },
      { locator: footer.linkedInLink,        expectedHref: /linkedin/ },
      { locator: footer.androidLink,        expectedHref: /store/ },
      { locator: footer.iosLink,        expectedHref: /apple/ },
    ]);
  });

});
