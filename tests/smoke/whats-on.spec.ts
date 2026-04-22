import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";
import { WhatsOn } from "../../pages/whats-on.page";

test.describe("@smoke @whats-on What's On", () => {
  let header: Header;
  let whatsOn: WhatsOn;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    whatsOn = new WhatsOn(page);
    await header.selectCinema("wrocław", "Wrocław - Korona");
    await header.whatsOnLinkPl.click();
  });

  test("should open first movie from the list", async ({ page }) => {
    const title = await whatsOn.openFirstMovie();

    await expect(page).toHaveURL(/buy-tickets-by-film/);
    await expect(whatsOn.getMovieHeading(title)).toBeVisible();
  });

  test("should open purchase window", async () => {
    await whatsOn.openFirstMovie();
    await whatsOn.buyTicketButton.click();
    await whatsOn.clickFirstShowtime();

    await expect(whatsOn.modalLoginButton).toBeEnabled();
    await expect(whatsOn.modalRegisterButton).toBeEnabled();
    await expect(whatsOn.guestCheckoutButton).toBeEnabled();
  });

  test("should filter screenings by Dolby Atmos", async () => {
    await whatsOn.screeningTypeDropdown.click();
    await whatsOn.dolbyAtmosOption.click();

    await expect(whatsOn.dolbyAtmosLabel).toBeVisible();
  });

  test("should navigate through the next 6 days sequentially", async () => {
    let currentDate = await whatsOn.getSelectedDate();

    for (let i = 1; i < 7; i++) {
      const button = whatsOn.getDayButton(i);
      if (await button.isDisabled()) continue;

      await button.click();
      const nextDate = await whatsOn.getSelectedDate();

      expect(nextDate.getTime()).toBeGreaterThanOrEqual(currentDate.getTime());
      currentDate = nextDate;
    }
  });

  test("should open movie from dropdown menu", async () => {
    await whatsOn.movieDropdown.click();
    const dropdownTitle = await whatsOn.openMovieFromDropdown();

    await expect(whatsOn.getDropdownMovieHeading(dropdownTitle)).toBeVisible();
  });

  test("should display today in the date picker", async () => {
    await whatsOn.openDatePicker();

    await whatsOn.assertTodayIsVisible();
  });

  test("should select the next available day", async () => {
    await whatsOn.openDatePicker();

    const nextActiveDay = await whatsOn.findNextActiveDay(1);
    await whatsOn.selectDay(nextActiveDay);

    await whatsOn.assertDayIsSelected(nextActiveDay);
  });
});
