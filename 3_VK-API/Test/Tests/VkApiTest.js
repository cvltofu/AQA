import { expect } from 'chai';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';
import RandomData from '../../Framework/Utils/RandomData.js';
import HomePage from '../PageObjects/HomePage.js';
import VkIdPage from '../PageObjects/VkIdPage.js';
import FeedPage from '../PageObjects/FeedPage.js';
import MyPage from '../PageObjects/MyPage.js';
import VkApiUtils from '../Utils/VkApiUtils.js';

describe('SMART VK API', () => {
    before(() => {
        browser.url(JsonHandler.getConfigData().baseUrl);
    });

    it('VK API TEST', async () => {
        const testData = JsonHandler.getTestData();
        const endpoints = JsonHandler.getEndpoints();
        const homePage = new HomePage();
        const vkIdPage = new VkIdPage();
        const feedPage = new FeedPage();
        const vkApi = new VkApiUtils();
        const myPage = new MyPage(testData.postNum);

        await homePage.enterLogin(testData.userLogin);
        await homePage.clickOnEnter();

        await vkIdPage.waitForFormOpen();
        await vkIdPage.enterPass(testData.userPass);
        await vkIdPage.clickOnEnter();

        await feedPage.waitForFormOpen();
        await feedPage.clickOnMyPage();

        await myPage.waitForFormOpen();
        const postText = RandomData.generateString(10);
        const createdPostId = await vkApi.makePostAndGetPostId(
            endpoints.postDataOnWall,
            postText
        );

        const createdPostData = await myPage.getPostData();
        expect(
            createdPostData.postText,
            'Post text should be equal to random string'
        ).to.be.equal(postText);
        expect(
            createdPostData.userName,
            'Post username should be equal to author username'
        ).to.be.equal(createdPostData.postAuthorName);

        const editedPostText = RandomData.generateString(10);

        const wallUploadUrl = await vkApi.getWallUploadServerUrl(
            endpoints.getWallUploadServer
        );
        const imageData = await vkApi.uploadImageToUrlAndGetImageData(
            wallUploadUrl
        );
        const photoData = await vkApi.saveWallPhotoAndGetId(
            endpoints.saveWallPhoto,
            imageData.server,
            imageData.photo,
            imageData.hash
        );
        await vkApi.editPostAndAddPhoto(
            endpoints.editPost,
            createdPostId,
            editedPostText,
            photoData[0].id
        );

        const commentText = RandomData.generateString(10);
        await vkApi.addCommentToPost(
            endpoints.createComment,
            createdPostId,
            commentText
        );
        await myPage.showComments(createdPostId, commentText);
        const createdCommentData = await myPage.getPostCommentData();
        expect(
            createdCommentData.commentText,
            'Post text should be equal to random string'
        ).to.be.equal(commentText);
        expect(
            createdCommentData.userName,
            'Post username should be equal to author username'
        ).to.be.equal(createdCommentData.commentAuthorName);

        await myPage.addLikeToPost();
        await myPage.waitForLike();
        const userThatLikedId = await vkApi.getLikes(
            endpoints.getLikes,
            createdPostId
        );
        expect(
            userThatLikedId.response.users[0].uid,
            'Liked user id should be equal user id'
        ).to.be.equal(testData.userId);

        await vkApi.deletePost(endpoints.delete, createdPostId);

        expect(
            await myPage.getPenultimatePostText(),
            'Post text should not be equal created post text'
        ).to.not.equal(editedPostText);
    });
});
