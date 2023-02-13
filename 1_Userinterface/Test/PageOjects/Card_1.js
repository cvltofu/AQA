import { Key } from 'webdriverio';
import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';
import RandomData from '../../Framework/Utils/RandomData.js';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';

export default class HomePage extends BaseForm {
    constructor() {
        super('//div[@class="login-form-with-pw-check"]');

        this._passField = new TextField(
            '//input[@placeholder="Choose Password"]',
            'password field'
        );
        this._emailField = new TextField(
            '//input[@placeholder="Your email"]',
            'email field'
        );
        this._domainField = new TextField(
            '//input[@placeholder="Domain"]',
            'domain field'
        );
        this._domainSelector = new TextField(
            '//div[@class="dropdown__field"]',
            'domain field'
        );
        this._dropdownDomain = new Button(
            `//div[@class="dropdown__list"]//div[${RandomData.getRandomNumber(
                1,
                11
            )}]`,
            'domain'
        );
        this._termsCheck = new Button(
            '//span[@class="icon icon-check checkbox__check"]',
            'terms checkbox'
        );
        this._nextBtn = new Button(
            '//div[@class="align__cell button-container__secondary"]',
            '"next" button'
        );
        this._hideHelpBtn = new Button(
            '//button[@class="button button--solid button--blue help-form__send-to-bottom-button"]',
            'hide help button'
        );
        this._acceptCookiesBtn = new Button(
            '//button[@class="button button--solid button--transparent"]',
            'accept cookies button'
        );
        this._timer = new TextField(
            '//div[@class="timer timer--white timer--center"]',
            'timer'
        );

        this._email = RandomData.getRandomEmail(JsonHandler.getEmailLength());
        this._password =
            RandomData.getRandomPassword(JsonHandler.getPassLength()) +
            this._email[0] +
            this._email[1] +
            '1';
    }

    async clickOnAndClear(field) {
        await field.clickOn();
        await field.sendKeys([Key.Control, 'a', Key.Backspace]);
    }

    async enterRandomPass() {
        await this.clickOnAndClear(this._passField);
        await this._passField.sendKeys([this._password]);
    }

    async enterRandomEmail() {
        await this.clickOnAndClear(this._emailField);
        await this._emailField.sendKeys([this._email]);
    }

    async enterAndSelectDomain() {
        await this.clickOnAndClear(this._domainField);
        await this._emailField.sendKeys(['mail']);
        await this._domainSelector.clickOn();
        await this._dropdownDomain.waitForDisplayed();
        await this._dropdownDomain.clickOn();
    }

    async acceptTermsAndClickNext() {
        await this._termsCheck.clickOn();
        await this._nextBtn.clickOn();
    }

    async hideHelpAndCheckIsDisplayed() {
        await this._hideHelpBtn.clickOn();

        const helpFormContent = await this._hideHelpBtn.getElement();
        await helpFormContent.waitUntil(
            async () => {
                return (await helpFormContent.isClickable()) === false;
            },
            {
                timeout: 20000,
                timeoutMsg: 'EXPECTED FALSE',
            }
        );

        return false;
    }

    async acceptCookiesAndCheckIsExist() {
        const accceptCookiesBtn = await this._acceptCookiesBtn.getElement();
        await accceptCookiesBtn.waitUntil(
            async () => {
                return (await accceptCookiesBtn.isClickable()) === true;
            },
            {
                timeout: 20000,
                timeoutMsg: 'EXPECTED ACCEPT BTN EXIST',
            }
        );

        await accceptCookiesBtn.click();

        return accceptCookiesBtn.isClickable();
    }

    async getTimerTime() {
        return await this._timer.getText();
    }
}
