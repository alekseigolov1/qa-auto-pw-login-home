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

    test('Check for error messages for empty fields', async ({ page }) => {
        const inputUsername = page.getByTestId("username-input")
        const inputPassword = page.getByTestId("password-input")

        const inputUsernameEmptyErrorMessage = page.getByTestId('username-input-error').first()
        const inputPasswordEmptyErrorMessage = page.getByTestId('username-input-error').nth(1)

        await inputUsername.fill("test")
        await inputPassword.fill("test")
        await inputUsername.fill("")
        await inputPassword.fill("")
        await expect(inputUsernameEmptyErrorMessage).toBeVisible()
        await expect(inputPasswordEmptyErrorMessage).toBeVisible()
    });

    test('Check for error messages for short input', async ({ page }) => {
        const inputUsername = page.getByTestId("username-input")
        const inputPassword = page.getByTestId("password-input")

        const inputUsernameEmptyErrorMessage = page.getByText('The field must contain at least of characters: 2')
        const inputPasswordEmptyErrorMessage = page.getByText("The field must contain at least of characters: 8")

        await inputUsername.fill("t")
        await inputPassword.fill("test")
        await expect(inputUsernameEmptyErrorMessage).toBeVisible()
        await expect(inputPasswordEmptyErrorMessage).toBeVisible()
    });
})