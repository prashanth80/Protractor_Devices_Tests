'use-strict';

const CONSTANTS = require('../constants.js');
const Login = require('../components/login.js');
const elHelper = require('../helpers/elementhelper.js');
const helper = require('../helpers/helper.js');

describe('Rooms to go - ', () => {
	let product;
	beforeEach(async () => {
		await browser.get(CONSTANTS.LANDING_URL);
		login = new Login();
		const beforeUrl = await browser.getCurrentUrl();
		await login.navigate('Sign in / Create Account');
		await elHelper.waitForUrlChange(beforeUrl);
	});
	
	it('Login with invalid credentials.', async () => {
		await login.login('aa@a.com', 'aaa');
		const err = await login.errorMessage();
		expect(err).toContain('login is not valid');
	});
	
	it('Create an account', async() => {
		const id = helper.randomString(8);
		const userToRegister = {
				'fname': 'fname' + id.toLowerCase(),
				'lname': 'lname' + id.toLowerCase(),
				'emailId': id + '@bbb.com',
				'confirmEmailId': id + '@bbb.com',
				'password': 'Password@123',
				'confirmPassword': 'Password@123',
		};
		const create = await login.createAccount(userToRegister);
		const isTruthy = await login.verifyAccountCreation(userToRegister);
		expect(isTruthy).toBeTruthy();
	});
});