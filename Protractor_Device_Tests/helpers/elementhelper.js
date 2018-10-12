'use-strict';

const CONSTANTS = require('../constants.js');

const ec = protractor.ExpectedConditions;

/**
 * Move an element into scroll-view before performing any actions.
 * @param {!protractor.ElementFinder} el to scroll into view.
 * @ return {!Promise<void>}
 * */
async function scrollIntoView(el, text) {
	await browser.executeScript(() => {
		arguments[0].scrollIntoView();
	}, el.getWebElement());
}

/**
 * Find an element from elementArrayFinder based on given text.
 * @param {!protractor.ElementArrayFinder} els an element array finder 
 * to find and element based on text.
 * @param {!String} text of element to find. 
 * @ return {!Promise<Array<ElementFinder>>}
 * */
function findElementFromElementsByText(els, text) {
	return els.reduce((agg, el) => {
		return el.getText().then(elText => elText).then(elText => {
			// Remove any new line, << and >> characters. 
			const menuEntry = elText.split('\n');
			const menuItem = menuEntry[0].trim().includes('<<') ? menuEntry[1].trim() : menuEntry[0].trim();
			if(menuItem.includes(text)) {
				agg.push(el);
			}
			return agg;
		});
	}, []).then(items => Promise.all(items));
}

/**
 * Click on element only when visible, present and clickable.
 * @param {!protractor.ElementFinder} el to click on.
 * @ return {Promise<void>}
 * */
async function click(el) {
	const conditions = ec.and(ec.visibilityOf(el), ec.presenceOf(el), 
			ec.elementToBeClickable(el));
	try {
		const isConditions = await browser.wait(conditions, CONSTANTS.FIVE_SECS);
		if(isConditions) {
			await el.click();
		} else {
			console.warn(`Element either not visible, 
					present or clickable. Element: ${el.locator()}`);
		}	
	} catch(err) {
		return Promise.reject(`${el.locator()} - ${err}`);
	}
}


/**
 * Wait for an element to be visible and present.
 * @param {!protractor.ElementFinder} el to click on.
 * @param {number=} timeout optional parameter.
 * @ return {!Promise<boolean>}
 * */
async function waitForElement(el, timeout=CONSTANTS.FIVE_SECS) {
	try {
		return await browser.wait(async () => await el.isDisplayed(), timeout);
	} catch(err) {
		return Promise.reject(`${el.locator()} - ${err}`);
	}
}

/**
 * Wait for an element to be clickable.
 * @param {!protractor.ElementFinder} el to click on.
 * @param {number=} timeout optional parameter.
 * @ return {!Promise<boolean>}
 * */
async function waitForElementClickable(el, timeout=CONSTANTS.FIVE_SECS) {
	try {
		return await browser.wait(async () => await ec.elementToBeClickable(), 
				timeout);
	} catch(err) {
		return Promise.reject(`${el.locator()} - ${err}`);
	}
}

/**
 * Select text from drop-down.
 * @param {!protractor.ElementFinder} el for drop-down.
 * @param {string} text to select.
 * @ return {!Promise<void>}
 * */
async function selectDropDown(el, text) {
	return await el.element(by.cssContainingText('option', text)).click();
}

function waitForUrlChange(beforeUrl) {
	return browser.wait(() =>
		browser.getCurrentUrl().then(currUrl => beforeUrl !== currUrl));
}

/** @type {{exports: Object}} */
module.exports = {
		click,
		scrollIntoView,
		findElementFromElementsByText,
		waitForElement,
		selectDropDown,
		waitForUrlChange,
		waitForElementClickable,
};