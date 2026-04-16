import { Locator, Page, expect } from "@playwright/test";

export class Offers {
readonly forYouSection: Locator;
readonly forCompaniesSection: Locator;
readonly forSchoolsSection: Locator;
    constructor(private readonly page: Page){
  this.forYouSection = page.getByText(/DLA CIEBIE I TWOICH BLISKICH/i);
  this.forCompaniesSection = page.getByText( /DLA FIRM I ORGANIZACJI/i);
  this.forSchoolsSection = page.getByText( /DLA SZKÓŁ I GRUP ZORGANIZOWANYCH/i);
    

 }}
 