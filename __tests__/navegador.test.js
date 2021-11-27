const puppeteer = require('puppeteer')

describe('Mi primer test de puppeteer', () => {
	it('Debe abrir y cerrar el navegador el navegador', async () => {
		const browser = await puppeteer.launch({
			headless: false,
		})
		const page = await browser.newPage()
		await page.goto('http://automationpractice.com/index.php')
		await page.waitForSelector('h1')
		await browser.close()
	}, 10000)
})
