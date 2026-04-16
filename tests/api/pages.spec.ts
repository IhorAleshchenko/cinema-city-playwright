import { test, expect } from "@playwright/test";

const BASE_URL = "https://www.cinema-city.pl";

test.describe("@api Page availability", () => {

  const publicPages = [
    { name: "Homepage",             path: "/" },
    { name: "Blog",                 path: "/blog" },
    { name: "About us",             path: "/o-nas" },
    { name: "Jobs",                 path: "/oferty-pracy" },
    { name: "Contact",              path: "/kontakt" },
    { name: "Unlimited",            path: "/unlimited" },
    { name: "Privacy policy",       path: "/privacy-policy-pl" },
    { name: "Cookies policy",       path: "/cookies" },
    { name: "Regulations",          path: "/regulacje-footer" },
    { name: "Wedding offer",        path: "/oferty/slub-i-zareczyny" },
    { name: "Birthday offer",       path: "/oferty/urodziny" },
    { name: "Vouchers for firms",   path: "/oferty/vouchery-dla-firm" },
    { name: "Hall rental",          path: "/wynajem-sal-eventy" },
  ];

  for (const { name, path } of publicPages) {
    test(`${name} should return 200`, async ({ request }) => {
      const response = await request.get(`${BASE_URL}${path}`);

      expect(response.status()).toBe(200);
    });
  }

});
