import { logger } from './Logger.js';
import JsonHandler from './JsonHandler.js';

export default class ApiHandler {
    constructor() {
        this.statusCode;
        this.isJson = true;
    }

    async getStatusCode() {
        logger.info(`Get status code: ${this.statusCode}.`);
        return this.statusCode;
    }

    async getRequest(path) {
        const response = await fetch(path);

        this.statusCode = response.status;

        const json = await response.json();

        logger.info(
            `Get json data from ${path} with status code ${this.statusCode}.`
        );

        return json;
    }

    async postRequest(path, data) {
        logger.info(`Post json data: ${JSON.stringify(data)}.`);

        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify({
                ...data,
            }),
            headers: JsonHandler.getPostHeaders(),
        });

        this.statusCode = response.status;

        const json = await response.json();

        logger.info(
            `Get response data after post data: ${JSON.stringify(json)}.`
        );

        return json;
    }
}
