import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { Header } from "../../pages/header.component";


test.describe('Login Tests', () => {

    test.describe.configure({retries: 1});
    let loginPage : LoginPage;
    let header : Header;

    test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Akceptuj wszystkie' }).click();
    await page.pause();
    header = new Header(page);
    loginPage = new LoginPage(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
    // baseUrl = testInfo.project.use.baseURL;
  });

  test('correct Log In', async ({ page }) => {
    console.log('Login Tests on:',);
     //Act 
    await loginPage.logIn();
    await page.waitForLoadState('networkidle');
    // assert
    expect (loginPage.loginConfirmation).toBeVisible();
  await page.waitForLoadState('networkidle');
});
});