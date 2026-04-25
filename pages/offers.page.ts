import { Locator, Page, expect } from "@playwright/test";

export class Offers {
    readonly offersHeading: Locator;
    constructor(page:Page) {
      this.offersHeading = page.getByRole('heading', { name: 'OFERTY', level: 1 })
    }
}