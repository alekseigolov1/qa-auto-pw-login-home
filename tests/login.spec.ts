import {expect, test} from '@playwright/test'

test.describe( "Login", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://fe-delivery.tallinn-learning.ee/signin');
    })

    test('Check for incorrect credentials message and close popup message', async ({ page }) => {
        const inputUsername = page.getByTestId("username-input")
        const inputPassword = page.getByTestId("password-input")
        const signInButton = page.getByTestId("signIn-button")
        const errorPopUpMessage = page.getByTestId("authorizationError-popup")
        const closeButton = page.getByTestId("authorizationError-popup-close-button")

        await inputUsername.fill("incorrectUsername")
        await inputPassword.fill("incorrectPassword")
        await signInButton.click()
        await expect(errorPopUpMessage).toBeVisible()

        await closeButton.click()
        await expect(signInButton).toBeEnabled()
    });


})