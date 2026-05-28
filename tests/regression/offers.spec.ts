import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";
import { Offers } from "../../pages/offers.page";

test.describe("@regression @offers Offers", () => {
  let header: Header;
  let offers: Offers;

})

test.describe("@regression @offers Offers", () => {
  let header: Header;
  let offers: Offers;

  test.beforeEach(async({ page }) => {
    await page.goto("./")
    header = new Header(page);
    offers = new Offers(page);
   await header.offersLink.click();
  })

  test("Should open Offers link", async() => {
    await expect(offers.offersHeading).toBeVisible();
    await offers.checkVoucher.click();

  })
  test("Should open Voucher link", async() => {
    //Act
    await offers.checkVoucher.click();
    await offers.orderVouchersButton.click();
    await expect(offers.categoryHeading).toBeVisible();
  })

  test("Should fill up Voucher form", async() => {
    //Act
    await offers.openVoucherCategories()
   await offers.voucherGiftCardsOption.click()
   await offers.cartUnlimited.click()
   await offers.reasonDropdown.click()
   await offers.contractTerminationOption.click()

  })

})