import { ECDH } from "node:crypto";
import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";
import { Offers } from "../../pages/offers.page";

test.describe("@regression @offers Offers", () => {
  let header: Header;
  let offers: Offers;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    offers = new Offers(page);
    await header.offersLink.click();
  });

  test("should open Voucher link", async () => {
    await offers.checkVoucher.click();
    await offers.orderVouchersButton.click();

    await expect(offers.categoryHeading).toBeVisible();
  });

    test("should show required field errors on empty submit", async () => {
    await offers.checkVoucher.click();
    await offers.orderVouchersButton.click();
    await offers.switchLanguageToPolish();
    await expect(offers.submitButton).toBeVisible()
    await offers.submitButton.click();

    await offers.expectRequiredErrorsVisible();
  });

  test("should fill up Voucher form", async () => {
    await offers.openVoucherCategories();
    await offers.selectUnlimitedVoucherForm();
    await offers.fillUnlimitedContactForm({
      cardNumber: "123456789",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jan.kowalski@test.com",
      phone: "500600700",
      subject: "Test subject",
      message: "This is a test message",
    });

    await expect.soft(offers.unlimitedCardNumberInput).toHaveValue("123456789");
    await expect.soft(offers.firstNameInput).toHaveValue("Jan");
    await expect.soft(offers.lastNameInput).toHaveValue("Kowalski");
    await expect.soft(offers.emailInput).toHaveValue("jan.kowalski@test.com");
    await expect.soft(offers.phoneInput).toHaveValue("500600700");
    await expect.soft(offers.subjectInput).toHaveValue("Test subject");
    await expect.soft(offers.reasonDropdown).toContainText("Rozwiązanie umowy");
  });

  test("should have correct hrefs for you and family offer links", async () => {
    await offers.assertLinksHref([
      { locator: offers.unlimitedLink,      expectedHref: /\/unlimited/ },
      { locator: offers.familyOfferLink,    expectedHref: /\/oferta-rodzinna/ },
      { locator: offers.weddingLink,        expectedHref: /\/slub-i-zareczyny/ },
      { locator: offers.birthdayLink,       expectedHref: /\/urodziny/ },
      { locator: offers.sensoryCinemaLink,  expectedHref: /\/kino-przyjazne-sensorycznie/ },
      { locator: offers.spinCityLink,       expectedHref: /spincity\.pl/ },
      { locator: offers.pixelCityLink,      expectedHref: /pixel-city\.pl/ },
      { locator: offers.gamingLink,         expectedHref: /\/granie/ },
      { locator: offers.partnerOffersLink,  expectedHref: /\/oferty-partnerow/ },
    ]);
  });

  test("should have correct hrefs for business offer links", async () => {
    await offers.assertLinksHref([
      { locator: offers.unlimitedForBusinessLink,  expectedHref: /\/unlimited-gift-card/ },
      { locator: offers.vouchersForBusinessLink,   expectedHref: /\/vouchery-dla-firm/ },
      { locator: offers.hallRentalLink,            expectedHref: /\/wynajem-sal-eventy/ },
      { locator: offers.vipZoneLink,               expectedHref: /\/strefa-vip-dla-firm/ },
      { locator: offers.spinCityBusinessLink,      expectedHref: /spincity\.pl\/dla-firm/ },
    ]);
  });

  test("should have correct hrefs for schools and groups offer links", async () => {
    await offers.assertLinksHref([
      { locator: offers.groupBookingLink,          expectedHref: /\/szkoly/ },
      { locator: offers.youngCinemaLink,           expectedHref: /\/w-mlodym-kinie/ },
      { locator: offers.teachersClubLink,          expectedHref: /\/klub-nauczyciela/ },
      { locator: offers.childFilmWorldLink,        expectedHref: /\/filmowy-swiat-dziecka/ },
      { locator: offers.imaxEducationLink,         expectedHref: /\/program-edukacyjny-kin-imax/ },
      { locator: offers.filmsForGroupsLink,        expectedHref: /\/filmy-dla-grup/ },
      { locator: offers.cinema4dxLink,             expectedHref: /\/interaktywne-kino-4dx/ },
      { locator: offers.sensoryCinemaSchoolsLink,  expectedHref: /kino-przyjazne-sensorycznie/ },
    ]);
  });


});
