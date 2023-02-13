import BaseForm from '../../Framework/Core/BaseForm.js';
import TextField from '../../Framework/Core/Elements/TextField.js';
import CheckIs from '../Utils/CheckIsUtil.js';

export default class ProjectPage extends BaseForm {
    constructor() {
        super('//div[@id="pie"]', 'project page');

        this._checkIs = new CheckIs();
    }

    async checkIsSortedByTime() {
        return await this._checkIs.checkIsSortedByTime();
    }

    async checkIsMatch(tests) {
        return await this._checkIs.checkIsMatch(tests);
    }

    async ckeckIsTestAppeared() {
        let addedTestName = new TextField(
            '//table[@class="table"]//tr[2]//td[1]',
            'added test name field'
        );

        return await addedTestName.getText();
    }
}
