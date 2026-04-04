import { Locator, Page, expect } from "@playwright/test";
export class Unlimited {
  readonly unlimitedHeading: Locator;
  readonly unlimitedBenefitText: Locator;
  readonly teamUnlimitedLink: Locator;
  readonly joinUnlimitedButton: Locator;
  readonly subscriptionGroupsLink: Locator;

  readonly myCinemaCityStep: Locator;
  readonly myCinemaCityText: Locator;

  readonly subscriptionGroupStep: Locator;
  readonly subscriptionGroupText: Locator;

  readonly minimumContractStep: Locator;
  readonly minimumContractText: Locator;

  readonly minimumAgeStep: Locator;
  readonly minimumAgeText: Locator;

  readonly photoStep: Locator;
  readonly photoText: Locator;

  readonly paymentMethodStep: Locator;
  readonly paymentMethodText: Locator;

  readonly appStep: Locator;
  readonly appText: Locator;

  readonly googlePlayLink: Locator;
  readonly appStoreLink: Locator;
  constructor(private readonly page: Page) {
    this.unlimitedHeading = page.getByRole("heading", {
      name: /CINEMA CITY UNLIMITED/i,
    });
    this.unlimitedBenefitText = page.getByText(
      /ABONAMENT KINOWY UNLIMITED - TO SIĘ OPŁACA!/i,
    );
    this.teamUnlimitedLink = page.getByRole("link", { name: "#TeamUnlimited" });
    this.joinUnlimitedButton = page.getByRole("link", {
      name: /DOŁĄCZ DO UNLIMITED/i,
    });
    this.subscriptionGroupsLink = page.getByRole("link", {
      name: /tutaj/i,
    });

    this.myCinemaCityStep = page.getByText(/Konto My Cinema City/i);
    this.myCinemaCityText = page.getByText(/Jeśli nie masz jeszcze konta/i);

    this.subscriptionGroupStep = page.getByText(/Wybór grupy abonamentowej/i);
    this.subscriptionGroupText = page.getByText(/Cena karty Unlimited jest/i);

    this.minimumContractStep = page.getByText(/Umowa na minimum 3 miesiące/i);
    this.minimumContractText = page.getByText(/3-miesięczny minimalny okres/i);

    this.minimumAgeStep = page.getByText(/Mieć ukończone 16 lat/i);
    this.minimumAgeText = page.getByText(/Wymagany wiek do założenia/i);

    this.photoStep = page.getByText(/Dodać swoje zdjęcie/i);
    this.photoText = page.getByText(/Przygotuj zdjęcie lub zrób je/i);

    this.paymentMethodStep = page.getByText(/Wybór formy płatności/i);
    this.paymentMethodText = page.getByText(/Kartą debetową\/kredytową lub/i);

    this.appStep = page.getByText(/Aplikacja Cinema City na/i);
    this.appText = page.getByText(/Niezbędna do weryfikacji/i);

    this.googlePlayLink = page.locator('a[href*="play.google.com"]');

    this.appStoreLink = page.locator('a[href*="apps.apple.com"]');
  }
  async openStepAndCheck(step: Locator, content: Locator): Promise<void> {
    await step.click();
    await expect(content).toBeVisible();
  }
}
