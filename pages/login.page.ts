import { Locator, Page } from "@playwright/test";
import { Header } from "./components/header.component";
import { loginData } from "../test-data/login.data";

export class LoginPage {
  readonly emailInputLogin: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginConfirmation: Locator;
  readonly wrongCredentialsAlert: Locator;
  readonly passwordToggleButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;
  readonly loginHeading: Locator;

  constructor(private page: Page) {
    this.emailInputLogin = page.locator('[data-automation-id="login-screen-email-input"]');
    this.passwordInput = page.locator('[data-automation-id="login-screen-password-input"]');
    this.loginButton = page.getByRole("button", { name: "Logowanie" });
    this.loginConfirmation = page.getByRole("link", { name: "Moje konto" });
    this.wrongCredentialsAlert = page.locator(".alert.alert-danger.validation-error");
    this.passwordToggleButton = page.locator('[data-automation-id="login-screen-password-input-addon"]');
    this.forgotPasswordLink = page.getByRole("link", { name: /Zapomniałeś hasła/i });
    this.registerLink = page.locator('a[href="/rejestracja/my-cinema-city"]');
    this.loginHeading = page.getByRole("heading", { name: /Zaloguj się/i });
  }

  async enterPasswordAndShowIt(): Promise<void> {
    await this.passwordInput.fill(loginData.userPassword);
    await this.passwordToggleButton.click();
  }

  /**
   * NOTE:
   * This method represents a reusable login flow.
   * It is not used in tests because the target site uses Cloudflare Turnstile,
   * which blocks automated login attempts.
   *
   * In a real project (without anti-bot protection), this method would be used
   * for authenticated test scenarios.
   */
  async logIn(): Promise<void> {
    const header = new Header(this.page);
    await header.logInButton.click();
    await this.emailInputLogin.fill(loginData.userId);
    await this.passwordInput.fill(loginData.userPassword);
    await this.loginButton.click();
  }
}
