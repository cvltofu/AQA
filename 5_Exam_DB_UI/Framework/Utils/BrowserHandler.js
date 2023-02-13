export default class BrowserHandler {
    constructor() {}

    async baseAuthWithUrl(login, pass, baseUrl) {
        browser.url(`http://${login}:${pass}@${baseUrl}`);
    }
}
