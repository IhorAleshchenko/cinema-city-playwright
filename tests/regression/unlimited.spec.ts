import test, { expect } from "@playwright/test";
import { Header } from "../../pages/components/header.component";
import { Unlimited } from "../../pages/unlimited.page";

test.describe("Unlimited", () => {
  test.describe.configure({ retries: 1 });
  let header: Header;
  let unlimited: Unlimited;

  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    header = new Header(page);
    unlimited = new Unlimited(page);
    await header.unlimitedCard.click();
  });
  test("Open first movie from the list", async ({ page }) => {
    await expect(unlimited.unlimitedHeading).toBeVisible();
  });

  test("should display all team unlimited steps correctly", async ({ page }) => {
    await unlimited.teamUnlimitedLink.click();
    await unlimited.openStepAndCheck(
      unlimited.myCinemaCityStep,
      unlimited.myCinemaCityText,
    );
    await unlimited.openStepAndCheck(
      unlimited.subscriptionGroupStep,
      unlimited.subscriptionGroupText,
    );
    await unlimited.openStepAndCheck(
      unlimited.minimumContractStep,
      unlimited.minimumContractText,
    );
    await unlimited.openStepAndCheck(
      unlimited.minimumAgeStep,
      unlimited.minimumAgeText,
    );
    await unlimited.openStepAndCheck(
      unlimited.photoStep,
      unlimited.photoText,
    );
    await unlimited.openStepAndCheck(
      unlimited.paymentMethodStep,
      unlimited.paymentMethodText,
    );
    await unlimited.openStepAndCheck(
      unlimited.appStep,
      unlimited.appText,
    );
  });

  test("should display all team unlimited options", async ({ page }) => {
    await expect(unlimited.unlimitedHeading).toBeVisible();
  });
});
