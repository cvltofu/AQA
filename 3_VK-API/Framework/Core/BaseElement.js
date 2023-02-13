import { logger } from '../Utils/Logger.js';

export default class BaseElement {
    constructor(selector, name) {
        this._uniqueSelector = selector;
        this._name = name;
    }

    async waitForDisplayed() {
        logger.info(`Waiting for ${this._name} to be displayed.`);
        await $(this._uniqueSelector).waitForDisplayed();
    }

    async waitForClickable() {
        logger.info(`Waiting for ${this._name} to be clicable.`);
        await $(this._uniqueSelector).waitForClickable();
    }

    async isElemDisplayed() {
        logger.info(`Check elem ${this._name} to be displayed.`);
        return await $(this._uniqueSelector).isDisplayed();
    }

    async isElemExisting() {
        logger.info(`Check elem ${this._name} to be exist.`);
        return await $(this._uniqueSelector).isExisting();
    }

    async getElement() {
        logger.info(`Getting ${this._name} element.`);
        return await $(this._uniqueSelector);
    }

    async getElements() {
        logger.info(`Getting ${this._name} elements.`);
        return await $$(this._uniqueSelector);
    }

    async clickOn() {
        logger.info(`Click on ${this._name} element.`);
        await $(this._uniqueSelector).click();
    }

    async sendKeys(keys) {
        logger.info(`Send keys ${keys} into ${this._name} element.`);
        await browser.keys(keys);
    }

    async getValue() {
        const value = await $(this._uniqueSelector).getValue();
        logger.info(`Getting ${this._name} value ${value}.`);
        return value;
    }

    async getText() {
        const text = await $(this._uniqueSelector).getText();
        logger.info(`Getting ${this._name} text ${text}.`);
        return text;
    }
}
