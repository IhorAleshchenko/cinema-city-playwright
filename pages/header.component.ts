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
  readonly searchResultHeading: Locator;

  readonly selectCinemaLink: Locator;
  readonly cityInput: Locator;
  readonly koronaCinemaCard: Locator;
  readonly selectedCinemaLabel: Locator;
  readonly repertuarHeading:Locator;

  constructor(private readonly page: Page) {
    this.logOutButton = page.getByRole("link", { name: /Logout|Abmelden/i });
    this.logInButton = page.getByRole("link", { name: "Logowanie" });
    this.registerButton = page.getByRole("link", { name: "Rejestracja" });

    this.englishButton = page.getByRole("button", { name: "EN" });
    this.polishButton = page.getByRole("button", { name: "PL" });

    this.whatsOnLink = page.getByRole("link", { name: "What's On" });
    this.repertuarLink = page.getByRole("link", { name: "Repertuar" });

    this.searchInput = page.getByRole("textbox", { name: "Szukaj..." });
    this.searchResultHeading = page.getByRole("heading", {
      name: "Wrocław - Wroclavia",
    });

    this.selectCinemaLink = page.getByRole("link", {
      name: "Wybierz swoje kino",
    });

    this.cityInput = page.getByRole("textbox", { name: "Podaj miasto" });

    this.koronaCinemaCard = page
      .locator('[data-automation-id="locationpicker-modal-card-item"]')
      .filter({ hasText: "Wrocław - Korona" });

    this.selectedCinemaLabel = page.locator("span").filter({
      hasText: "Wrocław - Korona",
    }).first();
    this.repertuarHeading = page.getByRole("heading", {
     name: "Repertuar Cinema City Wrocław",
});
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