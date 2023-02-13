import ApiHandler from '../../Framework/Utils/ApiHandler.js';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default class VkApiUtil extends ApiHandler {
    constructor() {
        super();

        this._configData = JsonHandler.getConfigData();
        this._testData = JsonHandler.getTestData();
        this.__dirname = path.resolve();
    }

    getTokenAndVersion() {
        return `access_token=${this._testData.token}&v=${this._testData.apiVersion}`;
    }

    async makePostAndGetPostId(endpoint, message) {
        const data = await this.postRequest(
            `${
                this._configData.apiUrl
            }${endpoint}?message=${message}&${this.getTokenAndVersion()}`
        );

        return data.response.post_id;
    }

    async addCommentToPost(endpoint, postId, messsage) {
        await this.postRequest(
            `${
                this._configData.apiUrl
            }${endpoint}?post_id=${postId}&message=${messsage}&${this.getTokenAndVersion()}`
        );
    }

    async getLikes(endpoint, postId) {
        return await this.postRequest(
            `${
                this._configData.apiUrl
            }${endpoint}?post_id=${postId}&${this.getTokenAndVersion()}`
        );
    }

    async getWallUploadServerUrl(endpoint) {
        const data = await this.postRequest(
            `${this._configData.apiUrl}${endpoint}?${
                this._testData.userId
            }&${this.getTokenAndVersion()}`
        );

        return data.response.upload_url;
    }

    async uploadImageToUrlAndGetImageData(url) {
        const imagePath = path.resolve(
            this.__dirname,
            this._testData.uploadImagePath
        );

        const formData = new FormData();
        formData.append('photo', fs.createReadStream(imagePath));

        return await this.postImageRequest(url, formData);
    }

    async saveWallPhotoAndGetId(endpoint, server, photo, hash) {
        const data = await this.postRequest(
            `${this._configData.apiUrl}${endpoint}?${
                this._testData.userId
            }&server=${server}&photo=${photo}&hash=${hash}&${this.getTokenAndVersion()}`
        );

        return data.response;
    }

    async editPostAndAddPhoto(endpoint, postId, messsage, photoId) {
        await this.postRequest(
            `${
                this._configData.apiUrl
            }${endpoint}?post_id=${postId}&message=${messsage}&attachments=photo${
                this._testData.userId
            }_${photoId}&${this.getTokenAndVersion()}`
        );
    }

    async addPhotoToPost(endpoint, postId, photoId) {
        await this.postRequest(
            `${
                this._configData.apiUrl
            }${endpoint}?post_id=${postId}&attachments=photo${
                this._testData.userId
            }_${photoId}&${this.getTokenAndVersion()}`
        );
    }

    async postImageRequest(path, image) {
        this.instance = axios.create({
            baseURL: 'https://api.vk.com/method/',
        });

        const response = await this.instance
            .post(path, image, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${image._boundary}`,
                },
            })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(`${error}`);
            });

        this.statusCode = response.status;
        const data = await response.data;
        return data;
    }

    async deletePost(endpoint, postId) {
        await this.postRequest(
            `${
                this._configData.apiUrl
            }${endpoint}?post_id=${postId}&${this.getTokenAndVersion()}`
        );
    }
}
