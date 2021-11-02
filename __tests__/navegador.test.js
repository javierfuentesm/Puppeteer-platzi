const puppeteer = require('puppeteer')

describe('Mi primer test de puppeteer', () => {
	it('Debe abrir y cerrar el navegador el navegador', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 0,
			devtools: true,
			// defaultViewport: {
			// 	width: 2100,
			// 	height: 1080,
			// },
			args: ['--window-size=1920,1080'],
			defaultViewport: null,
		})
		const page = await browser.newPage()
		await page.goto('http://automationpractice.com/index.php')
		await page.waitForSelector('h1')
		await browser.close()
	}, 30000)
})
