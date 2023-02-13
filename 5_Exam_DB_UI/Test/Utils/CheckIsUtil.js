import JsonHandler from './JsonHandler.js';
import TextField from '../../Framework/Core/Elements/TextField.js';

export default class CheckIs {
    constructor() {
        this._testData = JsonHandler.getTestData();
    }

    async checkIsSortedByTime() {
        const arrayOfTime = [];
        let isSorted = false;

        for (
            let index = this._testData.indexOfFirstTableElem;
            index < this._testData.numberOfTestsOnPage + 2;
            index++
        ) {
            let tableElemTime = new TextField(
                `//table[@class="table"]//tr[${index}]//td[${this._testData.indeOfTimeInLine}]`,
                `${index - 1} table element time`
            );

            arrayOfTime.push(Date.parse(await tableElemTime.getText()));

            if (index === 2) {
                continue;
            } else if (arrayOfTime[index - 3] - arrayOfTime[index - 2] > 0) {
                isSorted = true;
            } else {
                isSorted = false;
                break;
            }
        }

        return isSorted;
    }

    async checkIsMatch(tests) {
        let isIncludes = false;

        for (
            let index = this._testData.indexOfFirstTableElem;
            index < this._testData.numberOfTestsOnPage + 2;
            index++
        ) {
            let tableElemTime = new TextField(
                `//table[@class="table"]//tr[${index}]//td[${this._testData.indeOfTimeInLine}]`,
                `${index - 1} table element time`
            );

            let time = await tableElemTime.getText();
            if (await tests.some((elem) => elem.startTime === time)) {
                isIncludes = true;
            } else {
                isIncludes = false;
                break;
            }
        }

        return isIncludes;
    }
}
