import { expect } from 'chai';
import TestApiHandler from '../Utils/TestApiHandler.js';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';
import RandomData from '../../Framework/Utils/RandomData.js';
import StatusCodesHandler from '../../Framework/Utils/StatusCodesHandler.js';
import SortUtil from '../Utils/SortUtil.js';

describe('REST API (GET/POST)', () => {
    before(() => {});

    it('GET POST TEST', async () => {
        const testData = JsonHandler.getTestData();
        const configData = JsonHandler.getConfigData();
        const endpoints = JsonHandler.getEndpoints();

        const api = new TestApiHandler();
        const statusCodes = new StatusCodesHandler();

        let data = await api.getAllPosts();
        expect(
            await api.getStatusCode(),
            'Status code is not 200.'
        ).to.be.equal(statusCodes.OK);
        expect(await JsonHandler.checkIsJson(data), 'Data is not JSON').to.be
            .true;
        expect(await SortUtil.checkIsSortedById(data), 'Data is not sorted').to
            .be.true;

        data = await api.getPostById(testData.post99endpoint);
        expect(await api.getStatusCode(), 'Status code is not 200').to.be.equal(
            statusCodes.OK
        );
        expect(
            await api.isPostDataCorrect(data, testData.post99Data),
            'Post data is not correct'
        ).to.be.true;

        data = await api.getPostById(testData.post150endpoint);
        expect(await api.getStatusCode(), 'Status code is not 404').to.be.equal(
            statusCodes.NotFound
        );
        expect(Object.keys(data).length, 'Data is not empty').to.be.equal(0);

        let someData = {
            title: RandomData.generateString(RandomData.getRandomNumber(5, 15)),
            body: RandomData.generateString(RandomData.getRandomNumber(5, 15)),
            userId: testData.specUserId,
        };
        data = await api.postData(someData);
        expect(await api.getStatusCode(), 'Status code is not 201').to.be.equal(
            statusCodes.Created
        );
        expect(data, 'Data is not correct')
            .to.include(someData)
            .and.to.have.property('id');

        data = await api.getAllUsers();
        expect(await api.getStatusCode(), 'Status code is not 200').to.be.equal(
            statusCodes.OK
        );
        expect(await JsonHandler.checkIsJson(data), 'Data is not JSON').to.be
            .true;
        expect(
            await api.findUserById(data, testData.specId),
            'Data is not correct'
        ).to.be.deep.equal(testData.user5Data);

        data = await api.getUserById(testData.user5endpoint);
        expect(await api.getStatusCode(), 'Status code is not 200').to.be.equal(
            statusCodes.OK
        );
        expect(data, 'Data is not correct').to.be.deep.equal(
            testData.user5Data
        );
    });
});
