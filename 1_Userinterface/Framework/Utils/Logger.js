import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: { type: 'stdout', layout: { type: 'colored' } },
        dateFile: {
            type: 'dateFile',
            filename: 'loggs.log',
            layout: { type: 'basic' },
            compress: true,
            daysToKeep: 14,
            keepFileExt: true,
        },
    },
    categories: {
        default: {
            appenders: ['console', 'dateFile'],
            level: 'info',
        },
    },
});

export const logger = log4js.getLogger();
