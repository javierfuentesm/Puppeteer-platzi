const puppeteer = require('puppeteer')

describe('Emulacion de dispositivos', () => {
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

	//Mostrar sitio de donde se pueden obtener los dispositivos emulados
	//https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts

	it('Emulando sin devices ', async () => {
		await page.emulate({
			name: 'Mio',
			viewport: {
				width: 375,
				height: 667,
				deviceScaleFactor: 2,
				isMobile: true,
				hasTouch: true,
				isLandscape: false,
			},
			userAgent:
				'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
		})
		await page.waitForTimeout(5000)
	}, 50000)

	it('Emulando sitio de escritorio ', async () => {
		await page.setViewport({
			width: 1280,
			height: 800,
		})
		await page.waitForTimeout(2000)
	}, 50000)

	it('Emulando sitio en tablet ', async () => {
		const tablet = puppeteer.devices['iPad Pro']
		await page.emulate(tablet)
		await page.waitForTimeout(2000)
	}, 50000)

	it('Emulando sitio en tablet landscape', async () => {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.waitForTimeout(2000)
	}, 50000)

	it('Emulando sitio en celular ', async () => {
		const iphone = puppeteer.devices['iPhone X']
		await page.emulate(iphone)
		await page.waitForTimeout(2000)
	}, 50000)
})
