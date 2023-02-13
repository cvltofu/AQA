import JsonHandler from './JsonHandler.js';

export default new (class ScreenshotsHandler {
    constructor() {
        this._testData = JsonHandler.getTestData();
    }

    async takeScreenshot(name) {
        return await browser.saveScreenshot(
            `${this._testData.screenshotsPath}${name}.png`
        );
    }
})();
