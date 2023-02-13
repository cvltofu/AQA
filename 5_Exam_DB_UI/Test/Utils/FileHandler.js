import fs from 'fs/promises';

export default class FileHandler {
    constructor() {}

    async getBase64Image(screenshotsPath, screenshotName, format) {
        return await fs.readFile(
            `${screenshotsPath}${screenshotName}.${format}`,
            'base64'
        );
    }

    async getTextFromFile(filePath, base) {
        let a = await fs.readFile(filePath, base);
        return a;
    }
}
