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

  test("should show required field errors on empty submit", async () => {
    await offers.checkVoucher.click();
    await offers.orderVouchersButton.click();
    await offers.switchLanguageToPolish();
    await offers.submitButton.click();

    await offers.expectRequiredErrorsVisible();
  });
  
  test("should have correct hrefs for offers links", async () => {
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

});
