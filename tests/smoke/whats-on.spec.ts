import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { Header } from "../../pages/components/header.component";
import { WhatsOn } from "../../pages/whats-on.page";

test.describe("Whats-on tests", () => {
  test.describe.configure({ retries: 1 });
  let loginPage: LoginPage;
  let header: Header;
  let whatsOn: WhatsOn;

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("./");
    header = new Header(page);
    loginPage = new LoginPage(page);
    whatsOn = new WhatsOn(page);
    await header.selectCinema("wrocław", "Wrocław - Korona");
    await header.whatsOnLinkPl.click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Open first movie from the list", async ({ page }) => {
    const title = await whatsOn.openFirstMovie();

    await expect(page).toHaveURL(/buy-tickets-by-film/);
    await expect(whatsOn.getMovieHeading(title)).toBeVisible();
  });

  // test("Open ", async ({ page }) => {
  //   // await whatsOn.firstMovieTitle.toBe
  //   await page.locator('.movie-row .movie-poster-container').first().click();
  //   await expect(page.locator('.ytProgressBarLineProgressBarPlayed')).toBeVisible();
  //   // await expect(page).toHaveURL(/buy-tickets-by-film/);
  //   // await expect(whatsOn.getMovieHeading(title)).toBeVisible();
  // });

  // test("Open trailer", async ({ page }) => {
  //   const title = await whatsOn.openFirstMovie();
  //    await page.getByRole('link', { name: 'KUP BILET' }).click();
  // await page.getByRole('link', { name: 'Kliknij aby przejśc do strony kina Wrocław - Korona' }).click();
  // await page.getByRole('link', { name: ':30 - Wysoka dostępność miejsc' }).click();
  // await page.getByRole('button', { name: 'Kup jako gość' }).click();
  // await page.locator('g:nth-child(11) > .seat-hit-area').click();
  // await expect (page.getByText('Błąd reCaptchy')).toBeVisible();

  //   // await expect(page).toHaveURL(/buy-tickets-by-film/);
  //   // await expect(whatsOn.getMovieHeading(title)).toBeVisible();
  // });

  test("Choose Dolby Atmos type", async ({ page }) => {
    //Act
    await whatsOn.screeningTypeDropdown.click();
    await whatsOn.dolbyAtmosOption.click();
    //Assert
    await expect(whatsOn.dolbyAtmosLabel).toBeVisible();
  });

  test("Check dates", async ({ page }) => {
    let currentDate = await whatsOn.getSelectedDate();

    for (let i = 1; i < 7; i++) {
      await whatsOn.getDayButton(i).click();

      const nextDate = await whatsOn.getSelectedDate();

      const expectedDate = new Date(currentDate);
      expectedDate.setDate(currentDate.getDate() + 1);

      expect(nextDate.toDateString()).toBe(expectedDate.toDateString());

      currentDate = nextDate;
    }
  });

  test("Open movie from dropdown menu", async ({ page }) => {
    //Act
    await whatsOn.movieDropdown.click();
    const dropdownTitle = await whatsOn.openMovieFromDropdown();
    //Assert
    await expect(whatsOn.getDropdownMovieHeading(dropdownTitle)).toBeVisible();
  });
});
