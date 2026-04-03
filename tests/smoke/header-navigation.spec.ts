import test, { expect } from "@playwright/test";
import { Header } from "../../pages/components/header.component";

test.describe("Header navigation", () => {
  test.describe.configure({ retries: 1 });
  let header: Header;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
  });

  test("should switch language to English and back to Polish", async () => {
    await header.switchToEnglish();
    await expect(header.whatsOnLink).toBeVisible();

    await header.switchToPolish();
    await expect(header.repertuarLink).toBeVisible();
  });

  test("should search for a cinema and display results", async ({ page }) => {
    await header.searchCinema("Wrocław-Wroclavia");
    await header.searchResultHeading.click();

    await expect(header.repertuarHeading).toBeVisible();
    await expect(page).toHaveURL(/buy-tickets-by-cinema.*in-cinema=1097/);
  });

  test("should navigate to registration page from header", async ({ page }) => {
    await header.registerButton.click();

    await expect(page.getByRole("heading", { name: "Utwórz konto My Cinema City" })).toBeVisible();
  });

  test("should navigate to login page from header", async ({ page }) => {
    await header.logInButton.click();

    await expect(page.getByRole("heading", { name: "Zaloguj się" })).toBeVisible();
  });

  test("should allow user to select a cinema", async () => {
    await header.selectCinema("wrocław", "Wrocław - Korona");

    await expect(header.getSelectedCinemaLabel("Wrocław - Korona")).toBeVisible();
  });

  test("should return to homepage when clicking Cinema City logo", async () => {
    await header.logInButton.click();
    await header.cinemaCityLabel.click();

    await expect(header.searchInput).toBeVisible();
  });
});
