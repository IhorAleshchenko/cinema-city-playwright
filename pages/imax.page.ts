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
  readonly filmAdventureHeading: Locator;
  readonly imaxWithLaserHeading: Locator;
  readonly videoSlider: Locator;
  readonly activeVideoThumb: Locator;
  readonly selectCinemaHeading: Locator;
  readonly katowiceButton: Locator;
  readonly krakowButton: Locator;
  readonly lodzButton: Locator;
  readonly poznanButton: Locator;
  readonly warszawaButton: Locator;
  readonly wroclawButton: Locator;

  constructor(private readonly page: Page) {
    this.getToKnow = page.getByRole('tab', { name: 'Poznaj' });
    this.imaxHeading = page.getByRole('heading', { name: 'IMAX', level: 4 });
    this.sadybaLink = page.getByRole('link', { name: /Sadyba/ });
    this.poznanPlazaLink = page.getByRole('link', { name: /Poznań Plaza/ });
    this.punkt44Link = page.getByRole('link', { name: /Punkt 44/ });
    this.manufakturaLink = page.getByRole('link', { name: /Manufaktura/ });
    this.wroclaviaLink = page.getByRole('link', { name: /Wroclavia/ });
    this.zakopiankaLink = page.getByRole('link', { name: /Zakopianka/ });
    this.moreAboutImax = page.getByRole('tab', { name: /więcej o imax/i });
    this.filmAdventureHeading = page.getByText(/FILMOWA PRZYGODA TWOJEGO ŻYCIA/i);
    this.imaxWithLaserHeading = page.getByText(/IMAX DMR/i);
    this.videoSlider = page.locator('[data-slick="slick-video"]');
    this.activeVideoThumb = page.locator('.slick-video-thumb[aria-pressed="true"]');
    this.selectCinemaHeading = page.getByText(/Wybierz kino, aby zobaczyć dostępne filmy w formacie /i);
    this.katowiceButton = page.locator('[data-automation-id="chooseExperienceCinemaButton"]', { hasText: /Katowice/i });
    this.krakowButton = page.locator('[data-automation-id="chooseExperienceCinemaButton"]', { hasText: /Kraków/i });
    this.lodzButton = page.locator('[data-automation-id="chooseExperienceCinemaButton"]', { hasText: /Łódź/i });
    this.poznanButton = page.locator('[data-automation-id="chooseExperienceCinemaButton"]', { hasText: /Poznań/i });
    this.warszawaButton = page.locator('[data-automation-id="chooseExperienceCinemaButton"]', { hasText: /Warszawa/i });
    this.wroclawButton = page.locator('[data-automation-id="chooseExperienceCinemaButton"]', { hasText: /Wrocław/i });
  }

  getScheduleHeading(cinemaName: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(cinemaName, 'i'), level: 2 });
  }

  async assertLinksHref(links: { locator: Locator; expectedHref: string | RegExp }[]) {
    for (const { locator, expectedHref } of links) {
      await expect(locator).toBeVisible();
      const href = await locator.getAttribute('href');
      expect(href).toMatch(expectedHref);
    }
  }
}
