import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';

export default class VkIdPage extends BaseForm {
    constructor() {
        super('//div[@class="vkc__PromoBox__promoBox"]', 'vk id page');

        this._enterBtn = new Button(
            '//button[@class="vkuiButton vkuiButton--sz-l vkuiButton--lvl-primary vkuiButton--clr-accent vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--stretched vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse"]',
            'enter button'
        );
        this._passField = new TextField(
            '//input[@class="vkc__TextField__input"]',
            'pass field'
        );
    }

    async clickOnEnter() {
        await this._enterBtn.waitForClickable();
        await this._enterBtn.clickOn();
    }

    async enterPass(pass) {
        await this._passField.setText(pass);
    }
}
