import { logger } from './Logger.js';

export default class RandomData {
    constructor() {}

    static getRandomNumber(min, max) {
        const randNum = Math.floor(Math.random() * (max - min) + min);
        logger.info(`Getting random number ${randNum}.`);
        return randNum;
    }

    static generateString(length) {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }

        return result;
    }

    static getRandomEmail(emailLength) {
        const randEmail = this.generateString(emailLength);
        logger.info(`Getting random email ${randEmail}.`);
        return randEmail;
    }

    static getRandomPassword(passLength) {
        const randPass = this.generateString(passLength);
        logger.info(`Getting random email ${randPass}.`);
        return randPass;
    }

    static getRandomArrayElem(array) {
        const randArrayElem = array[Math.floor(Math.random() * array.length)];
        logger.info(`Getting random email ${randArrayElem}.`);
        return randArrayElem;
    }
}
