import { Locator, Page, expect } from "@playwright/test";
import { DateInfo, getDateInfo } from "../helpers/dateHelper";

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
  readonly buyTicketButton: Locator;

  readonly modalLoginButton: Locator;
  readonly modalRegisterButton: Locator;
  readonly guestCheckoutButton: Locator;
  readonly datepicker: Locator;
  readonly openDatePickerButton: Locator;

  constructor(private readonly page: Page) {
    this.firstMovie = page.locator(".movie-row").first();
    this.firstMovieLink = this.firstMovie.locator(".qb-movie-link").first();
    this.firstMovieTitle = this.firstMovie.locator(".qb-movie-name").first();

    this.movieDropdown = page.getByRole("button", { name: "Wybierz film" });
    this.movieDropdownList = page.getByRole("listbox");
    this.thirdMovieOption = this.movieDropdownList.getByRole("option").nth(2);

    this.screeningTypeDropdown = page.getByRole("button", { name: "Wybierz rodzaj seansu" });
    this.dolbyAtmosOption = page.locator("a").filter({ hasText: "Dolby Atmos" });
    this.dolbyAtmosLabel = page.getByLabel("Screening type: Dolby Atmos");

    this.selectedDateHeading = page.getByRole("heading", { level: 5 });
    this.buyTicketButton = page.getByRole("link", { name: /KUP BILET/i });

    this.modalLoginButton = page.locator('[data-automation-id="login-button"]');
    this.modalRegisterButton = page.locator('[data-automation-id="register-button"]');
    this.guestCheckoutButton = page.locator('[data-automation-id="guest-button"]');
    this.openDatePickerButton = page.getByRole("button", { name: "Wybierz datę" });
    this.datepicker = page.locator(".quickbook-datepicker");
  }

  //Movie methods 

  async openFirstMovie(): Promise<string> {
    await expect(this.firstMovieTitle).toBeVisible();
    const title = await this.firstMovieTitle.textContent();
    expect(title).not.toBeNull();
    await this.firstMovieLink.click();
    return title!.trim();
  }

  getMovieHeading(title: string): Locator {
    return this.page.getByRole("heading", { name: title, level: 1 });
  }

  async openMovieFromDropdown(): Promise<string> {
    await expect(this.thirdMovieOption).toBeVisible();
    const dropdownTitle = await this.thirdMovieOption.textContent();
    expect(dropdownTitle).not.toBeNull();
    await this.thirdMovieOption.click();
    return dropdownTitle!.trim();
  }

  getDropdownMovieHeading(dropdownTitle: string): Locator {
    return this.page.getByRole("heading", { name: dropdownTitle, level: 3 });
  }

  // Showtime methods 

  getShowtimes(): Locator {
    return this.page.locator("a[data-url]");
  }

  async clickFirstShowtime(): Promise<void> {
    await this.getShowtimes().first().click();
  }


  // Date methods 
  getDayButton(index: number): Locator {
    return this.page.locator(`[data-automation-id="day_${index}"]`);
  }

  async getSelectedDate(): Promise<Date> {
    const text = (await this.selectedDateHeading.textContent())?.trim();
    expect(text).toBeTruthy();
    const parts = text!.match(/\d+/g)!;
    const [day, month, year] = parts;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  // Date picker methods 

  async openDatePicker(): Promise<void> {
    await this.openDatePickerButton.click();
  }

  private getDayButtonByAriaLabel(ariaLabel: string): Locator {
    return this.datepicker.locator(`button[aria-label="${ariaLabel}"]`);
  }

  private async isDayDisabled(ariaLabel: string): Promise<boolean> {
    // Disabled days have no <button> in the DOM — only active days render one
    return (await this.getDayButtonByAriaLabel(ariaLabel).count()) === 0;
  }

  async findNextActiveDay(
    startingFromDaysAhead: number = 1,
    maxDaysToSearch: number = 14
  ): Promise<DateInfo> {
    for (let i = startingFromDaysAhead; i < startingFromDaysAhead + maxDaysToSearch; i++) {
      const dateInfo = getDateInfo(i);
      const disabled = await this.isDayDisabled(dateInfo.ariaLabel);
      if (!disabled) return dateInfo;
    }
    throw new Error(
      `No active day found in the next ${maxDaysToSearch} days. ` +
      `The calendar may be fully disabled or the locator is wrong.`
    );
  }

  async selectDay(dateInfo: DateInfo): Promise<void> {
    await this.getDayButtonByAriaLabel(dateInfo.ariaLabel).click();
  }

  async assertDayIsSelected(dateInfo: DateInfo): Promise<void> {
    const selected = await this.getSelectedDate();
    expect(selected.getDate()).toBe(dateInfo.day);
  }

  async assertTodayIsVisible(): Promise<void> {
    const today = getDateInfo(0);
    await expect(this.getDayButtonByAriaLabel(today.ariaLabel)).toBeVisible();
  }
}
