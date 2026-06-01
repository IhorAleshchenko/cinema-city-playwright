import { Locator, Page, expect } from "@playwright/test";

export class Offers {
  readonly offersHeading: Locator;
  readonly checkVoucher: Locator;
  readonly orderVouchersButton: Locator;
  readonly categoryHeading: Locator;

  readonly voucherGiftCardsOption: Locator;
  readonly cartUnlimited: Locator;
  readonly reasonField: Locator;
  readonly reasonDropdown: Locator;
  readonly contractTerminationOption: Locator;

  readonly unlimitedCardNumberInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;

  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly subjectField: Locator;

  readonly languageDropdownButton: Locator;
  readonly polishLanguageLink: Locator;
  readonly submitButton: Locator;

  readonly forYouAndLovedOnesHeading: Locator;

  readonly offersSection: Locator;
  readonly unlimitedLink: Locator;
  readonly familyOfferLink: Locator;
  readonly weddingLink: Locator;
  readonly birthdayLink: Locator;
  readonly sensoryCinemaLink: Locator;
  readonly spinCityLink: Locator;
  readonly pixelCityLink: Locator;
  readonly gamingLink: Locator;
  readonly partnerOffersLink: Locator;

  readonly forBusinessSection: Locator;
  readonly unlimitedForBusinessLink: Locator;
  readonly vouchersForBusinessLink: Locator;
  readonly hallRentalLink: Locator;
  readonly vipZoneLink: Locator;
  readonly spinCityBusinessLink: Locator;

  readonly forSchoolsSection: Locator;
  readonly groupBookingLink: Locator;
  readonly youngCinemaLink: Locator;
  readonly teachersClubLink: Locator;
  readonly childFilmWorldLink: Locator;
  readonly imaxEducationLink: Locator;
  readonly filmsForGroupsLink: Locator;
  readonly cinema4dxLink: Locator;
  readonly sensoryCinemaSchoolsLink: Locator;
  

