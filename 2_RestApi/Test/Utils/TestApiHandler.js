import ApiHandler from '../../Framework/Utils/ApiHandler.js';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';
export default class TestApiHandler extends ApiHandler {
    constructor() {
        super();
        this.endpoints = JsonHandler.getEndpoints();
        this.configData = JsonHandler.getConfigData();
    }

    async isPostDataCorrect(postData, correctData) {
        let isCorrect = [];

        for (const key in postData) {
            switch (key) {
                case 'userId':
                    postData[key] === correctData.userId
                        ? isCorrect.push(true)
                        : isCorrect.push(false);
                    break;

                case 'id':
                    postData[key] === correctData.id
                        ? isCorrect.push(true)
                        : isCorrect.push(false);
                    break;

                case 'title':
                    postData[key] != ''
                        ? isCorrect.push(true)
                        : isCorrect.push(false);
                    break;

                case 'body':
                    postData[key] != ''
                        ? isCorrect.push(true)
                        : isCorrect.push(false);
                    break;

                default:
                    break;
            }
        }

        return !isCorrect.includes(false);
    }

    async getAllPosts() {
        return await this.getRequest(
            `${this.configData.baseUrl}${this.endpoints.postsEndpoint}`
        );
    }

    async getAllUsers() {
        return await this.getRequest(
            `${this.configData.baseUrl}${this.endpoints.usersEndpoint}`
        );
    }

    async getPostById(idEndpoint) {
        return await this.getRequest(
            `${this.configData.baseUrl}${this.endpoints.postsEndpoint}${idEndpoint}`
        );
    }

    async getUserById(idEndpoint) {
        return await this.getRequest(
            `${this.configData.baseUrl}${this.endpoints.usersEndpoint}${idEndpoint}`
        );
    }

    async postData(data) {
        return await this.postRequest(
            `${this.configData.baseUrl}${this.endpoints.postsEndpoint}`,
            data
        );
    }

    async findUserById(usersData, specId) {
        return usersData.find((elem) => elem.id === specId);
    }
}
