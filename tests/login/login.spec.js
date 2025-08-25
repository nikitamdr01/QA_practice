import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.viennabakery.ca/');
});

test('valid login', async ({ page }) => {
    await page.goto('https://www.viennabakery.ca/?fuseaction=member.login');

    await page.locator('//input[@name="username"]').fill('email');
    await page.getByRole('link', { name: 'Get started' }).fill('password');
    await page.getByRole('link', { name: 'Get started' }).click();


    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/ViennaBakery/);
});

test('Invalid login', async ({ page }) => {
    await page.goto('https://www.viennabakery.ca/?fuseaction=member.login');
    await page.locator('//input[@name="username"]').fill('email');
    await page.locator('//input[@name="password"]').fill('wrongpassword');

    await page.getByRole('link', { name: 'Get started' }).click();


    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL(/ViennaBakery/);
});

// tag_name[@attribute="value"]