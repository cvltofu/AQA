import { deepmerge } from 'deepmerge-ts';
import { mainConfig } from './wdio.shared.conf.js';
import JsonHandler from './Framework/Utils/JsonHandler.js';

const testData = JsonHandler.getTestData();

export const config = deepmerge(mainConfig, {
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [testData.browserLanguageOpts],
            },
        },
    ],
});
