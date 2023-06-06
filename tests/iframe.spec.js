const { test, expect } = require('@playwright/test');

test('iframe', async ({ context }) => {
    // Create a sauceDemo.
    const iframePage = await context.newPage();

    // Navigate explicitly, similar to entering a URL in the browser.
    await iframePage.goto('https://practice.expandtesting.com/iframe');
    const frame = iframePage.frameLocator('#iframe-youtube');
    await frame.getByRole('button', { name: 'Play' }).click();
});