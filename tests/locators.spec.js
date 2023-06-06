const { test, expect } = require('@playwright/test');

test('getByRole', async ({ context }) => {
    // Create a sauceDemo.
    const page = await context.newPage();

    await page.goto('https://practice.expandtesting.com/my-browser');
    const button = page.getByRole('button', { name: 'Show Browser Information' })
    await button.hover();
    await button.click();

    const page2 = await context.newPage();
    page2.goto('https://practice.expandtesting.com/inputs');
    const number_input = page2.getByRole('input', {name:'input-number'});
    await number_input.click();
    await number_input.fill('hello');
});