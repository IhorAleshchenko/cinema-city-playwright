import { Locator, Page, expect } from "@playwright/test";

export class Offers {
    readonly offersHeading: Locator;
    readonly checkVoucher: Locator;
    readonly orderVouchersButton: Locator;
    readonly categoryHeading: Locator;
    // Voucher form 
    readonly voucherGiftCardsOption: Locator;
    readonly cartUnlimited: Locator;
      readonly reasonField: Locator;
  readonly reasonDropdown: Locator;
  readonly contractTerminationOption: Locator;


    constructor(page:Page) {
      this.offersHeading = page.getByRole('heading', { name: 'OFERTY', level: 1 });
      this.checkVoucher = page.getByRole('button', { name: 'SPRAWDŹ'});
      this.orderVouchersButton = page.getByRole('button', { name: 'ZAMÓW VOUCHERY' });
      this.categoryHeading = page.getByRole('heading', { name: 'Wybierz kategorię' });
      // Voucher form 
      this.voucherGiftCardsOption = page.getByRole("option", {name: "Vouchery i Karty Podarunkowe"});
      this. cartUnlimited = page.getByRole("option", {name: "Karta Unlimited"});
      this.reasonField = page.locator(".form-group").filter({has: page.getByLabel("Powód zgłoszenia")});
      this.reasonDropdown = this.reasonField.locator('[role="combobox"]');
      this.contractTerminationOption = this.reasonField.getByRole("option", {name: "Rozwiązanie umowy"});
      
         
       

    }

     async openVoucherCategories() {
    await this.checkVoucher.click();
    await this.orderVouchersButton.click();
    await expect(this.categoryHeading).toBeVisible();
  }

 
}