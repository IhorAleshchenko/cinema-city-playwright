import { Page, Locator } from "@playwright/test";

export class Footer {
    // Section container
  readonly aboutSection: Locator;
  readonly cinemaCityLink: Locator;
  readonly newsLink: Locator;
  readonly jobsLink: Locator;
  readonly newsletterLink: Locator;
  readonly contactLink: Locator;
  
  readonly offersSection: Locator;
  readonly offersB2BSection: Locator;

  readonly unlimitedLink: Locator;
  readonly weddingLink: Locator;
  readonly birthdayLink: Locator;

  readonly vouchersLink: Locator;
  readonly rentHallLink: Locator;
  readonly vipZoneLink: Locator;

  readonly infoSection: Locator;
  readonly linksSection: Locator;

  readonly regulationsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly manageCookiesLink: Locator;
  readonly cookiesPolicyLink: Locator;
  readonly taxStrategyLink: Locator;

  readonly forumFilmLink: Locator;
  readonly cinemaAdsLink: Locator;

  // Optional grouped locators
//   readonly infoLinks: Locator;
//   readonly externalLinks: Locator;
 
  readonly socialAndAppColumn: Locator;

  // Headings
  readonly followUsHeading: Locator;
  readonly downloadAppHeading: Locator;

  // OBSERWUJ NAS
  readonly facebookLink: Locator;
  readonly instagramLink: Locator;
  readonly youtubeLink: Locator;
  readonly linkedInLink: Locator;

  // POBIERZ APLIKACJĘ
  readonly androidLink: Locator;
  readonly iosLink: Locator;

  // Optional grouped locators
  readonly socialLinks: Locator;
  readonly appLinks: Locator;
  constructor(private readonly page: Page) {
    //  this.page = page;
    // Section (anchored by header text)
    this.aboutSection = page.locator('div.footer-group', {
      has: page.locator('h4:has-text("O NAS")')
    }).first();
    // Links (scoped inside section)
    this.cinemaCityLink = this.aboutSection.getByRole('link', { name: 'Cinema City Poland' });
    this.newsLink = this.aboutSection.getByRole('link', { name: 'Newsy Filmowe' });
    this.jobsLink = this.aboutSection.getByRole('link', { name: 'Pracuj z nami' });
    this.newsletterLink = this.aboutSection.getByRole('link', { name: 'Newsletter' });
    this.contactLink = this.aboutSection.getByRole('link', { name: 'Centrum Wsparcia Klienta' });

    //Offer  Sections
    this.offersSection = page.locator('div.footer-group', {
      has: page.locator('h4:has-text("OFERTY")')
    }).first();

    this.offersB2BSection = page.locator('div.footer-group', {
      has: page.locator('h4:has-text("OFERTY B2B")')
    }).first();
    // OFERTY
    this.unlimitedLink = this.offersSection.getByRole('link', { name: 'Unlimited' });
    this.weddingLink = this.offersSection.getByRole('link', { name: /Ślub i zaręczyny w kinie/i });
    this.birthdayLink = this.offersSection.getByRole('link', { name: 'Urodziny w kinie' });
    // OFERTY B2B
    this.vouchersLink = this.offersB2BSection.getByRole('link', { name: 'Vouchery dla firm' });
    this.rentHallLink = this.offersB2BSection.getByRole('link', { name: 'Wynajem sal kinowych' });
    this.vipZoneLink = this.offersB2BSection.getByRole('link', { name: 'Wynajem strefy VIP' });
     //Info section 
    this.infoSection = page.locator('div.footer-group', {
      has: page.locator('h4:has-text("INFORMACJE")')
    }).first();
    //Link Section
    this.linksSection = page.locator('div.footer-group', {
      has: page.locator('h4:has-text("LINKI")')
    }).first();
    this.regulationsLink = this.infoSection.getByRole('link', { name: 'Regulacje' });
    this.privacyPolicyLink = this.infoSection.getByRole('link', { name: 'Polityka prywatności' });
    this.manageCookiesLink = this.infoSection.getByRole('link', { name: 'Zarządzaj plikami cookies' });
    this.cookiesPolicyLink = this.infoSection.getByRole('link', { name: 'Polityka cookies' });
    this.taxStrategyLink = this.infoSection.getByRole('link', { name: 'Informacja o strategii podatkowej' });
    this.forumFilmLink = this.linksSection.getByRole('link', { name: 'Forum Film Poland' });
    this.cinemaAdsLink = this.linksSection.getByRole('link', { name: 'Reklama w kinach' });

    this.socialAndAppColumn = page.locator('div.footer-group', {
      has: page.locator('h4:has-text("OBSERWUJ NAS")')
    }).first();
    // OBSERWUJ NAS
    this.facebookLink = this.socialAndAppColumn.getByRole('link', { name: 'Facebook' });
    this.instagramLink = this.socialAndAppColumn.getByRole('link', { name: 'Instagram' });
    this.youtubeLink = this.socialAndAppColumn.getByRole('link', { name: 'YouTube' });
    this.linkedInLink = this.socialAndAppColumn.getByRole('link', { name: 'LinkedIn' });

    // POBIERZ APLIKACJĘ
    this.androidLink = this.socialAndAppColumn.getByRole('link', { name: 'Android' });
    this.iosLink = this.socialAndAppColumn.getByRole('link', { name: 'iOS' });

    // Optional collections
    this.socialLinks = this.socialAndAppColumn.locator('a').filter({
      hasText: /Facebook|Instagram|YouTube|LinkedIn/
    });

    this.appLinks = this.socialAndAppColumn.locator('a').filter({
      hasText: /Android|iOS/
    });
  }

}
