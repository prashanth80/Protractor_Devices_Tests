# Protractor Devices Tests
A test automation solution, utilizing [Protractor](https://www.protractortest.org/#/) as the automation tool and the BBD framework being utilized is [Jasmine](https://jasmine.github.io/). 

It utilizes <tl><b>P</b>age <b>O</b>ject <b>M</b>odel as the design pattern and use [node.js](https://nodejs.org/en/) as its runtime evironment. This project is capable of running tests on mobile device (Android and iOS) browsers (Chrome and Safari). It can also run on mobile apps which of type WebView.
  
### Limitations
[Protractor tool currently is not supporting Native apps](https://github.com/angular/protractor/issues/4259) and the application roomstogo seems to be of type Native app. However, givetime a solution can be very well be designed using webdrive.io.

This automation solution is well tested using Windows7 and Samsung Nexus5. Could not tested on iOS as no resource availability.

## Software installation for Windows
1. Install [node.js](https://nodejs.org/dist/v8.12.0/node-v8.12.0-x64.msi).

Below step to be run on command prompt

2. Install [Protractor](https://www.npmjs.com/package/protractor).

		npm i -g protractor
3. Install [protractor-beautiful-reporter](https://www.npmjs.com/package/protractor-beautiful-reporter).

		npm i -g protractor-beautiful-reporter
4. Install [wd](https://www.npmjs.com/package/wd) and [wd-bridge](https://www.npmjs.com/package/wd-bridge).
    
		npm i -g windows-build-tools
5. Install [windows-build-tools](https://www.npmjs.com/package/windows-build-tools).

		npm i -g --save-dev wd wd-bridge
* Note: wd and wd-bridge are need to perform keypad and other actions.
6. Install [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/) 8 and above. Once installation is complete, ensure JAVA_HOME environment variable is set.

7. Webdriver-manager update to setup Appium, Android, Chrome and Gecko drivers

		webdriver-manager update --android --android-accept-licenses
Note: 
1. This step would take about 15 to 20 mins.
2. Currently update of latest Chrome driver version into Appium is failing. Manually update by copying Chrome driver from
	
		From:
		%APPDATA%\npm\node_modules\protractor\node_modules\webdriver-manager\selenium
		
		To: 
		%APPDATA%\npm\node_modules\protractor\node_modules\webdriver-manager\selenium\appium-
		1.6.5\node_modules\appium\node_modules\appium-chromedriver\chromedriver\win

## Installed softwares windows

|Software                       |Version    |
|-------------------------------|-----------|
|node.js                        | 8.12.0    |
|protractor                     | 5.4.1     |
|protractor-beautiful-reporter  | 1.2.5     |
|windows-build-tools            | 5.0.0     |
|Java                           | 8 or above|
|wd                             | 1.11.0    |
|wd-bridge                      | 0.0.2     |
|Appium                         | 1.6.5     |
|Android SDK                    | 24.4.1    |
|Chrome driver                  | 2.42      |

## Software installation for Mac
1. Install [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/) 8 and above. Once installation is complete, ensure JAVA_HOME environment variable is set.

2. Install XCode and then install XCode Cli

		xcode-select --install
3. Install HomeBrewruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

4. Update the bash profile.

		nano ~/.bash_profile
and then enter below export, save file and exit. Close the terminal once saved.

		export JAVA_HOME=$(/usr/libexec/java_home)
5. Open a new terminal and run 

		brew update
6. Install node
        
		brew install node
7. Update npm

		npm i -g npm
8. Install wd and wd-bridge

		npm i -g --save-dev wd wd-bridge
9. Install appium

		npm i -g appium
10. Install Carthage by performing below. Carthage is a web-server for building data manipulation-centric API services in Node.js, mobile and others.

		cd /usr/local/lib/node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent
		brew install carthage
11. Install web-pack. Run below commands

		npm i -g webpack
		./Scripts/bootstrap.sh -d
12. Install libimobiledevice for real device testing
    
		brew install libimobiledevice
13. Install appium-doctor to verify installation
  
		npm i -g appium-doctor
14. Run appium doctor to verify installation
  
		appium-doctor --ios
Ensure appium-doctor has no complains. Else have to ensure the complains are addressed for successful setup.
15. Install ios-deploy

		npm i -g ios-deploy
16. Install ios-webkit-debug-policy

		npm i -g ios-webkit-debug-proxy

## Installed softwares iOS
// TODO - Need resource to very and update.
        
## Folder structures
Below is the layout of the files and folders

    Protractor_Device_Tests
    -----------------------
    + app                       \-  com.roomstogo.dealstogo_2018-09-05.apk
    |
    + components                \-  landing.js
    |                           \-  login.js
    |                           \-  products.js
    |
    + features                  \-  login_test.js
    |                           \-  product_tests.js
    |
    + helpers                   \-  elementhelper.js
    |                           \-  helper.js
    |
    + Reports                   +   20181012_020451     \-  report.html
    |                                                   \-  ...
    \-  conf.js
    |
    \-  constants.js
    |
    \-  onprepare.js
  
  <tl><b><u>app:</b></u></tl>
  All apps to contain in this location.
  
  <tl><b><u>components:</b></u></tl>
  Components are various page objects and they all extend from the base class which is landing.js. These objects help in
  encapsulation of varios methods which are very specific to that page. The components utilize various helper methods located at 
  helpers folder.
  
  <tl><b><u>features:</b></u></tl>
  Features contain various test related to specific module. These test files in turn utilize various helper methods located at helpers
  folder.
  
  <tl><b><u>helpers:</b></u></tl>
  Helpers folder contain various helper methods which accelate the tests and reduce flakiness of tests. These helper methods address 
  specific state of elements, randomization of string to uniqueness of data, customized click method to ensure unexpected elements are
  not being clicked and reduce test falkiness and scrolling of element into scoll-view to ensure element is well with-in scroll area.

  <tl><b><u>Reports:</b></u></tl>
  Reports are generated for each test run and updated into a folder whose name is based on test rum timestamp. Each test report folder
  contains a report.html which contains various metrics like, pass, fail, ignored, screenshots and many more details.
  
  <tl><b><u>conf.js:</b></u></tl>
  Protractor depends on the conf file for setting up the test bed which is repetative in nature across test execution cycles.
  
  <tl><b><u>constants.js:</b></u></tl>
  All global leve constants are defined here to reduce redudency of data. The constants contain objects maps defined for
  ANDROID_CHROME_CAPABILITY, ANDROID_APP_CAPABILITY, IOS_CHROME_CAPABILITY, IOS_SAFARI_CAPABILITY and other global level contants to
  defined various timeouts.
  
  <tl><b><u>onprepare.js:</b></u></tl>
  All test-bed preparatory task are setup in this file, like setting up test report object which will be driven by Jasmine for each 
  test-case run. 
  
## Test cases
<tl><b><u>Login test:</b></u></tl>
  - [Login with invalid credentials.](https://github.com/prashanth80/Protractor_Devices_Tests/blob/master/Protractor_Device_Tests/features/login_tests.js#L18)
  - [Create an account.](https://github.com/prashanth80/Protractor_Devices_Tests/blob/master/Protractor_Device_Tests/features/login_tests.js#L24)

<tl><b><u>Product test:</b></u></tl>
  - [Products sorted by price - High to low.](https://github.com/prashanth80/Protractor_Devices_Tests/blob/master/Protractor_Device_Tests/features/product_tests.js#L18)
  - [Broken links.](https://github.com/prashanth80/Protractor_Devices_Tests/blob/master/Protractor_Device_Tests/features/product_tests.js#L27)
  - [Products are displayed.](https://github.com/prashanth80/Protractor_Devices_Tests/blob/master/Protractor_Device_Tests/features/product_tests.js#L32)
  
## To execute tests on Windows.
1. Ensure that the Android device's, developer options has USB debugging checked. Once enabled, connect the Android device via an USB.
2. Find the device name by issuing command 'adb devices' at the command prompt.
3. Find the Android version from the Android device settings.
4. Under constans.js, modify ANDROID_DEVICE_NAME and ANDROID_VERSION from step2 and step3.
5. If iOS device, get the device name, its version and update values for IOS_DEVICE_NAME, IOS_VERSION.
6. Based on the device, browser
Goto to tracked project folder location and run below command

		protractor conf.js

## To execute test on Mac
1. Find the device iOS version from device settings.
2. Update IOS_DEVICE_NAME and IOS_VERSION under constants.js
3. Locate ['Team ID'](https://developer.apple.com/account/#/welcome) from  and update TeamID for key 'xcodeOrgId' under object map IOS_PLATFORM.
4. Goto to tracked project folder location and run below command

		protractor conf.js
