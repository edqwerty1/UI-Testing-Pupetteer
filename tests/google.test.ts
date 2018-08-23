import {checkElement, isLinkCorrect, doesLinkWork} from "./shared/utils"
const devices = require('puppeteer/DeviceDescriptors');

const googleUrl = 'https://www.google.co.uk/';
const iPhone = devices['iPhone 6'];

describe('When loading Google homepage', () => {
    let navigationPromise;
    let document;
    let pageLoadResponse;
    beforeAll(async () => {
        // await page.emulate({
        //     'userAgent': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
        //     'viewport': {
        //         'width': 1600,
        //         'height': 1200,
        //         'deviceScaleFactor': 1,
        //         'isMobile': false,
        //         'hasTouch': false,
        //         'isLandscape': false
        //     }
        // });
        await page.emulate(iPhone);
        pageLoadResponse = await page.goto(googleUrl);
    }, 1000 * 60 * 4);
    
    it('should load the page ok', async() => {
        await expect(pageLoadResponse.ok());
    });

    it('should display "Google" as page title', async () => {
        var pageTitle = await page.title();
        await expect(pageTitle).toMatch('Google');
    });

    it('should contain a search box', async () => {
        let searchBoxElement = await page.$('input[name="q"]');
        debugger;
        await expect(searchBoxElement).toBeTruthy();
    });

    // it('should contain a search button', async () => {
    //     let searchButtonElement = await page.$('input[name="btnK"]');
    //     await expect(searchButtonElement).toBeTruthy();
    // });

    describe('when searching for "bbc news"', async () => {

        beforeAll(async () => {
            let searchBoxElement = await page.$('input[name="q"]');
            await searchBoxElement.type('BBC News');
            navigationPromise = page.waitForNavigation();
            await searchBoxElement.press('Enter');
            await navigationPromise;
        });

        it('should contain BBC News link', async () => {
            let text = await page.evaluate(() => document.body.textContent);
            await expect(text).toMatch('bbc.co.uk/news');
        });
    });

    describe('When loading Google homepage', () => {
        it('main content look like previous version', async () => {
            // Using helper function
            await checkElement(googleUrl, 'body', 320, 480);
        });
    });
    
    describe('When loading Google homepage', async () => {
        beforeAll(async () => {
            var response = await page.goto(googleUrl);
            await expect(response.ok());
        });
    
        it('header should look like previous version', async () => {
            const element = await page.$('header');
            await page.waitFor(1000);
            const image = await element.screenshot();
            expect(image).toMatchImageSnapshot();
        });
    });
});


