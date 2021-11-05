const puppeteer = require('puppeteer')

describe('IntetactuandoConElementos', () => {
	it('Tipos de espera', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		const page = await browser.newPage()

		//Espera por la navegacion
		// networkidle2 espera que la pagina este lista para interactuar
		// 		load - consider navigation to be finished when the load event is fired.
		// domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
		// networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
		// networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.

		await page.goto('https://platzi.com/', { waitUntil: 'networkidle2' })

		//Espera explicita
		await page.waitForTimeout(5000)
		//Esperar por un selector tipo CSS

		await page.waitForSelector(
			'#home-public > div > div.Header-v2.Header-v2-content.is-dark-header > div.Logo > div > a > div > figure.LogoHeader-name > img'
		)

		//Esperar por un selector tipo XPATH
		await page.waitForXPath('//*[@id="home-public"]/div/div[2]/div[1]/div/a/div/figure[1]/img')

		await page.goto('https://demoqa.com/modal-dialogs', { waitUntil: 'networkidle2' })

		//visible <boolean> wait for element to be present in DOM and to be visible, i.e. to not have display: none or visibility: hidden CSS properties. Defaults to false.
		// hidden <boolean> wait for element to not be found in the DOM or to be hidden, i.e. have display: none or visibility: hidden CSS properties. Defaults to false.
		// timeout <number> maximum time to wait for in milliseconds. Defaults to 30000 (30 seconds). Pass 0 to disable timeout. The default value can be changed by using the page.setDefaultTimeout(timeout) method.
		const button = await page.waitForSelector('#showSmallModal', { visible: true })
		const button2 = await page.waitForXPath('//*[@id="showSmallModal"]')
		await button.click()
		await button2.click()

		// Ejemplo con waiForFunction esperar que un elemento tenga un texto
		await page.waitForFunction(
			() => document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal'
		)

		//Ejemplo para observar el viewport size change
		const observaResize = page.waitForFunction('window.innerWidth < 100')
		await page.setViewport({ width: 50, height: 50 })
		await observaResize

		//Ejemplo para esperar que un elemento no este presente en el DOM
		await page.click('#closeSmallModal')
		await page.waitForFunction(() => !document.querySelector('#xample-modal-sizes-title-sm'))

		//Ejemplo como configurar el tiempo de espera de timeout y explciar como se puede sobre ewscribir el valor por defecto
		//el valor por defecto es 30000
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(10000)
		await page.click('#closeSmallModal')
		await page.waitForFunction(() => !document.querySelector('#xample-modal-sizes-title-sm'), {
			timeout: 2000,
		})

		await browser.close()
	}, 50000)
})
