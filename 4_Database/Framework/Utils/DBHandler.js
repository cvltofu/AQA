import mysql from 'mysql2/promise';
import { logger } from './Logger.js';
import JsonHandler from './JsonHandler.js';

export default class DBHandler {
    constructor() {
        this.DBConfig = JsonHandler.getDBConfigData();
    }

    async makeConnection() {
        this.connection === undefined
            ? (this.connection = await mysql.createConnection({
                  ...this.DBConfig.DBSettings,
              }))
            : (this.connection = this.connection);

        await this.connection.connect((err) => {
            if (err) {
                logger.info(`Ошибка: ${err.message}`);
            } else {
                logger.info('Подключение к серверу MySQL успешно установлено.');
            }
        });
    }

    async sendSqlCommand(command, data) {
        logger.info(`Отправление запроса: ${command}`);
        await this.connection
            .query(command, data)
            .then((result) => {
                this.results = result[0];
            })
            .catch((err) => {
                console.log(err);
            });

        return this.results;
    }

    async closeConnection() {
        await this.connection.end(function (err) {
            if (err) {
                logger.info(`Ошибка: ${err.message}`);
            }
            logger.info('Подключение закрыто.');
        });
    }
}
