import ApiHandler from '../../Framework/Utils/ApiHandler.js';
import JsonHandler from '../Utils/JsonHandler.js';

export default class ApiUtil extends ApiHandler {
    constructor() {
        super();

        this._endpoints = JsonHandler.getEndpoints();
        this._configData = JsonHandler.getConfigData();
    }

    async getToken(variant) {
        const token = await this.postRequest(
            `${this._configData.apiUrl}${this._endpoints.getToken}?variant=${variant}`
        );

        return token;
    }

    async getTestList(projectId) {
        const list = await this.postRequest(
            `${this._configData.apiUrl}${this._endpoints.getTestsInJson}?projectId=${projectId}`
        );

        return list;
    }

    async addTestAndGetId(SID, projectName, testName, methodName, env) {
        const testId = await this.postRequest(
            `${this._configData.apiUrl}${this._endpoints.addTest}?SID=${SID}&projectName=${projectName}&testName=${testName}&methodName=${methodName}&env=${env}`
        );

        return testId;
    }

    async addLoggs(testId, content) {
        const data = {
            content: content,
        };

        await this.postRequest(
            `${this._configData.apiUrl}${this._endpoints.addLoggs}?testId=${testId}`,
            data,
            this._configData.attachmentHeaders
        );
    }

    async addAttachments(testId, content, contentType) {
        const data = {
            content: content,
        };

        await this.postRequest(
            `${this._configData.apiUrl}${this._endpoints.addAttachments}?testId=${testId}&contentType=${contentType}`,
            data,
            this._configData.attachmentHeaders
        );
    }
}
