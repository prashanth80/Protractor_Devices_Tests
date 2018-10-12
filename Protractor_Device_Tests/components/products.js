'use-strict';

const CONSTANTS = require('../constants.js');
const Landing = require('./landing.js');
const elHelper = require('../helpers/elementhelper.js');
const helper = require('../helpers/helper.js');

class Products extends Landing {
	/** Products object.*/
	constructor() {
		super();
		this.items = $$('li.itemCube');
		this.prices = $$('.productPrice .newPrice');
		this.productGrid = $('#rtgProductGrid');
		this.gridImage = $$('.productPage.gridWrap img');
		this.priceL2H = '?Ns=sku.featuredSku%7C1%7C%7Csku.activePrice%7C0';
	}

	/**
	 * Get product count.
	 * @return {!Promise<number>}
	 * */
	async getProductCount() {
		await elHelper.waitForElement(this.productGrid, CONSTANTS.FIVE_SECS);
		return await this.items.count();
	}

	/**
	 * Get prices for products.
	 * @return {!Promise<Array<number>>}
	 * */
	getProductsPrices() {
		return this.prices.reduce((agg, price) => 
		price.getText().then(txt => {
			// Strip '$' and ','.
			agg.push(parseInt(txt.replace(/[^0-9.-]+/g,"")));
			return agg;
		}), []).then(prices => {
			return Promise.all(prices);
		});
	}

	/**
	 * Health check of product image links.
	 * @return {!Promise<Array<number>>}
	 * */
	productImageLinkBrokenVerify() {
		let isBroken = false;
		return this.gridImage.each(img => {
			img.getAttribute('src').then(src => {
				const res = helper.brokenLink('https:'+ src)
					if(!res) {
						isBroken = !res;
					}
			});
		}).then(() => isBroken);
	}
}

/** @type {Class} */
module.exports = Products;