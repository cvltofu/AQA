import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';

export default class FeedPage extends BaseForm {
    constructor() {
        super('//div[@id="narrow_column"]', 'feed page');

        this._myPageBtn = new Button('//li[@id="l_pr"]', 'my page button');
    }

    async clickOnMyPage() {
        await this._myPageBtn.clickOn();
    }
}
