'use-strict';

const elHelper = require('../helpers/elementhelper.js');
//
class Landing {
	/** Landing object.*/
	constructor() {
		this.navOpen = $('#navOpen');
	}
	
	/**
	 * Navigate burger icon-menu. 
	 * Ex: 'Leather >> Leather Sofas'
	 * @param {!String} navigatePath to navigate the burger icon-menu.
	 * @ return {Promise<!Landing>}
	 * */
	async navigate(navigatePath) {
		await elHelper.click(this.navOpen);
		const navPath = navigatePath.split('>>');
		let morenav = $('#mNav>ul:not([data-sub])');
		for(let i = 0; i < navPath.length; i++) {
			const navMenuText = navPath[i].trim();
			const links = morenav.$$('li');
			const cnt = await links.count();
			const navMenuItems = await elHelper
				.findElementFromElementsByText(links, navMenuText);
			const menuItem = navMenuItems[0];
			const text = await menuItem.getText();
			try {
			await elHelper.click(menuItem);
			} catch(e) {
				await elHelper.scrollIntoView(menuItem);
				await elHelper.click(menuItem);
			}
		    if(i !== (navPath.length - 1)) {
		    	morenav = $('ul[data-sub=\"' + navMenuText.toLowerCase() + '\"]');
		    	await elHelper.waitForElement(morenav);
		    }
		} 
		return this;
	} 
}

/** @type {Class} */
module.exports = Landing;