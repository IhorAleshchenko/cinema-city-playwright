import { Page, Locator } from "@playwright/test";

export class Header {
  readonly logOutButton: Locator;
  readonly logInButton: Locator;
  readonly registerButton: Locator;
  readonly englishButton: Locator;
  readonly polishButton: Locator;
  readonly whatsOnLink: Locator;
  readonly repertuarLink: Locator;
  readonly searchInput: Locator;
  readonly  searchResultHeading: Locator;
  readonly selectCinemaLink: Locator;
  readonly cityInput: Locator;
  readonly repertuarHeading: Locator;
  readonly cinemaCityLabel: Locator;
  //Second header naming row
  readonly navBar: Locator;
  readonly whatsOnLinkPl: Locator;
  readonly offersLink: Locator;
  readonly imaxLink: Locator;
  readonly eventCinemaLink: Locator;
  readonly unlimitedCard: Locator;

  constructor(private readonly page: Page) {
    this.logOutButton = page.getByRole("link", { name: /Logout|Abmelden/i });
    this.logInButton = page.getByRole("link", { name: "Logowanie" });
    this.registerButton = page.getByRole("link", { name: "Rejestracja" });
    this.englishButton = page.getByRole("button", { name: "EN" });
    this.polishButton = page.getByRole("button", { name: "PL" });
    this.whatsOnLink = page.getByRole("link", { name: "What's On" });
    this.repertuarLink = page.getByRole("link", { name: "Repertuar" });
    this.searchInput = page.getByRole("textbox", { name: "Szukaj..." });
    this.searchResultHeading = page.getByRole("heading", { name: "Wrocław - Wroclavia",});
    this.selectCinemaLink = page.getByRole("link", { name: "Wybierz swoje kino",});
    this.cityInput = page.getByRole("textbox", { name: "Podaj miasto" });
    this.repertuarHeading = page.getByRole("heading", {name: "Repertuar Cinema City Wrocław", });
    this.cinemaCityLabel = page.locator('[data-automation-id="header-logo-link"]');
    //Second header naming row
    this.navBar = page.getByRole('navigation');
    this.whatsOnLinkPl = this.navBar.locator('a[data-link-type="whatson"]');
    this.offersLink = this.navBar.locator('a[href="/oferty"]');
    this.imaxLink = this.navBar.locator('a[href="/imax"]');
    this.eventCinemaLink = this.navBar.locator('a[href="/event-cinema"]');
    this.unlimitedCard = this.navBar.locator('a[href="/unlimited"]');
  }

  async switchToEnglish() {
    await this.polishButton.click();
    await this.englishButton.click();
  }

  async switchToPolish() {
    await this.englishButton.click();
    await this.polishButton.click();
  }

  async searchCinema(name: string) {
    await this.searchInput.fill(name);
    await this.searchInput.press("Enter");
  }

  getSelectedCinemaLabel(cinemaName: string): Locator {
    return this.page.locator("span").filter({ hasText: cinemaName }).first();
  }

  async selectCinema(city: string, cinemaName: string) {
    await this.selectCinemaLink.click();
    await this.cityInput.fill(city);
    await this.cityInput.press("Enter");

    await this.page
      .locator('[data-automation-id="locationpicker-modal-card-item"]')
      .filter({ hasText: cinemaName })
      .click();
  }
}
