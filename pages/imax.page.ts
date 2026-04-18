import { Locator, Page, expect } from "@playwright/test";

export class ImaxPage {
  readonly getToKnow: Locator;
  readonly imaxHeading: Locator;
  readonly sadybaLink: Locator;
  readonly poznanPlazaLink: Locator;
  readonly punkt44Link: Locator;
  readonly manufakturaLink: Locator;
  readonly wroclaviaLink: Locator;
  readonly zakopiankaLink: Locator;
  readonly moreAboutImax: Locator;

  constructor(page: Page) {
    this.getToKnow = page.getByRole('tab', { name: 'Poznaj' });
    this.imaxHeading = page.getByRole('heading', { name: 'IMAX', level: 4 });
    this.sadybaLink = page.getByRole('link', { name: /Sadyba/ });
    this.poznanPlazaLink = page.getByRole('link', { name: /Poznań Plaza/ });
    this.punkt44Link = page.getByRole('link', { name: /Punkt 44/ });
    this.manufakturaLink = page.getByRole('link', { name: /Manufaktura/ });
    this.wroclaviaLink = page.getByRole('link', { name: /Wroclavia/ });
    this.zakopiankaLink = page.getByRole('link', { name: /Zakopianka/ });
    this.moreAboutImax = page.getByRole('tab', { name: /więcej o imax/i });
  }

  async assertLinksHref(links: { locator: Locator; expectedHref: string | RegExp }[]) {
    for (const { locator, expectedHref } of links) {
      await expect(locator).toBeVisible();
      const href = await locator.getAttribute('href');
      expect(href).toMatch(expectedHref);
    }
  }
}
