import {expect, Locator, Page, test} from '@playwright/test'
import { faker } from '@faker-js/faker';

const fakerCriteriaObjectPasswordShort = { length: { min: 1, max: 7 } }
const fakerCriteriaObjectUsernameShort = { length: { min: 1, max: 1 } }
const fakerCriteriaObject = { length: { min: 8, max: 15 } }
const errorString = "The field must contain at least of characters"

test.describe( "Testing of Login error messaging", () => {

    function selectElements(page: Page) {
        inputUsername = page.getByTestId("username-input")
        inputPassword = page.getByTestId("password-input")
        signInButton = page.getByTestId("signIn-button")
        errorPopUpMessage = page.getByTestId("authorizationError-popup")
        closeButton = page.getByTestId("authorizationError-popup-close-button")
        inputUsernameEmptyErrorMessage = page.getByTestId('username-input-error').first()
        inputPasswordEmptyErrorMessage = page.getByTestId('username-input-error').nth(1)
        inputUsernameShortErrorMessage = page.getByText(`${errorString}: 2`)
        inputPasswordShortErrorMessage = page.getByText(`${errorString}: 8`)
    }

    let inputUsername: Locator
    let inputPassword: Locator
    let signInButton: Locator
    let errorPopUpMessage: Locator
    let closeButton: Locator
    let inputUsernameEmptyErrorMessage: Locator
    let inputPasswordEmptyErrorMessage: Locator
    let inputUsernameShortErrorMessage: Locator
    let inputPasswordShortErrorMessage: Locator

    test.beforeEach(async ({ page }) => {
        await page.goto('https://fe-delivery.tallinn-learning.ee/signin');
    })

    test('Check for incorrect credentials message and close popup message', async ({ page }) => {
       selectElements(page)
        await inputUsername.fill(faker.string.alpha(fakerCriteriaObject))
        await inputPassword.fill(faker.string.alphanumeric(fakerCriteriaObject))
        await signInButton.click()
        await expect(errorPopUpMessage).toBeVisible()
        await closeButton.click()
        await expect(signInButton).toBeEnabled()
    });

    test('Check for error messages for empty fields', async ({ page }) => {
        selectElements(page)
        await inputUsername.fill(faker.string.alpha(fakerCriteriaObject))
        await inputPassword.fill(faker.string.alphanumeric(fakerCriteriaObject))
        await inputUsername.fill("")
        await inputPassword.fill("")
        await expect(inputUsernameEmptyErrorMessage).toBeVisible()
        await expect(inputPasswordEmptyErrorMessage).toBeVisible()
    });

    test('Check for error messages for short input', async ({ page }) => {
        selectElements(page)
        await inputUsername.fill(faker.string.alpha(fakerCriteriaObjectUsernameShort))
        await inputPassword.fill(faker.string.alphanumeric(fakerCriteriaObjectPasswordShort))
        await expect(inputUsernameShortErrorMessage).toBeVisible()
        await expect(inputPasswordShortErrorMessage).toBeVisible()
    });
})