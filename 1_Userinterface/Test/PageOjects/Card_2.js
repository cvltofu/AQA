import BaseElement from '../../Framework/Core/BaseElement.js';
import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';
import RandomData from '../../Framework/Utils/RandomData.js';
import * as url from 'url';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';

export default class SecondCard extends BaseForm {
    constructor() {
        super('//div[@class="avatar-and-interests__avatar-box"]');

        this._uploadBtn = new Button(
            '//a[class="avatar-and-interests__upload-button"]',
            'upload button'
        );
        this._interestCheckboxes = new TextField(
            '//div[@class="avatar-and-interests__interests-list"]',
            'interest checkboxes'
        );
    }

    async uploadImage() {
        const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

        const filePath = __dirname + '../Images/picture.png';
        const remoteFilePath = await browser.uploadFile(filePath);

        await $('//a[class="avatar-and-interests__upload-button"]').setValue(
            remoteFilePath
        );
    }

    async clickOn(elem) {
        await elem.clickOn();
    }

    async unselectAllElem(array) {
        await this.checkSelectedElements(array, 20);
    }

    async checkSelectedElements(array, numberOfElement) {
        const check = new BaseElement(
            `//span[text()="${array[numberOfElement]}"]//preceding-sibling::span`,
            'ckeck box'
        );
        await this.clickOn(check);
    }

    async removeSelectAndUnselect(arrayOfInterests) {
        const indexOfUnselect = arrayOfInterests.indexOf('Unselect all');
        const indexOfSelect = arrayOfInterests.indexOf('Select all');

        arrayOfInterests.splice(indexOfUnselect, 1);
        arrayOfInterests.splice(indexOfSelect, 1);

        return arrayOfInterests;
    }

    async removeSelectedElement(arrayOfInterests, element) {
        const indexOfSelectedInterest = arrayOfInterests.indexOf(element);
        arrayOfInterests.splice(indexOfSelectedInterest, 1);

        return arrayOfInterests;
    }

    async selectInterests() {
        const arrayOfInterests = await this._interestCheckboxes.getElements();
        const textArrayOfInterests = await arrayOfInterests[0].getText();
        let arrayOfCheckedInterests = textArrayOfInterests.split('\n');
        let arrayOfRandomInterests = [];

        await this.unselectAllElem(arrayOfCheckedInterests);

        arrayOfCheckedInterests = await this.removeSelectAndUnselect(
            arrayOfCheckedInterests
        );

        for (
            let index = 0;
            index < JsonHandler.getNumberOfCheckBosxe();
            index++
        ) {
            let elem = await RandomData.getRandomArrayElem(
                arrayOfCheckedInterests
            );

            arrayOfRandomInterests.push(elem);
            arrayOfCheckedInterests = await this.removeSelectedElement(
                arrayOfCheckedInterests,
                elem
            );
            await this.checkSelectedElements(arrayOfRandomInterests, index);
        }
    }
}
