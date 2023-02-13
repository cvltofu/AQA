import DBHandler from './Framework/Utils/DBHandler.js';

export const config = {
    runner: 'local',
    specs: ['Test/Tests/*.js'],
    maxInstances: 10,
    maxInstancesPerCapability: 10,
    injectGlobals: true,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {},
        },
        {
            maxInstances: 5,
            browserName: 'firefox',
            specs: ['test/ffOnly/*'],
            'moz:firefoxOptions': {},

            excludeDriverLogs: ['bugreport', 'server'],
        },
    ],
    logLevel: 'error',
    logLevels: {
        webdriver: 'error',
        '@wdio/appium-service': 'error',
    },
    waitforTimeout: 20000,
    framework: 'mocha',
    specFileRetries: 1,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    mochaOpts: {
        ui: 'bdd',
        timeout: 30000,
    },
};
