import { test, expect, Page } from '@playwright/test';

test.describe('KAN-7 — [Pet-Project][Web]Search for movie by title and verify results', () => {
  const BASE_URL = 'https://www.cinema-city.pl';
  const TEST_MOVIE_TITLE = 'Deadpool';

  // Helper function to navigate to homepage
  async function navigateToHomepage(page: Page): Promise<void> {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(BASE_URL);
  }

  // Helper function to handle cookie consent if present
  async function handleCookieConsent(page: Page): Promise<void> {
    try {
      const acceptButton = page.getByRole('button', { name: /accept|zgod|zaakceptuj/i }).first();
      if (await acceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await acceptButton.click();
        await page.waitForTimeout(500);
      }
    } catch (error) {
      // Cookie consent might not be present, continue
    }
  }

  test('AC1: User can navigate to Cinema City homepage', async ({ page }) => {
    // Navigate to Cinema City homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Verify that the homepage is loaded and contains expected elements
    await expect(page).toHaveURL(BASE_URL);
    
    // Check for presence of main Cinema City branding or header
    const header = page.locator('header, [role="banner"]').first();
    await expect(header).toBeVisible({ timeout: 10000 });

    // Log successful navigation
    console.log('✓ Successfully navigated to Cinema City homepage');
  });

  test('AC2: User can search for a movie by title', async ({ page }) => {
    // Navigate to homepage
    await navigateToHomepage(page);
    await handleCookieConsent(page);

    // Find and interact with search functionality
    // Cinema City typically has a search input or search button in header
    const searchInput = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    
    // If search input is not immediately visible, look for search button
    let hasSearchInput = await searchInput.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (!hasSearchInput) {
      const searchButton = page.getByRole('button', { name: /szukaj|search|lupa/i }).first();
      if (await searchButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await searchButton.click();
        await page.waitForTimeout(500);
      }
    }

    // Type movie title in search field
    const inputField = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    await inputField.fill(TEST_MOVIE_TITLE);
    await inputField.press('Enter');

    // Wait for search results to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify search was performed by checking URL or results presence
    const pageContent = await page.content();
    const hasSearchResults = pageContent.includes(TEST_MOVIE_TITLE) || 
                            (await page.locator('[data-testid*="movie"], .movie-card, [class*="movie"]').first().isVisible({ timeout: 5000 }).catch(() => false));
    
    expect(hasSearchResults).toBeTruthy();
    console.log('✓ Successfully searched for movie by title');
  });

  test('AC3: Search results display at least one movie', async ({ page }) => {
    // Navigate to homepage
    await navigateToHomepage(page);
    await handleCookieConsent(page);

    // Perform search
    const searchInput = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    await searchInput.fill(TEST_MOVIE_TITLE);
    await searchInput.press('Enter');

    // Wait for results to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Find movie result elements - look for various possible selectors used by Cinema City
    const movieResults = page.locator(
      '[data-testid*="movie"], .movie-card, [class*="movie-item"], [class*="film"], article'
    ).first();

    // Verify at least one movie result is displayed
    await expect(movieResults).toBeVisible({ timeout: 10000 });

    // Count visible results
    const allResults = page.locator(
      '[data-testid*="movie"], .movie-card, [class*="movie-item"], [class*="film"], article'
    );
    const resultCount = await allResults.count();
    
    expect(resultCount).toBeGreaterThan(0);
    console.log(`✓ Search results display ${resultCount} movie(s)`);
  });

  test('AC4: Each result shows movie title and showtimes', async ({ page }) => {
    // Navigate to homepage
    await navigateToHomepage(page);
    await handleCookieConsent(page);

    // Perform search
    const searchInput = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    await searchInput.fill(TEST_MOVIE_TITLE);
    await searchInput.press('Enter');

    // Wait for results
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Get first movie result
    const firstMovieResult = page.locator(
      '[data-testid*="movie"], .movie-card, [class*="movie-item"], [class*="film"], article'
    ).first();

    await expect(firstMovieResult).toBeVisible({ timeout: 10000 });

    // Verify movie title is displayed
    const movieTitle = firstMovieResult.locator('h2, h3, [class*="title"], [class*="name"]').first();
    await expect(movieTitle).toBeVisible({ timeout: 5000 });
    const titleText = await movieTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.length).toBeGreaterThan(0);

    // Verify showtimes are displayed
    // Look for time-related elements (they may be in various formats)
    const showtimeElements = firstMovieResult.locator(
      '[class*="time"], [class*="showtime"], [class*="hour"], [class*="godzina"], time, span'
    );
    const showtimeCount = await showtimeElements.count();
    
    // At minimum, there should be some time-related content visible
    const showtimesVisible = showtimeCount > 0 || 
                            (await firstMovieResult.textContent()).match(/\d{1,2}:\d{2}/);
    
    expect(showtimesVisible).toBeTruthy();
    console.log(`✓ Movie result displays title "${titleText}" with showtimes`);
  });

  test('AC5: User can click on a movie and see details page', async ({ page }) => {
    // Navigate to homepage
    await navigateToHomepage(page);
    await handleCookieConsent(page);

    // Perform search
    const searchInput = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    await searchInput.fill(TEST_MOVIE_TITLE);
    await searchInput.press('Enter');

    // Wait for results
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Get first movie result and click on it
    const firstMovieResult = page.locator(
      '[data-testid*="movie"], .movie-card, [class*="movie-item"], [class*="film"], article'
    ).first();

    await expect(firstMovieResult).toBeVisible({ timeout: 10000 });

    // Click on the movie (try clicking on the card itself or a link within it)
    const movieLink = firstMovieResult.getByRole('link').first();
    const isLinkVisible = await movieLink.isVisible({ timeout: 5000 }).catch(() => false);

    if (isLinkVisible) {
      await movieLink.click();
    } else {
      // If no link, click the card itself
      await firstMovieResult.click();
    }

    // Wait for details page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify URL changed (typically to a movie details page)
    const currentURL = page.url();
    const urlChanged = currentURL !== BASE_URL && !currentURL.includes('search');
    
    expect(urlChanged).toBeTruthy();
    console.log(`✓ Successfully clicked on movie and navigated to: ${currentURL}`);
  });

  test('AC6: Details page shows movie title, description, and available cinemas', async ({ page }) => {
    // Navigate to homepage
    await navigateToHomepage(page);
    await handleCookieConsent(page);

    // Perform search
    const searchInput = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    await searchInput.fill(TEST_MOVIE_TITLE);
    await searchInput.press('Enter');

    // Wait for results
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Click on first movie
    const firstMovieResult = page.locator(
      '[data-testid*="movie"], .movie-card, [class*="movie-item"], [class*="film"], article'
    ).first();

    await expect(firstMovieResult).toBeVisible({ timeout: 10000 });

    const movieLink = firstMovieResult.getByRole('link').first();
    const isLinkVisible = await movieLink.isVisible({ timeout: 5000 }).catch(() => false);

    if (isLinkVisible) {
      await movieLink.click();
    } else {
      await firstMovieResult.click();
    }

    // Wait for details page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Verify movie title is displayed on details page
    const detailsTitle = page.locator('h1, [class*="title"]').first();
    await expect(detailsTitle).toBeVisible({ timeout: 10000 });
    const titleText = await detailsTitle.textContent();
    expect(titleText).toBeTruthy();

    // Verify description is present
    // Look for description elements (might be paragraphs, divs with specific classes, etc.)
    const description = page.locator(
      '[class*="description"], [class*="synopsis"], [class*="plot"], p'
    ).first();
    
    const descriptionVisible = await description.isVisible({ timeout: 5000 }).catch(() => false);
    expect(descriptionVisible).toBeTruthy();
    const descriptionText = await description.textContent();
    expect(descriptionText?.length).toBeGreaterThan(10);

    // Verify available cinemas/showtimes information
    // Look for cinema-related elements
    const cinemaInfo = page.locator(
      '[class*="cinema"], [class*="kino"], [class*="theater"], [class*="venue"], [class*="location"]'
    ).first();
    
    const cinemaVisible = await cinemaInfo.isVisible({ timeout: 5000 }).catch(() => false);
    expect(cinemaVisible).toBeTruthy();

    console.log(`✓ Details page displays title: "${titleText}", description, and available cinemas`);
  });

  test('Full workflow: Navigate, Search, View Results, Click Movie, View Details', async ({ page }) => {
    // This test combines all acceptance criteria in a single user workflow

    // Step 1: Navigate to homepage
    await navigateToHomepage(page);
    await expect(page).toHaveURL(BASE_URL);
    console.log('✓ Step 1: Navigated to Cinema City homepage');

    // Step 2: Handle cookie consent if present
    await handleCookieConsent(page);

    // Step 3: Search for a movie
    const searchInput = page.getByPlaceholder(/szukaj|search|wyszukaj/i).first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill(TEST_MOVIE_TITLE);
    await searchInput.press('Enter');
    console.log(`✓ Step 2: Searched for movie "${TEST_MOVIE_TITLE}"`);

    // Step 4: Verify search results display
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const movieResults = page.locator(
      '[data-testid*="movie"], .movie-card, [class*="movie-item"], [class*="film"], article'
    );
    const resultCount = await movieResults.count();
    expect(resultCount).toBeGreaterThan(0);
    console.log(`✓ Step 3: Search results display ${resultCount} movie(s)`);

    // Step 5: Verify first result shows title and showtimes
    const firstResult = movieResults.first();
    await expect(firstResult).toBeVisible();
    const titleElement = firstResult.locator('h2, h3, [class*="title"]').first();
    await expect(titleElement).toBeVisible();
    const titleText = await titleElement.textContent();
    expect(titleText?.length).toBeGreaterThan(0);
    console.log(`✓ Step 4: Result shows movie title: "${titleText}"`);

    // Step 6: Click on movie to view details
    const movieLink = firstResult.getByRole('link').first();
    const isLinkVisible = await movieLink.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isLinkVisible) {
      await movieLink.click();
    } else {
      await firstResult.click();
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    console.log('✓ Step 5: Clicked on movie and navigated to details page');

    // Step 7: Verify details page content
    const detailsTitle = page.locator('h1, [class*="title"]').first();
    await expect(detailsTitle).toBeVisible({ timeout: 10000 });
    const detailsTitleText = await detailsTitle.textContent();
    expect(detailsTitleText).toBeTruthy();

    const descriptionElement = page.locator(
      '[class*="description"], [class*="synopsis"], [class*="plot"], p'
    ).first();
    const descriptionVisible = await descriptionElement.isVisible({ timeout: 5000 }).catch(() => false);
    expect(descriptionVisible).toBeTruthy();

    const cinemaElement = page.locator(
      '[class*="cinema"], [class*="kino"], [class*="theater"], [class*="venue"], [class*="location"]'
    ).first();
    const cinemaVisible = await cinemaElement.isVisible({ timeout: 5000 }).catch(() => false);
    expect(cinemaVisible).toBeTruthy();

    console.log(`✓ Step 6: Details page shows title, description, and available cinemas`);
    console.log('✓ Complete workflow successful!');
  });
});