const _ = require('lodash')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const link = 'https://dashboard.chia.foxypool.io'

const get_dashboard = () => {
    return puppeteer.launch({ headless: true })
        .then(async browser => {
            console.log('Running get dashboard data..')
            try {
                const page = await browser.newPage()
                await page.setViewport({ width: 1199, height: 900 })
                await page.goto(link)

                await page.waitForSelector('body > app-root > div > app-login > div > div > div:nth-child(2) > a')
                await page.click('body > app-root > div > app-login > div > div > div:nth-child(2) > a')

                // Auth Google
                await page.waitFor(2000)
                await page.click('#identifierId')
                await page.keyboard.type(google_email)
                await page.click('#identifierNext > div > button')
                await page.waitFor(2000)
                await page.keyboard.type(google_password)
                await page.click('#passwordNext > div > button')
                await page.waitForSelector('app-plotter:nth-child(2) > div > div.card-body.card-body-with-title.plotter-card > div > table')
                await page.waitForSelector('app-harvester:nth-child(4) > div > div.card-body.card-body-with-title > h6')

                // Plotting data only miner node
                const raw_plot_data = await page.evaluate(() => {
                    const tds = Array.from(document.querySelectorAll('app-plotter:nth-child(2) > div > div.card-body.card-body-with-title.plotter-card > div > table tr td'))
                    return tds.map(td => td.innerHTML)
                });

                // Hsrvester data only miner node
                const plot_count = await page.$eval('app-harvester:nth-child(4) > div > div.card-body.card-body-with-title > h6', el => el.innerText);
                const capacity = await page.$eval('app-harvester:nth-child(4) > div > div.card-body.card-body-with-title > div:nth-child(3) > div.card-font-size.font-weight-bold', el => el.innerText);
                const ttw = await page.$eval('app-harvester:nth-child(4) > div > div.card-body.card-body-with-title > div:nth-child(4) > div.card-font-size.font-weight-bold', el => el.innerText);

                const ploting_data = _.chunk(raw_plot_data, 3)

                // await page.screenshot({
                //     fullPage: true,
                //     path: 'new_image.png'
                // });
                // const screenshotPath = process.cwd() + '/new_image.png';
                // console.log('Location of the screenshot:', screenshotPath);

                await page.close();
                await browser.close();

                return {
                    ploting_data, plot_count, capacity, ttw
                }
            } catch (error) {
                console.log(error);
                await browser.close();
                return {
                    ploting_data: [], plot_count: 0, capacity: 0, ttw: 0
                }
            }
        })
}

const getHref = (page, selector) =>
    page.evaluate(
        selector => document.querySelector(selector).getAttribute('href'),
        selector
    );

module.exports = get_dashboard