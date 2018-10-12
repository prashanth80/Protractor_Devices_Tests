'use-strict';

const https = require('https');

/**
 * Get link health. 
 * @param {string} url to verify. 
 * @return {boolean}
 * */
function brokenLink(url) {
	if(url) {
		https.get(url, function(res) {
		  res.on('data', function(d) {
		    process.stdout.write(d);
		  });
		  return res.statusCode == 200;
		}).on('error', function(e) {
		  return false;
		});
	}
}

/**
 * Random string of specific length. 
 * @param {number} length of string to generate.
 * @param {boolean=} digits to be included or not.
 * @return {boolean}
 * */
function randomString(length, digitsIn=true) {
  let str = '';
  const randomchars = () => {
    let n = Math.floor(Math.random() * 62);
    if(digitsIn) {
    	if (n < 10) return n; // 1-10.
    }
    if (n < 36) return String.fromCharCode(n + 55); // A-Z.
    return String.fromCharCode(n + 61); // a-z.
  }
  while (str.length < length) str += randomchars();
  return str;
}

module.exports = {
		brokenLink,
		randomString,
};