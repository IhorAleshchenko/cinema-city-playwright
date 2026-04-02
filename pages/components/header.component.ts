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
  readonly repertuarHeading: Locator;
  //Second header naming row
  readonly whatsOnLinkPl: Locator;
  readonly offersLink: Locator;
  readonly giftsLink: Locator;
  readonly schoolsLink: Locator;
  readonly familiesLink: Locator;
  readonly barLink: Locator;
  readonly unlimitedLink: Locator;
  readonly fourDxLink: Locator;
  readonly imaxLink: Locator;
  readonly screenXLink: Locator;
  readonly vipLink: Locator;
  readonly eventCinemaLink: Locator;

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

    this.selectedCinemaLabel = page
      .locator("span")
      .filter({
        hasText: "Wrocław - Korona",
      })
      .first();
    this.repertuarHeading = page.getByRole("heading", {
      name: "Repertuar Cinema City Wrocław",
    });
    //Second header naming row
    this.whatsOnLinkPl = page.getByRole("link", { name: "Repertuar" });

    this.offersLink = page.getByRole("link", { name: /oferty/i });
    this.giftsLink = page.getByRole("link", { name: /prezenty/i });

    this.schoolsLink = page.getByRole("link", { name: /szkoły/i });
    this.familiesLink = page.getByRole("link", { name: /rodziny/i });

    this.barLink = page.getByRole("link", { name: /bar/i });

    this.unlimitedLink = page.getByRole("link", { name: /unlimited/i });
    this.fourDxLink = page.getByRole("link", { name: /4dx/i });

    this.imaxLink = page.getByRole("link", { name: /imax/i });
    this.screenXLink = page.getByRole("link", { name: /screenx/i });

    this.vipLink = page.getByRole("link", { name: /vip/i });
    this.eventCinemaLink = page.getByRole("link", { name: /event/i });
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
