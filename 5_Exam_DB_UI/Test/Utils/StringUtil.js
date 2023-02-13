export default class StringUtil {
    constructor() {}

    static getSpecNumberFromString(string, posFrom) {
        const numberString = string.substr(posFrom, 2);
        return numberString.trim();
    }
}
