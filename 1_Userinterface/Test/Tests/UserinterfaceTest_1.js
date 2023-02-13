import { expect } from 'chai';
import HomePage from '../PageOjects/HomePage.js';
import FirstCard from '../PageOjects/Card_1.js';
import SecondCard from '../PageOjects/Card_2.js';
import JsonHandler from '../../Framework/Utils/JsonHandler.js';

describe('Userinterface', () => {
    before(() => {
        browser.url(JsonHandler.getBaseUrl());
    });

    it('Spec 3-pages test', async () => {
        const homePage = new HomePage();
        const firstCard = new FirstCard();
        const secondCard = new SecondCard();

        expect(await homePage.isFormOpen(), 'Home page is opened').to.be.true;

        await homePage.clickOnLink();

        await firstCard.waitForFormOpen();
        expect(await firstCard.isFormOpen(), 'First card is opened').to.be.true;

        await firstCard.enterRandomPass();
        await firstCard.enterRandomEmail();
        await firstCard.enterAndSelectDomain();
        await firstCard.acceptTermsAndClickNext();

        await secondCard.waitForFormOpen();
        expect(await secondCard.isFormOpen(), 'Second card is opened').to.be
            .true;
        await secondCard.selectInterests();
        await secondCard.uploadImage();
    });
});
