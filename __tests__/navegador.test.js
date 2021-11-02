const puppeteer = require('puppeteer')

describe('Mi primer test de puppeteer', () => {
	it('Debe abrir y cerrar el navegador el navegador', async () => {
		jest.setTimeout(10000)
		const browser = await puppeteer.launch({
			headless: false,
		})
		const page = await browser.newPage()
		await page.goto('http://automationpractice.com/index.php')
		await page.waitForSelector('h1')
		await browser.close()
	})
})
