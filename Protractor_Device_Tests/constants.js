'use-strict';

const path = require('path');

const MS = 1000;
const MIN = MS * 60;
const APPIUM_VERSION = '1.6.5';
const ANDROID = 'Android';
const ANDROID_DEVICE_NAME = '54d88929';
const ANDROID_VERSION = '5.0';
const ANDROID_APP_NAME = 'com.roomstogo.dealstogo_2018-09-05.apk';
const CHROME = 'chrome';
const SAFARI = 'safari';
const IOS = 'iOS';
const IOS_DEVICE_NAME = 'iPhone 8';
const IOS_VERSION = '12.0';

/** @type {!Object} Android platform and device related information. */
const ANDROID_PLATFORM = {
		platformName: ANDROID,
		platformVersion: ANDROID_VERSION,
		deviceName: ANDROID_DEVICE_NAME,
}

/** @type {!Object} iOS platform and device related information. */
const IOS_PLATFORM = {
    platformName: IOS,
    platformVersion: IOS_VERSION,
    deviceName: IOS_DEVICE_NAME,
    automationName: 'XCUITest',
	udid: 'auto',
	xcodeOrgId: '<APPLE TEAM ID>',
	xcodeSigningId: 'iPhone Developer'
  }

/** @type {!Object} Android apk capability. */
const ANDROID_APP_CAPABILITY = {
		browserName: '',
	    'appium-version': APPIUM_VERSION,
	    ...ANDROID_PLATFORM,
	     'app': path.join(__dirname, 'app', ANDROID_APP_NAME),
	     'appPackage': 'com.roomstogo.dealstogo',
	     'appWaitActivity': '.MainActivity',
	     'appWaitDuration': '60000',
	     'AutoWebView': 'true',
};


/** @type {!Object} Android Chrome capability. */
const ANDROID_CHROME_CAPABILITY = {
		browserName: CHROME,
		'appium-version': APPIUM_VERSION,
		...ANDROID_PLATFORM,
};

/** @type {!Object} iOS Chrome capability. */
const IOS_CHROME_CAPABILITY = {
		browserName: CHROME,
		'appium-version': APPIUM_VERSION,
		...IOS_PLATFORM,
};

/** @type {!Object} iOS Safari capability. */
const IOS_SAFARI_CAPABILITY = {
		browserName: SAFARI,
		'appium-version': APPIUM_VERSION,
		...IOS_PLATFORM,
};

/** @type {{exports: Object}} */
module.exports = {
		ANDROID_APP_NAME,
		ANDROID_APP_CAPABILITY,
		ANDROID_CHROME_CAPABILITY,
		IOS_CHROME_CAPABILITY,
		IOS_SAFARI_CAPABILITY,
		APPIUM_URL: 'http://localhost:4723/wd/hub',
		SELENIUM_URL: 'http://localhost:4444/wd/hub',
		TWO_SECS: MS * 2,
		FIVE_SECS: MS * 5,
		FIVE_MINS: MIN * 5,
		BASE_URL: 'http://10.0.2.2:8000',
		LANDING_URL: 'https://www.roomstogo.com',
};