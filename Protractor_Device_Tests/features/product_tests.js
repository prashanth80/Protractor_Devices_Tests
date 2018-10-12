'use-strict';

const CONSTANTS = require('../constants.js');
const Landing = require('../components/landing.js');
const Products = require('../components/products.js');
const elHelper = require('../helpers/elementhelper.js');

describe('Rooms to go - ', () => {
	let product;
	beforeEach(async () => {
		await browser.get(CONSTANTS.LANDING_URL);
		product = new Products();
		const beforeUrl = await browser.getCurrentUrl();
		await product.navigate('Leather>>Leather Sofa');
		await elHelper.waitForUrlChange(beforeUrl);
	});
	
	it('Products sorted by price - High to low', async () => {
		const beforeUrl = await browser.getCurrentUrl();
		await browser.get(beforeUrl + product.priceL2H);
		await elHelper.waitForUrlChange(beforeUrl);
		const actualPriceL2H = await product.getProductsPrices();
		const expectedPriceL2H = actualPriceL2H.sort((a, b) => a - b);
		expect(expectedPriceL2H).toEqual(actualPriceL2H);
	});
	
	it('Broken links', async () => {
		const broken = await product.productImageLinkBrokenVerify();
		expect(broken).toBeFalsy();
	});
	
	it('Products are displayed', async () => {
		const a = await product.getProductCount();
		// Verify for product count is greater than 1.
		expect(a).toBeGreaterThan(1);
	});
});