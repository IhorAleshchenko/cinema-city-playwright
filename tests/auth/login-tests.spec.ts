import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { ResetPasswordPage } from "../../pages/reset-password.page";
import { RegisterPage } from "../../pages/register.page";
import { Header } from "../../pages/components/header.component";

test.describe("@auth Login Tests", () => {
  test.describe.configure({ retries: 1 });
  // Cloudflare may intercept on first load

  let loginPage: LoginPage;
  let resetPasswordPage: ResetPasswordPage;
  let registerPage: RegisterPage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    loginPage = new LoginPage(page);
    resetPasswordPage = new ResetPasswordPage(page);
    registerPage = new RegisterPage(page);
    await header.logInButton.click();
  });

  test("should display all required elements on login page", async ({ page }) => {
    await expect(loginPage.loginHeading).toHaveText(/Zaloguj się/i);
    await expect(loginPage.emailInputLogin).toBeEnabled();
    await expect(loginPage.passwordInput).toBeEnabled();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
    await expect(page).toHaveURL(/zaloguj/);
  });

  test("should show validation errors for empty login form", async ({ page }) => {
    await loginPage.loginButton.click();

    await expect(page.getByText(/To pole jest wymagane/i)).toHaveCount(2);
  });

  test("should show email format error for invalid email input", async () => {
    await loginPage.emailInputLogin.fill("test");

    await expect(loginPage.wrongCredentialsAlert).toBeVisible();
  });

  test("should show password after clicking toggle", async () => {
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
    await expect(loginPage.passwordToggleButton).toHaveText(/Pokaż/i);

    await loginPage.enterPasswordAndShowIt();

    await expect(loginPage.passwordInput).toHaveAttribute("type", "text");
    await expect(loginPage.passwordToggleButton).toHaveText(/Ukryj/i);
  });

  test("should open forgot password page", async ({ page }) => {
    await loginPage.forgotPasswordLink.click();

    await expect(resetPasswordPage.resetPasswordHeading).toBeVisible();
    await expect(resetPasswordPage.resetPasswordInput).toBeEnabled();
    await expect(resetPasswordPage.registerLink).toBeVisible();
    await expect(page).toHaveURL(/reset-hasla/);
  });

  test("should display registration form fields", async ({ page }) => {
    await loginPage.registerLink.click();

    await expect(registerPage.emailInput).toBeEnabled();
    await expect(registerPage.confirmEmailInput).toBeEnabled();
    await expect(registerPage.passwordInput).toBeEnabled();
    await expect(registerPage.firstNameInput).toBeEnabled();
    await expect(registerPage.lastNameInput).toBeEnabled();
    await expect(registerPage.phoneInput).toBeEnabled();
    await expect(registerPage.termsCheckbox).toBeVisible();
    await expect(registerPage.termsOfServiceLink).toBeVisible();
    await expect(page).toHaveURL(/rejestracja/);
  });

  test("should show validation errors for invalid registration form input", async () => {
    await loginPage.registerLink.click();

    await registerPage.emailInput.fill("test");
    await registerPage.confirmEmailInput.fill("test");
    await registerPage.passwordInput.fill("test");
    await registerPage.firstNameInput.fill("");
    await registerPage.lastNameInput.fill("");
    await registerPage.lastNameInput.press("Tab");

    await expect(registerPage.passwordFormatError).toBeVisible();
    await expect(registerPage.emailFormatError).toHaveCount(2);
    await expect(registerPage.requiredFieldError).toHaveCount(2);
  });

  test("should toggle terms and conditions checkbox", async () => {
    await loginPage.registerLink.click();

    await registerPage.termsCheckbox.check();
    await expect(registerPage.termsCheckbox).toBeChecked();

    await registerPage.termsCheckbox.uncheck();
    await expect(registerPage.termsCheckbox).not.toBeChecked();
  });

  test("should toggle marketing consent checkbox", async () => {
    await loginPage.registerLink.click();

    await registerPage.marketingCheckbox.check();
    await expect(registerPage.marketingCheckbox).toBeChecked();

    await registerPage.marketingCheckbox.uncheck();
    await expect(registerPage.marketingCheckbox).not.toBeChecked();
  });
});
