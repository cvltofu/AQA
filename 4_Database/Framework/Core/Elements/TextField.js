import BaseElement from '../BaseElement.js';
import { logger } from './../../Utils/Logger.js';

export default class TextField extends BaseElement {
    constructor(selector, name) {
        super(selector, name);
    }

    async setText(text) {
        logger.info(`Set ${text} into ${this._name} text field.`);
        let elem = await this.getElement();
        await elem.setValue(text);
    }
}
