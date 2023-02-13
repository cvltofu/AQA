import JsonHandler from '../../Framework/Utils/JsonHandler.js';

export default class DBUtil {
    constructor(DB) {
        this.DB = DB;
    }

    async sendSomeCommand() {
        await this.DB.sendSqlCommand;
    }

    async getAllFrom(command) {
        return await this.DB.sendSqlCommand(command);
    }

    async insertNewId(command) {
        await this.DB.sendSqlCommand(command);
    }

    async sendSomeData(command, data) {
        await this.DB.sendSqlCommand(command, [data]);
    }

    async deleteWithCond(command, condition) {
        await this.DB.sendSqlCommand(command, [condition]);
    }
}
