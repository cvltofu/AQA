import BaseForm from '../../Framework/Core/BaseForm.js';
import TextField from '../../Framework/Core/Elements/TextField.js';
import Button from '../../Framework/Core/Elements/Button.js';

export default class MainPage extends BaseForm {
    constructor(projectName) {
        super('//div[@class="list-group"]', 'main page');

        this._variantField = new TextField(
            '//p[@class="text-muted text-center footer-text"]//span',
            'variant in footer'
        );
        this._addBtn = new Button(
            '//a[contains(@class, "btn btn-xs btn-primary pull-right")]',
            'add test button'
        );
    }

    async setProjectnBtn(projectName) {
        this._projectBtn = new Button(
            `//a[text()="${projectName}"]`,
            'spec project button'
        );
    }

    async getVariant() {
        return await this._variantField.getText();
    }

    async getProjectId() {
        return this._projectBtn.getAttribute('href');
    }

    async clickOnProject() {
        await this._projectBtn.clickOn();
    }

    async clickOnAdd() {
        await this._addBtn.clickOn();
    }

    async checkIsAppeared(name) {
        const addedProject = new TextField(
            `//a[text()="${name}"]`,
            'added project button'
        );

        return await addedProject.isElemDisplayed();
    }

    async goToNewProject(name) {
        const addedProject = new TextField(
            `//a[text()="${name}"]`,
            'added project button'
        );

        await addedProject.clickOn();
    }
}
