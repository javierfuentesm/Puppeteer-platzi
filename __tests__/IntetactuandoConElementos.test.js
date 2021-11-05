const puppeteer = require('puppeteer')
const { click, type, doubleClick } = require('../lib/helpers')

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
		await click(page, '#authentication > span', { button: 'right', delay: 500 })
		// Double click
		await doubleClick(page, '#authentication > button')

		await page.goto('https://devexpress.github.io/testcafe/example/')
		// Llenar el campo de texto
		await type(page, '#developer-name', 'Javier', { delay: 100 })
		// Click en un radio button
		await click(page, '#remote-testing')
		await click(page, '#tried-test-cafe')
		//Seleccione el dropdown
		await page.select('#preferred-interface', 'JavaScript API')
		// Llena textarea
		await type(page, '#comments', 'Este es un comentario')
		// Click en el boton submit
		await page.waitForTimeout(5000)
		await click(page, '#submit-button')
		await page.waitForTimeout(5000)
		await browser.close()
	}, 30000)
})
