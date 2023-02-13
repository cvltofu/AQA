import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';

export default class HomePage extends BaseForm {
    constructor() {
        super('//button[@class="start__button"]');

        this._hiddenBtn = new Button(
            '//a[@class="start__link"]',
            'hidden link button'
        );
    }

    async clickOnLink() {
        this._hiddenBtn.clickOn();
    }
}
