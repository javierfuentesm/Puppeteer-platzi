const puppeteer = require('puppeteer')

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
		const nombreBoton = await page.$eval(
			'#home-public > div > div.Header-v2.Header-v2-content.is-dark-header > div.Nav-header > div.Actionsv2 > a',
			(boton) => boton.textContent
		)

		//extraer el nombre del boton de Empresas de Platzi.com con xpath
		const [boton2] = await page.$x("//a[@class='ButtonLogin-cta']")
		//Primera forma de hacerlo
		const text = await boton2.getProperty('textContent')
		const name1 = await text.jsonValue()
		//Segunda forma de hacerlo
		//Si la función pasada a page.evaluate devuelve una Promise, page.evaluate esperará a que la promesa se resuelva y devuelva su valor.
		const name2 = await page.evaluate((name) => name.textContent, boton2)

		console.log(nombreBoton)
		console.log(name1)
		console.log(name2)

		//Tercera forma de hacerlo
		const boton3 = await page.waitForXPath("//a[@class='ButtonLogin-cta']")
		const name3 = await page.evaluate((name) => name.textContent, boton3)
		console.log(name3)
	}, 50000)

	it('Contar elementos de una pagina ', async () => {
		//extraer el nombre del boton de Empresas de Platzi.com con css selector
		await page.goto('https://platzi.com/')

		//Contar todas las img de la pagina
		const images = await page.$$eval('img', (imagenes) => imagenes.length)
		console.log(images)
	}, 50000)
})
