import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  readonly emailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly termsCheckbox: Locator;
  readonly marketingCheckbox: Locator;
  readonly privacyPolicyLink: Locator;
  readonly termsOfServiceLink: Locator;
  readonly emailFormatError: Locator;
  readonly passwordFormatError: Locator;
  readonly requiredFieldError: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator('[data-automation-id="signup-form-email-input"]');
    this.confirmEmailInput = page.locator('[data-automation-id="signup-form-confirm-email-input"]');
    this.passwordInput = page.locator('[data-automation-id="signup-form-password-input"]');
    this.firstNameInput = page.locator('[data-automation-id="signup-form-firstName-input"]');
    this.lastNameInput = page.locator('[data-automation-id="signup-form-lastName-input"]');
    this.phoneInput = page.locator('input[name="telephone"]');
    this.termsCheckbox = page.locator('[data-automation-id="signup-form-termsAndConditions-checkbox"]');
    this.marketingCheckbox = page.locator('[data-automation-id="signup-form-constent-checkbox"]');
    this.privacyPolicyLink = page.locator('a[href="/privacy-policy-pl"]');
    this.termsOfServiceLink = page.locator('a[href="/regulamin-swiadczenia-uslug-droga-elektroniczna"]');
    this.emailFormatError = page.getByText(/Nieprawidłowy format adresu e-mail!/i);
    this.passwordFormatError = page.getByText(/Nieprawidłowy format hasła!/i);
    this.requiredFieldError = page.locator("p").filter({ hasText: /To pole jest wymagane/i });
  }
}
