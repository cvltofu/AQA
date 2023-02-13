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
        logger.info('Reading Endpoints.');
        this._endpoints = JSON.parse(
            fs.readFileSync('Framework/DataFiles/Endpoints.json', 'utf8')
        );
    }

    getTestData() {
        return this._testData[0];
    }

    getConfigData() {
        return this._configData[0];
    }

    getEndpoints() {
        return this._endpoints[0];
    }

    async checkIsJson(data) {
        try {
            JSON.stringify(data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getBaseUrl() {
        logger.info(`Get base URL.`);
        return this._configData[0].baseUrl;
    }
})();
