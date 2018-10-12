'use-strict';

const CONSTANTS = require('./constants.js');

exports.config = {
		// Turn-off depricated webdriver-control-flow.
		SELENIUM_PROMISE_MANAGER: false,
		seleniumAddress: CONSTANTS.APPIUM_URL,
		// seleniumAddress: CONSTANTS.SELENIUM_URL,
		
		// Framework to use. Jasmine is recommended.
		framework: 'jasmine2',

		// On prepare and setup
		onPrepare: 'onprepare.js',
		
		// Capabilities to be passed to the webdriver instance.
		capabilities: CONSTANTS.ANDROID_CHROME_CAPABILITY,
		baseUrl: CONSTANTS.BASE_URL,
		specs: [
		        './features/product_tests.js',
		        './features/login_tests.js',
		],
		
		// Default timeout for test set to 5 mins.
		jasmineNodeOpts: {
			defaultTimeoutInterval: CONSTANTS.FIVE_MINS
		}
}