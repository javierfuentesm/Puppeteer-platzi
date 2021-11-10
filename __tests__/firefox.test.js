const puppeteer = require('puppeteer')

describe('Captura de pantalla con Puppeteer Firefox ', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			product: 'firefox',
			defaultViewport: null,
		})
		page = await browser.newPage()
		await page.goto('https://www.google.com/')
	})

	afterAll(async () => {
		await browser.close()
	})

	it('Extrayendo informacion del titulo y de la URL ', async () => {
		//extraer el titulo

		const titulo = await page.title()
		//extraer la url
		const url = await page.url()
		// Comentar que he detectado que la primera vez la ejecucion fallara pero despues pasa sin problema
		// Si despues no les deja ejecutar con chromium corran este comando node node_modules/puppeteer/install.js

		console.log(titulo)
		console.log(url)
	}, 15000)
})
