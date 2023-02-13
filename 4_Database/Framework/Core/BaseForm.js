import BaseElement from './BaseElement.js';
import { logger } from '../Utils/Logger.js';

export default class BaseForm {
    constructor(locator, name) {
        this._uniqueLocator = locator;
        this._name = name;
    }

    async waitForFormOpen() {
        logger.info(`Waiting for form ${this._name} to open.`);
        await $(this._uniqueLocator).waitForDisplayed();
    }

    async isFormOpen() {
        try {
            const uniqueElem = new BaseElement(this._uniqueLocator);
            logger.info(`Check form ${this._name} to open.`);
            return await uniqueElem.isElemDisplayed();
        } catch (error) {
            return false;
        }
    }
}
