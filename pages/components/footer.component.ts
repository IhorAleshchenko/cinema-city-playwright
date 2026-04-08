import { Page, Locator, expect } from "@playwright/test";

export class Footer {
  //About Section 
  readonly aboutSection: Locator;
  readonly cinemaCityLink: Locator;
  readonly newsLink: Locator;
  readonly jobsLink: Locator;
  readonly newsletterLink: Locator;
  readonly contactLink: Locator;
  // Offer section
  readonly offersSection: Locator;
  readonly offersB2BSection: Locator;
  readonly unlimitedLink: Locator;
  readonly weddingLink: Locator;
  readonly birthdayLink: Locator;
  readonly vouchersLink: Locator;
  readonly rentHallLink: Locator;
  readonly vipZoneLink: Locator;
  //Info section
  readonly infoSection: Locator;
  readonly linksSection: Locator;
  readonly regulationsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly manageCookiesLink: Locator;
  readonly cookiesPolicyLink: Locator;
  readonly taxStrategyLink: Locator;
  readonly forumFilmLink: Locator;
  readonly cinemaAdsLink: Locator;
  //Social media  section 
  readonly socialAndAppColumn: Locator;
  readonly facebookLink: Locator;
  readonly instagramLink: Locator;
  readonly youtubeLink: Locator;
  readonly linkedInLink: Locator;
  readonly androidLink: Locator;
  readonly iosLink: Locator;

  constructor(private readonly page: Page) {
    //About Section
    this.aboutSection = page.locator('div.footer-group', {has: page.locator('h4:has-text("O NAS")')}).first();
    this.cinemaCityLink = this.aboutSection.getByRole('link', { name: 'Cinema City Poland' });
    this.newsLink = this.aboutSection.getByRole('link', { name: 'Newsy Filmowe' });
    this.jobsLink = this.aboutSection.getByRole('link', { name: 'Pracuj z nami' });
    this.newsletterLink = this.aboutSection.getByRole('link', { name: 'Newsletter' });
    this.contactLink = this.aboutSection.getByRole('link', { name: 'Centrum Wsparcia Klienta' });
    //Offer  Sections
    this.offersSection = page.locator('div.footer-group', {has: page.locator('h4', { hasText: /^OFERTY$/ })}).first();
    this.offersB2BSection = page.locator('div.footer-group', {has: page.locator('h4:has-text("OFERTY B2B")')}).first();
    this.unlimitedLink = this.offersSection.getByRole('link', { name: 'Unlimited' });
    this.weddingLink = this.offersSection.getByRole('link', { name: /Ślub i zaręczyny w kinie/i });
    this.birthdayLink = this.offersSection.getByRole('link', { name: 'Urodziny w kinie' });
    this.vouchersLink = this.offersB2BSection.getByRole('link', { name: 'Vouchery dla firm' });
    this.rentHallLink = this.offersB2BSection.getByRole('link', { name: 'Wynajem sal kinowych' });
    this.vipZoneLink = this.offersB2BSection.getByRole('link', { name: 'Wynajem strefy VIP' });
     //Info section 
    this.infoSection = page.locator('div.footer-group', {has: page.locator('h4:has-text("INFORMACJE")')}).first();
    this.linksSection = page.locator('div.footer-group', {has: page.locator('h4:has-text("LINKI")')}).first();
    this.regulationsLink = this.infoSection.getByRole('link', { name: 'Regulacje' });
    this.privacyPolicyLink = this.infoSection.getByRole('link', { name: 'Polityka prywatności' });
    this.manageCookiesLink = this.infoSection.getByRole('link', { name: 'Zarządzaj plikami cookies' });
    this.cookiesPolicyLink = this.infoSection.getByRole('link', { name: 'Polityka cookies' });
    this.taxStrategyLink = this.infoSection.getByRole('link', { name: 'Informacja o strategii podatkowej' });
    this.forumFilmLink = this.linksSection.getByRole('link', { name: 'Forum Film Poland' });
    this.cinemaAdsLink = this.linksSection.getByRole('link', { name: 'Reklama w kinach' });
     //Social media  section 
    this.socialAndAppColumn = page.locator('div.footer-group', {has: page.locator('h4:has-text("OBSERWUJ NAS")')}).first();
    this.facebookLink = this.socialAndAppColumn.getByRole('link', { name: 'Facebook' });
    this.instagramLink = this.socialAndAppColumn.getByRole('link', { name: 'Instagram' });
    this.youtubeLink = this.socialAndAppColumn.getByRole('link', { name: 'YouTube' });
    this.linkedInLink = this.socialAndAppColumn.getByRole('link', { name: 'LinkedIn' });
    this.androidLink = this.socialAndAppColumn.getByRole('link', { name: 'Android' });
    this.iosLink = this.socialAndAppColumn.getByRole('link', { name: 'iOS' });
  }

  async assertLinksHref(links: { locator: Locator; expectedHref: string | RegExp }[]) {
    for (const { locator, expectedHref } of links) {
      await expect(locator).toBeVisible();
      const href = await locator.getAttribute('href');
      expect(href).toMatch(expectedHref);
    }
  }

}
