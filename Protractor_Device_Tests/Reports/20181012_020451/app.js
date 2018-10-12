var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Products sorted by price - High to low|Rooms to go - ",
        "passed": true,
        "pending": false,
        "os": "LINUX",
        "instanceId": 5272,
        "browser": {
            "name": "chrome"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1465172133 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335094724,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/ - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335097846,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=810607771 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335113444,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=1446210448 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335113447,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/furniture/Leather/Leather-Sofas/_/N-8ek - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335116818,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/dtagent_A23STVjpqrx_7000000181008.js 166 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1539335119749,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=1803754303 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335121165,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=140254170 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335121166,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/furniture/Leather/Leather-Sofas/_/N-8ek?Ns=sku.featuredSku%7C1%7C%7Csku.activePrice%7C0 - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335125345,
                "type": ""
            }
        ],
        "screenShotFile": "00110029-00b3-0018-0000-002a002b006c.png",
        "timestamp": 1539335091519,
        "duration": 43500
    },
    {
        "description": "Broken links|Rooms to go - ",
        "passed": true,
        "pending": false,
        "os": "LINUX",
        "instanceId": 5272,
        "browser": {
            "name": "chrome"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=58982959 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335138067,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/ - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335140254,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1467595130 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335152601,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=2036461559 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335152610,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/furniture/Leather/Leather-Sofas/_/N-8ek - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335155906,
                "type": ""
            }
        ],
        "screenShotFile": "00dc0077-009a-00f7-00bb-004a002000ab.png",
        "timestamp": 1539335136298,
        "duration": 20374
    },
    {
        "description": "Products are displayed|Rooms to go - ",
        "passed": true,
        "pending": false,
        "os": "LINUX",
        "instanceId": 5272,
        "browser": {
            "name": "chrome"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=335815034 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335168105,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/ - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335170073,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=214580421 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335182421,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1342832501 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335182422,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/furniture/Leather/Leather-Sofas/_/N-8ek - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335185049,
                "type": ""
            }
        ],
        "screenShotFile": "00ae0040-0073-0041-00f0-008400cd00d4.png",
        "timestamp": 1539335166193,
        "duration": 22880
    },
    {
        "description": "Login with invalid credentials.|Rooms to go - ",
        "passed": true,
        "pending": false,
        "os": "LINUX",
        "instanceId": 5272,
        "browser": {
            "name": "chrome"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1906048038 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335194130,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/ - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335196424,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=1791196218 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335206023,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1340366243 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335206024,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/myaccount/login.jsp - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335208522,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=566987969 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335220180,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1205645805 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335220182,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/myaccount/login.jsp?_DARGS=/mobile/myaccount/gadgets/login.jsp.atg_store_registerLoginForm - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335222603,
                "type": ""
            }
        ],
        "screenShotFile": "009b0068-0083-008d-00e8-006a00b90055.png",
        "timestamp": 1539335192192,
        "duration": 30912
    },
    {
        "description": "Create an account|Rooms to go - ",
        "passed": false,
        "pending": false,
        "os": "LINUX",
        "instanceId": 5272,
        "browser": {
            "name": "chrome"
        },
        "message": [
            "Expected false to be truthy."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.it (C:\\Users\\eTouch\\workspace\\Protractor\\features\\login_tests.js:36:20)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=790334107 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335226829,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/ - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335229876,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=958553662 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335239231,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=1252807528 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335239233,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/myaccount/login.jsp - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335241865,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.ace-tag.advertising.com/action/type=130254/bins=1/rich=0/Mnum=1516?gtmcb=668098827 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335255229,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://secure.leadback.advertising.com/adcedge/lb?site=695501&betr=sslbet_1489182985=ssprlb_1489182985[2160]&gtmcb=788384689 - Failed to load resource: net::ERR_NAME_NOT_RESOLVED",
                "timestamp": 1539335255229,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.roomstogo.com/myaccount/accountHome.jsp?_requestid=128374 - The SSL certificate used to load resources from https://rtg-live.inside-graph.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1539335257751,
                "type": ""
            }
        ],
        "screenShotFile": "003500f4-00ac-0041-0099-001200840000.png",
        "timestamp": 1539335224450,
        "duration": 34864
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
