import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';

export default class AddProjectPage extends BaseForm {
    constructor() {
        super('//input[@class="form-control"]', 'add project page');

        this._submitBtn = new Button(
            '//button[@class="btn btn-primary"]',
            'submit button'
        );
        this._inputField = new TextField(
            '//input[@class="form-control"]',
            'input field'
        );
        this._successAlert = new TextField(
            '//div[@class="alert alert-success"]',
            'success alert'
        );
    }

    async insertProjectName(text) {
        await this._inputField.setText(text);
    }

    async clickSave() {
        await this._submitBtn.clickOn();
    }

    async checkForAlertAfterSave() {
        return await this._successAlert.isElemDisplayed();
    }
}
