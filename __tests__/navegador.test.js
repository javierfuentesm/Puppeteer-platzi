const puppeteer = require('puppeteer')

describe('Mi primer test de puppeteer', () => {
	it('Debe abrir y cerrar el navegador el navegador', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		const page = await browser.newPage()

		await page.goto('https://yahoo.com/')
		//Espera explicita
		await page.waitForTimeout(5000)
		await page.waitForSelector('img')
		// Recarga la pagina
		await page.reload()
		await page.waitForSelector('img')
		//Navegar a otro sitio
		await page.goto('https://www.platzi.com/')
		await page.waitForSelector(
			'#home-public > div > div.Header-v2.Header-v2-content.is-dark-header > div.Logo > div > a > div > figure.LogoHeader-name > img'
		)
		//Navegar hacia atras
		await page.goBack()

		await page.waitForSelector('img')

		//Navegar hacia adelante
		await page.goForward()
		await page.waitForSelector(
			'#home-public > div > div.Header-v2.Header-v2-content.is-dark-header > div.Logo > div > a > div > figure.LogoHeader-name > img'
		)

		//Abrir otra pagina
		const page2 = await browser.newPage()
		await page2.goto('https://www.google.com/')

		//esperar por texto en la pagina
		await page2.waitForSelector('img')
		await page.bringToFront()
		await page.waitForSelector(
			'#home-public > div > div.Header-v2.Header-v2-content.is-dark-header > div.Logo > div > a > div > figure.LogoHeader-name > img'
		)
		await page.waitForTimeout(5000)

		await browser.close()
	}, 300000)
})
