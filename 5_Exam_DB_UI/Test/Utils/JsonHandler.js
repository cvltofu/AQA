import fs from 'fs';
import { logger } from '../../Framework/Utils/Logger.js';

export default new (class JsonHandler {
    constructor() {
        this._testData = JSON.parse(
            fs.readFileSync('Framework/DataFiles/TestData.json', 'utf8')
        );
        this._configData = JSON.parse(
            fs.readFileSync('Framework/DataFiles/ConfigData.json', 'utf8')
        );
        this._endpoints = JSON.parse(
            fs.readFileSync('Framework/DataFiles/Endpoints.json', 'utf8')
        );
    }

    getTestData() {
        logger.info(`Get TestData.`);
        return this._testData[0];
    }

    getConfigData() {
        logger.info(`Get ConfigData.`);
        return this._configData[0];
    }

    getEndpoints() {
        logger.info(`Get Endpoints.`);
        return this._endpoints[0];
    }

    getPostHeaders() {
        logger.info(`Get post headers.`);
        return this._configData[0].postHeaders;
    }

    getBaseUrl() {
        logger.info(`Get base URL.`);
        return this._configData[0].baseUrl;
    }

    async checkIsJson(data) {
        try {
            JSON.stringify(data);
            return true;
        } catch (error) {
            logger.info(`Error: ${error}.`);
            return false;
        }
    }
})();
