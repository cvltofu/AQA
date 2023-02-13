import fs from 'fs';
import { logger } from './Logger.js';

export default new (class JsonHandler {
    constructor() {
        logger.info('Reading TestData.');
        this._testData = JSON.parse(
            fs.readFileSync('Framework/DataFiles/TestData.json', 'utf8')
        );
        logger.info('Reading TestData.');
        this._configData = JSON.parse(
            fs.readFileSync('Framework/DataFiles/ConfigData.json', 'utf8')
        );
    }

    getBaseUrl() {
        logger.info(`Get base URL ${this._configData[0].baseUrl}.`);
        return String(this._configData[0].baseUrl);
    }

    getPassLength() {
        logger.info('Get passsword length.');
        return String(this._testData[0].passLength);
    }

    getEmailLength() {
        logger.info('Get email length.');
        return String(this._testData[0].emailLength);
    }

    getZeroTimer() {
        logger.info('Get zero timer time.');
        return String(this._testData[0].zeroTimer);
    }

    getNumberOfCheckBosxe() {
        logger.info('Get number of check boxes time.');
        return String(this._testData[0].numberOfCheckBoxes);
    }
})();
