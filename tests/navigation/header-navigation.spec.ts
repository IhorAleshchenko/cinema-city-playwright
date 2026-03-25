import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { Header } from "../../pages/header.component";

test.describe("Header navigation tests", () => {
  test.describe.configure({ retries: 1 });
  let loginPage: LoginPage;
  let header: Header;

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto("./");
    await page.getByRole("button", { name: "Akceptuj wszystkie" }).click();
    header = new Header(page);
    loginPage = new LoginPage(page);
  });

   test.afterEach(async ({ page }) => {
      await page.close();
    });
    
 test("Change language to EN and back to PL", async ({ page }) => {
  //Act
  await header.switchToEnglish();
  await expect(header.whatsOnLink).toBeVisible();
  //Assert
  await header.switchToPolish();
  await expect(header.repertuarLink).toBeVisible();
});

 test("Check search", async ({ page }) => {
   //Act
  await header.searchCinema("Wrocław-Wroclavia");
  await header.searchResultHeading.click();
  //Assert
  await expect(header.repertuarHeading).toBeVisible();
  await expect(page).toHaveURL(/buy-tickets-by-cinema.*in-cinema=1097/);
});

  test("Check registration page", async ({ page }) => {
  //Act
  await header.registerButton.click();
  //Assert
  await expect(
    page.getByRole("heading", { name: "Utwórz konto My Cinema City" })
  ).toBeVisible();
});

 test("Check login page", async ({ page }) => {
  //Act
  await header.logInButton.click();
  //Assert
  await expect(
    page.getByRole("heading", { name: "Zaloguj się" })
  ).toBeVisible();
});

  test("Find the cinema", async ({ page }) => {
   //Act
  await header.selectCinema("wrocław", "Wrocław - Korona");
  //Assert
  await expect(header.selectedCinemaLabel).toBeVisible();
});
});
