export default class StringHandler {
    constructor() {}

    static getNowSqlDate() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}
