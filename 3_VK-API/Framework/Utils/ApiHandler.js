import axios from 'axios';
import { logger } from './Logger.js';
import JsonHandler from './JsonHandler.js';

export default class ApiHandler {
    constructor() {
        this.statusCode;
        this.isJson = true;
        this._configData = JsonHandler.getConfigData();
    }

    async getStatusCode() {
        logger.info(`Get status code: ${this.statusCode}.`);
        return this.statusCode;
    }

    async request(path, method, data) {
        this.instance = axios.create({
            baseURL: 'https://api.vk.com/method/',
        });

        const response = await this.instance({
            method: method,
            url: path,
            data: data,
            headers: this._configData.postHeaders,
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                logger.info(`Error: ${error}.`);
            });

        this.statusCode = response.status;
        const responseData = await response.data;
        return responseData;
    }

    async getRequest(path) {
        logger.info(
            `Get json data from ${path} with status code ${this.statusCode}.`
        );
        return await this.request(path, 'GET');
    }

    async postRequest(path, data) {
        logger.info(`Post json data: ${JSON.stringify(data)}.`);
        const json = await this.request(path, 'POST', data);
        logger.info(
            `Get response data after post data: ${JSON.stringify(json)}.`
        );
        return json;
    }
}
