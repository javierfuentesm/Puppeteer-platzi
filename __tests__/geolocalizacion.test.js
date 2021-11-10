const puppeteer = require('puppeteer')

describe('Cambiando la geolocalizacionf', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		page = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	it('Debera sobreescribir geolocalizacion ', async () => {
		const context = browser.defaultBrowserContext()
		await context.overridePermissions('https://chercher.tech/practice/geo-location', [
			'geolocation',
		])
		//set the location
		await page.setGeolocation({ latitude: 90, longitude: 20 })
		//open url
		await page.goto('https://chercher.tech/practice/geo-location')
		await page.waitForTimeout(5000)
		await page.setGeolocation({ latitude: 90, longitude: 0 })
		await page.goto('https://chercher.tech/practice/geo-location')
		await page.waitForTimeout(5000)
	}, 15000)
})
