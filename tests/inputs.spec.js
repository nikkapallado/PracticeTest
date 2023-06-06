const { test, expect, chromium } = require('@playwright/test');

let context;
let page;
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
        colorScheme: 'dark',
        locale: 'de-DE',
        httpCredentials: {
            username: 'admin',
            password: 'admin',
        },
    });
    await context.tracing.start({ screenshots: true, snapshots: true });
    page = await context.newPage();
});

test.afterAll(async () => {
    await context.tracing.stop({ path: 'example-trace1.zip' });
});

test.skip('evaluate', async () => {
    await page.goto('https://google.com/');

    await page.evaluate(() => {
        document.body.style.background = 'green';
    });

    await page.getByTitle('Search').screenshot({ path: 'element.png' });   
    await page.screenshot({ path: 'screenshot.png' });
});

test('download', async () => {
    await page.goto('https://practice.expandtesting.com/download');
    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('wdio.png').click();
    const download = await downloadPromise;
    // Save downloaded file somewhere
    await download.saveAs('../downloads');
})

test('google', async () => {
    await page.goto('https://www.saucedemo.com/');
})

test('http authentication', async () => {
    await page.goto('https://practice.expandtesting.com/basic-auth');
})

test('getByRole', async () => {
    await page.goto('https://practice.expandtesting.com/checkboxes');
    const checkbox1 = page.getByLabel('Checkbox 1');
    await checkbox1.check();
    expect(checkbox1.isChecked()).toBeTruthy();
});

test('test', async () => {
    await page.goto('https://practice.expandtesting.com/upload');
    await page.locator('#file-upload').click();
    await page.locator('#file-upload').setInputFiles('arcanys logo.png');
    await page.getByRole('button', { name: 'Upload' }).click();
});