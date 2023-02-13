import { expect } from 'chai';
import JsonHandler from '../Utils/JsonHandler.js';
import MainPage from '../PageObjects/MainPage.js';
import ProjectPage from '../PageObjects/ProjectPage.js';
import ApiUtil from '../Utils/ApiUtil.js';
import StringUtil from '../Utils/StringUtil.js';
import AddProjectPage from '../PageObjects/AddProjectPage.js';
import RandomData from '../../Framework/Utils/RandomData.js';
import ScreenshotsHandler from '../Utils/ScreenshotsHandler.js';
import FileHandler from '../Utils/FileHandler.js';
import BrowserHandler from '../../Framework/Utils/BrowserHandler.js';

describe('Exam test', async () => {
    const configData = JsonHandler.getConfigData();
    const testData = JsonHandler.getTestData();
    const browserHandler = new BrowserHandler();
    const api = new ApiUtil();
    const mainPage = new MainPage();
    const projectPage = new ProjectPage();
    const addProjectPage = new AddProjectPage();
    const fileHandler = new FileHandler();

    it(' UI + API TEST', async () => {
        const token = await api.getToken(testData.variant);
        expect(token, 'Token should exist').to.exist;

        await browserHandler.baseAuthWithUrl(
            testData.login,
            testData.pass,
            configData.baseUrlWithoutProtocol
        );

        await browser.setCookies({
            name: testData.cookieName,
            value: token,
            domain: configData.baseUrlWithoutProtocol,
        });
        await browser.refresh();

        await mainPage.waitForFormOpen();
        expect(await mainPage.isFormOpen(), 'Main page should be opened').to.be
            .true;
        expect(
            StringUtil.getSpecNumberFromString(await mainPage.getVariant(), 9),
            'Variants on page and in config data should be equal after page refresh'
        ).to.be.equal(testData.variant.toString());

        mainPage.setProjectnBtn(testData.projectName);
        const projectId = StringUtil.getSpecNumberFromString(
            await mainPage.getProjectId(),
            19
        );

        await mainPage.clickOnProject();

        await projectPage.waitForFormOpen();

        const tests = await api.getTestList(projectId);

        expect(
            await projectPage.checkIsSortedByTime(),
            'Tests on first page should be sorted by time'
        ).to.be.true;
        expect(
            await projectPage.checkIsMatch(tests),
            'Test on first page and from api shoul be equal'
        ).to.be.true;

        browser.back();
        await mainPage.waitForFormOpen();
        await mainPage.clickOnAdd();

        await browser.waitUntil(async function () {
            return (await browser.getWindowHandles()).length === 2;
        });

        const randomProjectName = RandomData.generateString(
            testData.lengthOfRandomString
        );
        await addProjectPage.insertProjectName(randomProjectName);
        await addProjectPage.clickSave();

        expect(
            await addProjectPage.checkForAlertAfterSave(),
            'Success alert should appear'
        ).to.be.true;

        browser.closeWindow();

        await browser.waitUntil(async function () {
            return (await browser.getWindowHandles()).length === 1;
        });
        await mainPage.waitForFormOpen();
        await browser.refresh();

        expect(
            await mainPage.checkIsAppeared(randomProjectName),
            'Added project should appear on main page'
        ).to.be.true;

        await mainPage.goToNewProject(randomProjectName);

        const SID = RandomData.generateString(testData.lengthOfRandomString);
        const testName = RandomData.generateString(
            testData.lengthOfRandomString
        );
        const methodName = RandomData.generateString(
            testData.lengthOfRandomString
        );
        const env = testData.env;

        const addedTestId = await api.addTestAndGetId(
            SID,
            randomProjectName,
            testName,
            methodName,
            env
        );

        const screenshotName = RandomData.generateString(
            testData.lengthOfRandomString
        );
        await ScreenshotsHandler.takeScreenshot(screenshotName);

        const image64 = await fileHandler.getBase64Image(
            testData.screenshotsPath,
            screenshotName,
            'png'
        );
        await api.addAttachments(addedTestId, image64, testData.imagePngBase);

        const loggsText = await fileHandler.getTextFromFile(
            testData.loggsPath,
            testData.txtBase
        );
        await api.addLoggs(addedTestId, loggsText);

        expect(
            await projectPage.ckeckIsTestAppeared(),
            'Created test name on page should be equal to generated test name'
        ).to.be.equal(testName);
    });
});
