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
    ],
    logLevel: 'error',
    logLevels: {
        webdriver: 'error',
        '@wdio/appium-service': 'error',
    },
    baseUrl: 'localhost:8080/web',
    waitforTimeout: 10000,
    framework: 'mocha',
    specFileRetries: 1,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
};
