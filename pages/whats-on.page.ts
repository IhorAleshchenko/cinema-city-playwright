import { Locator, Page, expect } from "@playwright/test";

export class WhatsOn {
  readonly firstMovie: Locator;
  readonly firstMovieLink: Locator;
  readonly firstMovieTitle: Locator;

  readonly movieDropdown: Locator;
  readonly movieDropdownList: Locator;
  readonly thirdMovieOption: Locator;

  readonly screeningTypeDropdown: Locator;
  readonly dolbyAtmosOption: Locator;
  readonly dolbyAtmosLabel: Locator;

  readonly selectedDateHeading: Locator;

  constructor(private readonly page: Page) {
    this.firstMovie = page.locator(".movie-row").first();
    this.firstMovieLink = this.firstMovie.locator(".qb-movie-link").first();
    this.firstMovieTitle = this.firstMovie.locator(".qb-movie-name").first();

    this.movieDropdown = page.getByRole("button", { name: "Wybierz film" });
    this.movieDropdownList = page.getByRole("listbox");
    this.thirdMovieOption = this.movieDropdownList.getByRole("option").nth(2);

    this.screeningTypeDropdown = page.getByRole("button", {
      name: "Wybierz rodzaj seansu",
    });
    this.dolbyAtmosOption = page
      .locator("a")
      .filter({ hasText: "Dolby Atmos" });
    this.dolbyAtmosLabel = page.getByLabel("Screening type: Dolby Atmos");
    this.selectedDateHeading = page.getByRole("heading", { level: 5 });
  }

  async openFirstMovie(): Promise<string> {
    await expect(this.firstMovieTitle).toBeVisible();

    const title = await this.firstMovieTitle.textContent();
    expect(title).not.toBeNull();

    await this.firstMovieLink.click();

    return title!.trim();
  }
  getMovieHeading(title: string): Locator {
    return this.page.getByRole("heading", {
      name: title,
      level: 1,
    });
  }

  async openMovieFromDropdown(): Promise<string> {
    await expect(this.thirdMovieOption).toBeVisible();
    const dropdownTitle = await this.thirdMovieOption.textContent();
    expect(dropdownTitle).not.toBeNull();
    await this.thirdMovieOption.click();
    return dropdownTitle!.trim();
  }
  getDropdownMovieHeading(dropdownTitle: string): Locator {
    return this.page.getByRole("heading", {
      name: dropdownTitle,
      level: 3,
    });
  }

  getDayButton(index: number): Locator {
    return this.page.locator(`[data-automation-id="day_${index}"]`);
  }

  async getSelectedDate(): Promise<Date> {
    const text = (await this.selectedDateHeading.textContent())?.trim();
    expect(text).toBeTruthy();

    const parts = text!.match(/\d+/g)!;
    const [day, month, year] = parts;

    return new Date(Number(year), Number(month) - 1, Number(day));
    return new Date(Number(day), Number(month) - 1, Number(year));
  }
}
