'use-strict';

const elHelper = require('../helpers/elementhelper.js');
const helper = require('../helpers/helper.js');
const Landing = require('../components/landing.js');
const CONSTANTS = require('../constants.js');

const ec = protractor.ExpectedConditions;

class Login extends Landing {
	/** Login object.*/
	constructor() {
		super();
		this.emailId = element(by.id('accountSigninEmail'));
		this.password = $('#accountSigninPassword');
		this.signIn = $('#accountSignin');
		this.errorMsg = $('.errorMessage');
		this.createAcc = element(by.id('createAccountButton'));
		this.fName = $('#atg_store_profileFirstName');
		this.lName = $('#atg_store_profileLastName');
		this.email1 = $('#atg_store_registerEmailAddress');
		this.email2 = $('#atg_store_registerConfirmEmailAddress');
		this.pass1 = $('#atg_store_registerPassword');
		this.pass2 = $('#atg_store_registerConfirmPassword');
		this.createNewAcc = $('#createAccount');
		this.accountConfirm = $('.personalInfo');
	}
	
	/**
	 * Get product count.
	 * @param {string} users email.
	 * @param {string} users password.
	 * @return {!Promise<!Login>}
	 * */
	async login(email, password) {
		await this.emailId.sendKeys(email);
		await this.password.sendKeys(password);
		try {
			await $('h1').sendKeys(protractor.Key.ESCAPE);
		} catch (e) {}
		await browser.sleep(CONSTANTS.TWO_SECS);
		await elHelper.click(this.signIn);
		return this;
	}
	
	/**
	 * Get error message.
	 * @return {!Promise<string>}
	 * */
	async errorMessage() {
		return await this.errorMsg.getText();
	}
	
	/**
	 * Create an account.
	 * @param {!Object} user registration details.
	 * @return {!Promise<Login>}
	 * */
	async createAccount(userToRegister) {
		await elHelper.waitForElement(this.createAcc);
		await this.createAcc.click();
		await this.fName.sendKeys(userToRegister.fname);
		await this.lName.sendKeys(userToRegister.lname);
		await this.email1.sendKeys(userToRegister.emailId);
		await this.email2.sendKeys(userToRegister.confirmEmailId);
		await this.pass1.sendKeys(userToRegister.password);
		await this.pass2.sendKeys(userToRegister.confirmPassword);
		try {
		await element(
				by.cssContainingText('.required', 'Password'))
					.sendKeys(protractor.Key.ESCAPE);
		} catch (e) {}
		await browser.sleep(CONSTANTS.TWO_SECS);
		await this.createNewAcc.click();
		return this;
	}
	
	/**
	 * Verify creates account.
	 * @param {!Object} user registration details.
	 * @return {!Promise<boolean>}
	 * */
	async verifyAccountCreation(userToRegister) {
		await elHelper.waitForElement(this.accountConfirm);
		const fn = await this.accountConfirm.$('.fn').getText();
		const email = await this.accountConfirm.$('.email').getText();
		const flName = ''.concat(userToRegister.fname, ' ', 
				userToRegister.lname);
		return fn.trim() == flName && email.trim() == userToRegister.emailId ? 
				true : false;
	}
}

/** @type {Class} */
module.exports = Login;
