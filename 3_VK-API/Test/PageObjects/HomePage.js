import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';

export default class HomePage extends BaseForm {
    constructor() {
        super('//div[@id="index_login"]', 'home page');

        this._enterBtn = new Button(
            '//button[@class="FlatButton FlatButton--primary FlatButton--size-l FlatButton--wide VkIdForm__button VkIdForm__signInButton"]//child::span',
            'enter button'
        );
        this._emailField = new TextField(
            '//input[@id="index_email"]',
            'email field'
        );
    }

    async clickOnEnter() {
        await this._enterBtn.clickOn();
    }

    async enterLogin(login) {
        await this._emailField.setText(login);
    }
}
