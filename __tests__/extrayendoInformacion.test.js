const puppeteer = require('puppeteer')
const { getText, getCount } = require('../lib/helpers')

describe('Extrayendo informacion', () => {
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

	// beforeEach(async () => {
	// 	browser = await puppeteer.launch({
	// 		headless: false,
	// 		defaultViewport: null,
	// 	})
	// 	page = await browser.newPage()
	// })

	// afterEach(async () => {
	// 	await browser.close()
	// })

	it('Extrayendo informacion del titulo y de la URL ', async () => {
		//extraer el titulo
		await page.goto('https://www.google.com/')
		const titulo = await page.title()
		//extraer la url
		const url = await page.url()

		console.log(titulo)
		console.log(url)
	}, 50000)

	it('Extrayendo informacion de un elemento', async () => {
		//extraer el nombre del boton de Empresas de Platzi.com con css selector
		await page.goto('https://platzi.com/')

		const nombreBoton = await getText(
			page,
			'#home-public > div > div.Header-v2.Header-v2-content.is-dark-header > div.Nav-header > div.Actionsv2 > a'
		)

		console.log(nombreBoton)
	}, 50000)

	it('Contar elementos de una pagina ', async () => {
		//extraer el nombre del boton de Empresas de Platzi.com con css selector
		await page.goto('https://platzi.com/')
		const numero = await getCount(page, 'img')
		console.log(numero)
	}, 50000)
})
