const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('Visual test', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		page = await browser.newPage()
		await page.goto('https://platzi.com')
	})

	afterAll(async () => {
		await browser.close()
	})

	test('Snapshot de toda la pagina', async () => {
		await page.waitForSelector('img')
		const screenshoot = await page.screenshot()
		// By default the threshold is 0.01 treated as a percentage treshold es umbral
		expect(screenshoot).toMatchImageSnapshot()
	})

	test('Snapshot de solo un elemento', async () => {
		const image = await page.waitForSelector('img')
		const screenshoot = await image.screenshot()
		// By default the threshold is 0.01 treated as a percentage treshold es umbral
		// expect(screenshoot).toMatchImageSnapshot()
		// failureThresholdType: (default pixel) (options percent or pixel)
		expect(screenshoot).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		})
	})

	test('Snapshot de un dispositivo movil', async () => {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)

		await page.waitForSelector('img')
		const screenshoot = await page.screenshot()
		// By default the threshold is 0.01 treated as a percentage treshold es umbral
		// expect(screenshoot).toMatchImageSnapshot()
		// failureThresholdType: (default pixel) (options percent or pixel)
		expect(screenshoot).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		})
	})

	//Remover elemento antes de crear el snapshot
	test('Remover imagenes antes de crear el snapshot', async () => {
		await page.waitForSelector('img')
		// pageFunction <function|string> Function to be evaluated in the page context, waitForFunction o $eval esperan a que se resuleva la promesa y regresan el valor
		// evaluate solo ejecuta o evalua el contexto de la pagina
		await page.evaluate(() =>
			(document.querySelectorAll('img') || []).forEach((img) => img.remove())
		)

		const screenshoot = await page.screenshot()
		// By default the threshold is 0.01 treated as a percentage treshold es umbral
		// expect(screenshoot).toMatchImageSnapshot()
		// failureThresholdType: (default pixel) (options percent or pixel)
		expect(screenshoot).toMatchImageSnapshot({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		})
	})
})
