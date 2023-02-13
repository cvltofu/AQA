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
        logger.info('Reading DBConfig.');
        this._DBConfig = JSON.parse(
            fs.readFileSync('Framework/DataFiles/DBConfig.json', 'utf8')
        );
        logger.info('Reading DBCommands.');
        this._DBCommands = JSON.parse(
            fs.readFileSync('Framework/DataFiles/DBCommands.json', 'utf8')
        );
    }

    getTestData() {
        return this._testData[0];
    }

    getConfigData() {
        return this._configData[0];
    }

    getDBConfigData() {
        return this._DBConfig[0];
    }

    getDBCommands() {
        return this._DBCommands[0];
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

    getPostHeaders() {
        logger.info(`Get post headers.`);
        return this._configData[0].postHeaders;
    }

    getBaseUrl() {
        logger.info(`Get base URL.`);
        return this._configData[0].baseUrl;
    }
})();
