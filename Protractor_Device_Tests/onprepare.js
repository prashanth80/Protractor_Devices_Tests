'use-strict';

const HTMLReporter = require('protractor-beautiful-reporter');

const CONSTANTS = require('./constants.js');

/**
 * Add's HTML report to Jasmine.
 * */
function reporter() {
	const d = new Date();
	date =	''.concat(d.getFullYear(), 
			(d.getMonth() + 1).toString().padStart(2, '0'), 
			d.getDate().toString().padStart(2, '0'), '_', 
			d.getHours().toString().padStart(2, '0'), 
			d.getMinutes().toString().padStart(2, '0'), 
			d.getSeconds().toString().padStart(2, '0'));
	const reportName = 'Reports/' + date;
	jasmine.getEnv().addReporter(new HTMLReporter({
		baseDirectory: reportName
	}).getJasmine2Reporter());
}

let browser2;
/** Spin new browser for parallel testing */
function spinNewBrowser() {
	browser2 = browser.forkNewDriverInstance(true);
}

async function setUp() {
	browser.ignoreSynchronization=true;
	await browser.waitForAngularEnabled(false);
	reporter();
}

module.exports = setUp;