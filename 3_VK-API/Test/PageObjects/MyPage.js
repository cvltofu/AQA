import BaseForm from '../../Framework/Core/BaseForm.js';
import Button from '../../Framework/Core/Elements/Button.js';
import TextField from '../../Framework/Core/Elements/TextField.js';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';
import VkApiUtil from '../Utils/VkApiUtils.js';

export default class MyPage extends BaseForm {
    constructor(postNum) {
        super('//div[@class="ProfileHeader__wrapper"]', 'my page');

        this._postPath = `//div[@id="page_wall_posts"]//child::div[contains(@class, "_post post")][${postNum}]`;
        this._commentToPostPath = `${this._postPath}//div[@class="replies_wrap"]`;
        this._userNameField = new TextField(
            '//h2[@id="owner_page_name"]',
            'user name'
        );
        this._postAuthorField = new TextField(
            `${this._postPath}//h5[@class="post_author"]`,
            'post author'
        );
        this._postTextField = new TextField(
            `${this._postPath}//div[@class="wall_text"]`,
            'post text field'
        );
        this._postCommentAuthorField = new TextField(
            `${this._commentToPostPath}//div[@class="reply_author"]`,
            'post author'
        );
        this._postCommentTextField = new TextField(
            `${this._commentToPostPath}//div[@class="reply_text"]`,
            'post author'
        );
        this._showNewCommentsButton = new Button(
            `${this._postPath}//span[@class="js-replies_next_label"]`,
            'show new comments button'
        );
        this._postLikeButton = new Button(
            `${this._postPath}//div[@class="PostBottomActionContainer PostButtonReactionsContainer"]`,
            'post like button'
        );
        this._postLikeButtonActive = new Button(
            `${this._postPath}//div[@class="PostBottomActionContainer PostButtonReactionsContainer"]//div[contains(@class, "PostButtonReactions--icon-active")]`,
            'active post like button'
        );
        this._penultimatePostText = new TextField(
            `//div[@id="page_wall_posts"]//child::div[contains(@class, "_post post")][${
                postNum + 1
            }]//div[@class="wall_text"]`,
            'penultimate post text field'
        );
    }

    async getPostData() {
        const userName = await this._userNameField.getText();
        const postAuthorName = await this._postAuthorField.getText();
        const postText = await this._postTextField.getText();

        return { userName, postAuthorName, postText };
    }

    async getPostCommentData() {
        const userName = await this._userNameField.getText();
        const commentAuthorName = await this._postCommentAuthorField.getText();
        const commentText = await this._postCommentTextField.getText();

        return { userName, commentAuthorName, commentText };
    }

    async showComments() {
        await this._showNewCommentsButton.waitForDisplayed();
        await this._showNewCommentsButton.clickOn();
    }

    async addLikeToPost() {
        await this._postLikeButton.clickOn();
    }

    async waitForLike() {
        await browser.waitUntil(async () => {
            return (await this._postLikeButtonActive.isElemExisting()) === true;
        });
    }

    async getPenultimatePostText() {
        const userName = await this._penultimatePostText.getText();
        return userName;
    }
}
