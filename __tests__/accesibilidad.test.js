const puppeteer = require('puppeteer')
const { AxePuppeteer } = require('@axe-core/puppeteer')

describe('Probando sobre la accesibilidad', () => {
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

	it('Debera probar la accesibilidad', async () => {
		await page.goto('https://platzi.com')
		await page.waitForSelector('img')
		const snapshot = await page.accessibility.snapshot()
		console.log(snapshot)
	}, 15000)

	it('Debera probar la accesibilidad con Axe', async () => {
		// Axe es un motor de prueba de accesibilidad para sitios web y otras interfaces de usuario basadas en HTML.
		// Es rápido, seguro, liviano y se creó para integrarse sin problemas con cualquier entorno de prueba existente
		//para que pueda automatizar las pruebas de accesibilidad junto con sus pruebas funcionales regulares.
		await page.setBypassCSP(true)
		await page.goto('https://platzi.com')
		await page.waitForSelector('img')

		const results = await new AxePuppeteer(page).analyze()
		console.log(results.violations[0].nodes[0])
	}, 15000)
})