  constructor(page: Page) {
    this.offersHeading = page.getByRole("heading", { name: "OFERTY", level: 1 });
    this.checkVoucher = page.getByRole("button", { name: "SPRAWDŹ" });
    this.orderVouchersButton = page.getByRole("button", { name: "ZAMÓW VOUCHERY" });
    this.categoryHeading = page.getByRole("heading", { name: "Wybierz kategorię" });

    this.voucherGiftCardsOption = page.getByRole("option", { name: "Vouchery i Karty Podarunkowe" });
    this.cartUnlimited = page.getByRole("option", { name: "Karta Unlimited" });
    this.reasonField = page.locator(".form-group").filter({ has: page.getByLabel("Powód zgłoszenia") });
    this.reasonDropdown = this.reasonField.locator('[role="combobox"]');
    this.contractTerminationOption = this.reasonField.getByRole("option", { name: "Rozwiązanie umowy" });

    this.unlimitedCardNumberInput = page.getByLabel("Numer karty Unlimited");
    this.firstNameInput = page.getByLabel("Imię");
    this.lastNameInput = page.getByLabel("Nazwisko");
    this.emailInput = page.getByLabel("Adres e-mail");
    this.phoneInput = page.getByLabel("Numer telefonu");
    this.subjectInput = page.getByLabel("Temat");
    this.messageInput = page.getByLabel("Description, Use Alt+F10 to access formatting toolbar").first();

    this.firstNameField = page.locator(".form-group").filter({ has: page.getByLabel("Imię") });
    this.lastNameField = page.locator(".form-group").filter({ has: page.getByLabel("Nazwisko") });
    this.emailField = page.locator(".form-group").filter({ has: page.getByLabel("Adres e-mail") });
    this.subjectField = page.locator(".form-group").filter({ has: page.getByLabel("Temat") });

    this.languageDropdownButton = page.getByRole("button", { name: "English" });
    this.polishLanguageLink = page.getByRole("link", { name: "Polski" });
    this.submitButton = page.getByRole("button", { name: "Prześlij" });

    this.forYouAndLovedOnesHeading = page.getByRole("heading", {name: "DLA CIEBIE I TWOICH BLISKICH",level: 3,});

    this.offersSection = page.locator('div.row.mb-md', {has: page.locator('h3', { hasText: /^DLA CIEBIE I TWOICH BLISKICH$/ })}).first();
    this.unlimitedLink = this.offersSection.getByRole('link', { name: /unlimited/i });
    this.familyOfferLink = this.offersSection.getByRole('link', { name: /oferta rodzinna/i });
    this.weddingLink = this.offersSection.getByRole('link', { name: /ślub i zaręczyny/i });
    this.birthdayLink = this.offersSection.getByRole('link', { name: /urodziny w kinie/i });
    this.sensoryCinemaLink = this.offersSection.getByRole('link', { name: /pokaz przyjazne sensorycznie/i });
    this.spinCityLink = this.offersSection.getByRole('link', { name: /spin city/i });
    this.pixelCityLink = this.offersSection.getByRole('link', { name: /pixel city/i });
    this.gamingLink = this.offersSection.getByRole('link', { name: /gaming w kinie/i });
    this.partnerOffersLink = this.offersSection.getByRole('link', { name: /oferty partnerów/i });

    this.forBusinessSection = page.locator('div.row.mb-md', { has: page.locator('h3', { hasText: /^DLA FIRM I ORGANIZACJI$/ }) }).first();
    this.unlimitedForBusinessLink = this.forBusinessSection.getByRole('link', { name: /unlimited dla firm/i });
    this.vouchersForBusinessLink = this.forBusinessSection.getByRole('link', { name: /vouchery dla firm/i });
    this.hallRentalLink = this.forBusinessSection.getByRole('link', { name: /wynajem sal/i });
    this.vipZoneLink = this.forBusinessSection.getByRole('link', { name: /strefa vip dla firm/i });
    this.spinCityBusinessLink = this.forBusinessSection.getByRole('link', { name: /spin city dla biznesu/i });

    this.forSchoolsSection = page.locator('div.row.mb-md', { has: page.locator('h3', { hasText: /^DLA SZKÓŁ I GRUP ZORGANIZOWANYCH$/ }) }).first();
    this.groupBookingLink = this.forSchoolsSection.getByRole('link', { name: /rezerwacje grupowe/i });
    this.youngCinemaLink = this.forSchoolsSection.getByRole('link', { name: /w młodym kinie/i });
    this.teachersClubLink = this.forSchoolsSection.getByRole('link', { name: /klub nauczyciela/i });
    this.childFilmWorldLink = this.forSchoolsSection.getByRole('link', { name: /filmowy świat dziecka/i });
    this.imaxEducationLink = this.forSchoolsSection.getByRole('link', { name: /oferta edukacyjna imax/i });
    this.filmsForGroupsLink = this.forSchoolsSection.getByRole('link', { name: /wybrane filmy dla grup/i });
    this.cinema4dxLink = this.forSchoolsSection.getByRole('link', { name: /interaktywne kino 4dx/i });
    this.sensoryCinemaSchoolsLink = this.forSchoolsSection.getByRole('link', { name: /kino przyjazne sensorycznie/i });
  }

  async openVoucherCategories() {
    await this.checkVoucher.click();
    await this.orderVouchersButton.click();
    await expect(this.categoryHeading).toBeVisible();
  }

  async selectUnlimitedVoucherForm() {
    await this.voucherGiftCardsOption.click();
    await this.cartUnlimited.click();
    await this.reasonDropdown.click();
    await this.contractTerminationOption.click();
  }

  async fillUnlimitedContactForm(data: {
    cardNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    await this.unlimitedCardNumberInput.fill(data.cardNumber);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async switchLanguageToPolish() {
    await this.languageDropdownButton.click();
    await this.polishLanguageLink.click();
  }

  async expectRequiredErrorsVisible() {
    const requiredFields = [
      this.firstNameField,
      this.lastNameField,
      this.emailField,
      this.subjectField,
    ];

    for (const field of requiredFields) {
      await expect(field.getByText("To pole jest obowiązkowe")).toBeVisible();
    }
  }

    async assertLinksHref(links: { locator: Locator; expectedHref: string | RegExp }[]) {
    for (const { locator, expectedHref } of links) {
      await expect(locator).toBeVisible();
      const href = await locator.getAttribute('href');
      expect(href).toMatch(expectedHref);
    }
  }
}
