import { expect } from 'chai';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';
import RandomData from '../../Framework/Utils/RandomData.js';
import DBHandler from '../../Framework/Utils/DBHandler.js';
import StringHandler from '../../Framework/Utils/StringHandler.js';
import DBUtil from '../Utils/DBUtil.js';

describe('DB TEST', () => {
    const DB = new DBHandler();

    before(async function () {
        await DB.makeConnection();
    });

    after(async function () {
        await DB.closeConnection();
    });

    it('GET POST TEST', async () => {
        const dbUtil = new DBUtil(DB);
        const dbCommands = JsonHandler.getDBCommands();
        const configData = JsonHandler.getConfigData();

        const repeatingDigits = [
            '11',
            '22',
            '33',
            '44',
            '55',
            '66',
            '77',
            '88',
            '99',
        ];
        const mainData = await dbUtil.getAllFrom(dbCommands.selectAllFromTest);

        const lengthBefore = mainData.length;
        const selectedArray = [];
        for (const object of mainData) {
            let id = object.id;
            id = id.toString();

            if (repeatingDigits.some((elem) => id.includes(elem)))
                selectedArray.push(object);
        }

        for (let index = 0; index < configData.numberOfTests; index++) {
            const object = RandomData.getRandomArrayElem(selectedArray);
            const browsers = ['chrome', 'firefox', 'explorer'];
            const date = StringHandler.getNowSqlDate();

            const objectToSend = {
                name: object.name,
                status_id: RandomData.getRandomNumber(1, 3),
                method_name: object.method_name,
                project_id: object.project_id,
                session_id: RandomData.getRandomNumber(1, 10),
                end_time: date,
                env: RandomData.generateString(5),
                browser: RandomData.getRandomArrayElem(browsers),
            };

            const dataToSend = [
                [
                    `${objectToSend.name}`,
                    `${objectToSend.status_id}`,
                    `${objectToSend.method_name}`,
                    `${objectToSend.project_id}`,
                    `${objectToSend.session_id}`,
                    `${objectToSend.end_time}`,
                    `${objectToSend.env}`,
                    `${objectToSend.browser}`,
                ],
            ];

            await dbUtil.sendSomeData(dbCommands.insertIntoTest, dataToSend);
        }

        let data = await dbUtil.getAllFrom(dbCommands.selectAllFromTest);
        let lengthAfter = data.length;

        expect(lengthBefore, 'Data is not refreshed').to.be.lessThan(
            lengthAfter
        );

        await dbUtil.deleteWithCond(
            dbCommands.deleteWithCondIfMuchThan,
            `${lengthBefore}`
        );

        data = await dbUtil.getAllFrom(dbCommands.selectAllFromTest);
        lengthAfter = data.length;

        expect(lengthBefore, 'Data is not deleted').to.be.equal(lengthAfter);

        await DB.closeConnection();
    });
});
