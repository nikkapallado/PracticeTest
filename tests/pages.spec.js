const { test, expect } = require('@playwright/test');

test('sauceDemos', async ({ context }) => {
    // Create a sauceDemo.
    const sauceDemoPage = await context.newPage();

    // Navigate explicitly, similar to entering a URL in the browser.
    await sauceDemoPage.goto('https://www.saucedemo.com/');
    await sauceDemoPage.locator('[data-test="username"]').click();
    await sauceDemoPage.locator('[data-test="username"]').fill('standard_user');
    await sauceDemoPage.locator('[data-test="username"]').press('Tab');
    await sauceDemoPage.locator('[data-test="password"]').fill('secret_sauce');
    await sauceDemoPage.locator('[data-test="login-button"]').click();

    // Start waiting for new page before clicking. Note no await.
    const pagePromise = context.waitForEvent('page');
    await sauceDemoPage.getByText('LinkedIn').click();
    const linkedInPage = await pagePromise;
    await linkedInPage.waitForLoadState();
});