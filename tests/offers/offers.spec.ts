import test, { expect } from "@playwright/test";

test('test', async ({ page }) => {
  await page.goto('https://www.cinema-city.pl/#/');
  await page.getByRole('button', { name: 'Akceptuj wszystkie' }).click();
  await page.getByRole('button', { name: 'PL' }).click();
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(header.whatsOnLink).toBeVisible();.toBeVisible();
  
});