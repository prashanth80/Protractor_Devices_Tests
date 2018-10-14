'use-strict';

const path = require('path');
const wd = require('wd');
const ptor = 'npm\\node_modules\\protractor';
const appData = process.env.appdata;
const ptorPath = path.join(appData, ptor);
const protractor = require(ptorPath);
const wdBridge = require('wd-bridge')(protractor, wd);
const setUp = require('./onprepare.js')

const CONSTANTS = require('./constants.js');

exports.config = {
		// Turn-off depricated webdriver-control-flow.
		SELENIUM_PROMISE_MANAGER: false,
		
		// Selenium- appium address.
		seleniumAddress: CONSTANTS.APPIUM_URL,
		
		// Selenium standalone address.
		// seleniumAddress: CONSTANTS.SELENIUM_URL,
		
		// Framework to use. Jasmine is recommended.
		framework: 'jasmine2',

		// On prepare and setup
		onPrepare: async () => {
			await setUp();
			wdBridge.initFromProtractor(exports.config);
		},
		
		// Capabilities to be passed to the webdriver instance.
		capabilities: CONSTANTS.ANDROID_CHROME_CAPABILITY,
		
		// Capabilities for android mobile app.
		// capabilities: CONSTANTS.ANDROID_APP_CAPABILITY,
		
		// Multicapabilites for parallel testing.
//		multiCapabilities: [{
//			  'browserName': 'firefox'
//			}, 
//			{
//			  'browserName': 'chrome'
//			}
//		],
		
		
		baseUrl: CONSTANTS.BASE_URL,
		specs: [
		        './features/product_tests.js',
		        './features/login_tests.js',
		],
		
		// Default timeout for test set to 5 mins.
		jasmineNodeOpts: {
			defaultTimeoutInterval: CONSTANTS.FIVE_MINS
		},

}