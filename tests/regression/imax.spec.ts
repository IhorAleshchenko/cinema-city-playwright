import { test, expect } from "../../fixtures/errorListener.fixture";
import { Header } from "../../pages/components/header.component";

test.describe ("@regression @imax Imax", () =>{
    test.describe.configure({ retries: 1 });
      // Cloudflare may intercept on first load
      let header: Header;

    test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
     });

     test("Test", async () => {
    await header.switchToEnglish();
    await expect(header.whatsOnLink).toBeVisible();

    await header.switchToPolish();
    await expect(header.repertuarLink).toBeVisible();
  });

  test("Test 1", async () => {
    await header.switchToEnglish();
    await expect(header.whatsOnLink).toBeVisible();

    await header.switchToPolish();
    await expect(header.repertuarLink).toBeVisible();
  });
}

)