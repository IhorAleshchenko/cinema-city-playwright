import { Locator, Page } from "@playwright/test";

export class ResetPasswordPage {
  readonly resetPasswordInput: Locator;
  readonly resetPasswordHeading: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.resetPasswordInput = page.locator('[data-automation-id="reset-password-email-input"]');
    this.resetPasswordHeading = page.getByRole("heading", { name: /Zmień hasło/i });
    this.registerLink = page.locator('a[href="/rejestracja/my-cinema-city"]');
  }
}
