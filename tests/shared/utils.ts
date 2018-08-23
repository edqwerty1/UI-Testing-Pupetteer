export const checkElement = async function (url, selector, vpwidth, vpheight) {
    await page.goto(url);
    await page.setViewport({
        width: vpwidth,
        height: vpheight
    });

    const element = await page.$(selector);
    await page.waitFor(1000);
    const image = await element.screenshot();
    expect(image).toMatchImageSnapshot();
}



const timeout = 1000 * 60 * 4;

export const isLinkCorrect = async function (b2gUrl, testid, url) {
    it('Is the ' + testid + ' link correct?', async () => {
        await page.goto(b2gUrl);
        const link = await page.$eval("[data-testid='link_" + testid + "']", el => el.href);
        await expect(link).toMatch(b2gUrl + url);
    }, timeout);
}
export const doesLinkWork = async function (b2gUrl, testid, url) {
    it('Does the ' + testid + ' link work?', async () => {
        var response = await page.goto(b2gUrl + url);
        await expect(response.ok());
    }, timeout);
}
