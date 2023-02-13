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
    baseUrl: 'https://vk.com',
    waitforTimeout: 20000,
    framework: 'mocha',
    specFileRetries: 1,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    mochaOpts: {
        ui: 'bdd',
        timeout: 30000,
    },
    before: function (capabilities, specs, browser) {},
    /**
     * Gets executed before the suite starts.
     * @param {Object} suite suite details
     */
    after: function (result, capabilities, specs) {},
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
};
