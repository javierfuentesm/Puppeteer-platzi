const puppeteer = require('puppeteer')

describe('IntetactuandoConElementos', () => {
	it('Should open the browser ', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		})
		const page = await browser.newPage()

		// Click on alert
		page.on('dialog', async (dialog) => {
			await dialog.accept()
		})

		// Test click and double click
		await page.goto('http://demo.guru99.com/test/simple_context_menu.html')
		// Right click
		await page.click('#authentication > span', { button: 'right', delay: 500 })
		// DOuble click
		await page.click('#authentication > button', { clickCount: 2, delay: 500 })

		await page.goto('https://devexpress.github.io/testcafe/example/')
		// Llenar el campo de texto
		await page.type('#developer-name', 'Javier', { delay: 100 })
		// Click en un radio button
		await page.click('#remote-testing')
		await page.click('#tried-test-cafe')
		//Seleccione el dropdown
		await page.select('#preferred-interface', 'JavaScript API')
		// Llena textarea
		await page.type('#comments', 'Este es un comentario')
		// Click en el boton submit
		await page.waitForTimeout(5000)
		await page.click('#submit-button')
		await page.waitForTimeout(5000)
		await browser.close()
	}, 30000)
})
