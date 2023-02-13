import axios from 'axios';
import { logger } from './Logger.js';
import JsonHandler from '../../Test/Utils/JsonHandler.js';

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

    async request(path, method, data, headers, params) {
        this.instance = axios.create({
            baseURL: this._configData.apiUrl,
        });

        const response = await this.instance({
            method: method,
            url: path,
            data: data,
            headers: headers,
            params: params,
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                logger.error(`${error}.`);
            });

        this.statusCode = response.status;
        const responseData = await response.data;
        return responseData;
    }

    async postRequest(path, data, incomeHeanders) {
        let headers = undefined;
        incomeHeanders
            ? (headers = incomeHeanders)
            : (headers = this._configData.postHeaders);

        logger.info(`Post json data.`);
        const json = await this.request(path, 'POST', data, headers);
        logger.info(`Get response data after post data.`);
        return json;
    }
}
