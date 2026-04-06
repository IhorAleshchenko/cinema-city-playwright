import { Locator, Page } from "@playwright/test";

export class Main {
  readonly slider: Locator;
  readonly nowPlayingHeader: Locator;
  readonly comingSoonHeader: Locator;
  readonly watchInFormatHeader: Locator;
  readonly familyFriendlyHeader: Locator;
  readonly eventsHeader: Locator;
  readonly buyTicketButton: Locator;

  readonly blogHeading: Locator;
  readonly blogLink: Locator;

  readonly formatsTab: Locator;
  readonly vipCard: Locator;
  readonly screenxCard: Locator;
  readonly comfortSeatCard: Locator;
  readonly laserProjectionCard: Locator;

  readonly recommendedTab: Locator;
  readonly unlimitedCard: Locator;
  readonly spinCityCard: Locator;
  readonly gameZoneCard: Locator;
  readonly myCinemaCityCard: Locator;

  readonly barKinoTab: Locator;
  readonly vipSnacksCard: Locator;
  readonly concessionOfferCard: Locator;
  readonly movieMerchCard: Locator;
  readonly popcornCard: Locator;

  readonly firmTab: Locator;
  readonly exceptionalVipCard: Locator;
  readonly bestEventsCard: Locator;
  readonly unlimitedForBusinessCard: Locator;

  readonly schoolTab: Locator;
  readonly forGroupCard: Locator;
  readonly imaxEducationCard: Locator;
  readonly worldOfChildCard: Locator;
  readonly teacherClubCard: Locator;

  constructor(page: Page) {
    this.slider = page.locator('[data-slick="slick-hero"]');

    //Section headings
    this.nowPlayingHeader = page.locator('[data-qa="now-playing-feed-header"] h2');
    this.comingSoonHeader = page.locator('[data-qa="coming-soon-feed-header"] h2');
    this.watchInFormatHeader = page.locator('[data-qa="watch-in-format-feed-header"] h2');
    this.familyFriendlyHeader = page.locator('[data-qa="family-friendly-feed-header"] h2');
    this.eventsHeader = page.locator('[data-qa="events-feed-header"] h2');

    //Buy ticket / Blog
    this.buyTicketButton = page.getByRole("button", { name: /kup bilet/i });
    this.blogHeading = page.getByRole("heading", { name: "BLOG" });
    this.blogLink = page.getByRole("link", { name: /wszystkie artykuły/i });

    // Each panel renders links twice (desktop + mobile carousel).
    // .first() ensures we always target the desktop version.

    //Formats tab
    const formatsPanel = page.locator("#tab_promoTab1");
    this.formatsTab = page.locator("#promoTab1_tab");
    this.vipCard = formatsPanel.getByRole("link", { name: /VIP Poczuj/i }).first();
    this.screenxCard = formatsPanel.getByRole("link", { name: /SCREENX/i }).first();
    this.comfortSeatCard = formatsPanel.getByRole("link", { name: /FOTEL KOMFORT/i }).first();
    this.laserProjectionCard = formatsPanel.getByRole("link", { name: /PROJEKCJA LASEROWA/i }).first();

    //Recommended tab
    const recommendedPanel = page.locator("#tab_promoTab2");
    this.recommendedTab = page.locator("#promoTab2_tab");
    this.unlimitedCard = recommendedPanel.getByRole("link", { name: /UNLIMITED Jedyny/i }).first();
    this.spinCityCard = recommendedPanel.getByRole("link", { name: /SPIN CITY Miejsce/i }).first();
    this.gameZoneCard = recommendedPanel.getByRole("link", { name: /GAME ZONE/i }).first();
    this.myCinemaCityCard = recommendedPanel.getByRole("link", { name: /MY CINEMA CITY/i }).first();

    //Bar tab
    const barPanel = page.locator("#tab_promoTab3");
    this.barKinoTab = page.locator("#promoTab3_tab");
    this.vipSnacksCard = barPanel.getByRole("link", { name: /VIP Nielimitowane/i }).first();
    this.concessionOfferCard = barPanel.getByRole("link", { name: /BAROWA OFERTA/i }).first();
    this.movieMerchCard = barPanel.getByRole("link", { name: /FILMOWY MERCH/i }).first();
    this.popcornCard = barPanel.getByRole("link", { name: /POPCORN SMAKOWY/i }).first();

    //Firm tab
    const firmPanel = page.locator("#tab_promoTab4");
    this.firmTab = page.locator("#promoTab4_tab");
    this.exceptionalVipCard = firmPanel.getByRole("link", { name: /VIP W strefie/i }).first();
    this.bestEventsCard = firmPanel.getByRole("link", { name: /SPIN CITY Najlepsze/i }).first();
    this.unlimitedForBusinessCard = firmPanel.getByRole("link", { name: /UNLIMITED DLA FIRM/i }).first();

    //School 
    const schoolPanel = page.locator("#tab_promoTab5");
    this.schoolTab = page.locator("#promoTab5_tab");
    this.forGroupCard = schoolPanel.getByRole("link", { name: /PROPOZYCJE DLA GRUP/i }).first();
    this.imaxEducationCard = schoolPanel.getByRole("link", { name: /PROGRAM EDUKACYJNY IMAX/i }).first();
    this.worldOfChildCard = schoolPanel.getByRole("link", { name: /FILMOWY ŚWIAT DZIECKA/i }).first();
    this.teacherClubCard = schoolPanel.getByRole("link", { name: /KLUB NAUCZYCIELA/i }).first();
  }

  getActiveSlide(): Locator {
    return this.slider.locator(".slick-slide.slick-current.slick-active");
  }

  async clickActiveSlide(): Promise<string> {
    const active = this.getActiveSlide();
    const href = await active.getAttribute("href");
    await active.click();
    return href ?? "";
  }
}
