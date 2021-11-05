const puppeteer = require('puppeteer')

describe('Captura de pantalla ', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		page = await browser.newPage()
		await page.goto('https://www.google.com/')
	})

	afterAll(async () => {
		await browser.close()
	})

	it('Captura de pantalla completa', async () => {
		await page.screenshot({
			path: './capturaDePantalla.png',
			fullPage: true,
		})
	}, 50000)
	it('Captura de pantalla seleccionar area', async () => {
		await page.screenshot({
			path: './capturaDePantallaRecortada.png',
			clip: {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			},
		})
	}, 50000)

	it('Captura de pantalla omitir el fondo', async () => {
		await page.evaluate(() => (document.body.style.background = 'transparent'))

		await page.screenshot({
			path: './capturaDePantallaOmiteElFondo.png',
			omitBackground: true,
		})
	}, 50000)
})
