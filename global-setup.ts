import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.cinema-city.pl/');

  await page.getByRole('button', { name: 'Akceptuj wszystkie' }).click();

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}