const devices = require('puppeteer/DeviceDescriptors');

const googleUrl = 'https://www.bing.com/';
const iPhone = devices['iPhone 6'];

describe('When loading Bing homepage', () => {
    let pageLoadResponse;
    beforeAll(async () => {
        await page.emulate(iPhone);
        pageLoadResponse = await page.goto(googleUrl);
    }, 1000 * 60 * 4);
    
    it('should load the page ok', async() => {
        await expect(pageLoadResponse.ok());
    });

});


