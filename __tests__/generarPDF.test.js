const puppeteer = require('puppeteer')

describe('Generacion de pdf', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			defaultViewport: null,
		})
		page = await browser.newPage()
		await page.goto('https://www.google.com/')
	})

	afterAll(async () => {
		await browser.close()
	})

	it('PDF de pantalla completa', async () => {
		let cssb = []
		cssb.push('<style>')
		cssb.push('h1 { font-size:10px; margin-left:30px;}')
		cssb.push('</style>')
		const css = cssb.join('')

		await page.pdf({
			path: './google.pdf',
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: css + '<h1>' + 'My PDF Report Header' + '</h1>',
			footerTemplate:
				css + '<h1>Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
			margin: {
				top: '100px',
				bottom: '200px',
				right: '30px',
				left: '30px',
			},
		})
	}, 50000)

	it('PDF de pantalla ladscape', async () => {
		let cssb = []
		cssb.push('<style>')
		cssb.push('h1 { font-size:10px; margin-left:30px;}')
		cssb.push('</style>')
		const css = cssb.join('')

		await page.pdf({
			path: './google-landscape.pdf',
			format: 'A4',
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: css + '<h1>' + 'My PDF Report Header' + '</h1>',
			footerTemplate:
				css + '<h1>Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
			margin: {
				top: '100px',
				bottom: '200px',
				right: '30px',
				left: '30px',
			},
			landscape: true,
		})
	}, 50000)
})
