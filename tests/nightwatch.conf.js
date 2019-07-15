module.exports ={
  custom_assertions_path: "tests/custom_assertions",
  custom_commands_path: "tests/custom_commands",
  page_objects_path: "tests/page_objects",
  globals_path: "global.js",
  live_output: true,
  test_settings : {
    default: {
      launch_url: "https://www.baidu.com",
      selenium_host: "hub",
      desiredCapabilities: {
        browserName: "chrome"
      },
      screenshots : {
        enabled : true,
        on_failure : true,
        path : "tests_output/screenshots"
      }
    },
    chrome : {
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    chrome_bs : {
      selenium_port: 80,
      selenium_host: 'hub-cloud.browserstack.com',
      desiredCapabilities: {
        'browserstack.user': 'shane215',
        'browserstack.key': 'uqwTgk4rqqvaTVi6eviX',
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '70.0',
        'resolution': '1920x1080',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'project': 'test project',
        'build': 'test build'
      }
    },
    iphone_bs : {
      selenium_port: 80,
      selenium_host: 'hub-cloud.browserstack.com',
      desiredCapabilities: {
        'browserstack.user': 'shane215',
        'browserstack.key': 'uqwTgk4rqqvaTVi6eviX',
        'os_version': '11',
        'device' : 'iPhone 6S Plus',
        'real_mobile' : 'true',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'browserstack.appium_version': '1.8.0',
        'browserstack.safari.enablePopups': true, 
        'project': 'test project',
        'nativeWebTap': 'true',
        'build': 'test build'
      }
    },
    ipad_bs : {
      selenium_port: 80,
      selenium_host: 'hub-cloud.browserstack.com',
      desiredCapabilities: {
        'browserstack.user': 'shane215',
        'browserstack.key': 'uqwTgk4rqqvaTVi6eviX',
        'os_version': '12',
        'device' : 'iPad Pro 12.9 2018',
        'real_mobile' : 'true',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'project': 'test project',
        'build': 'test build'
      }
    },
    samsung_bs : {
      selenium_port: 80,
      selenium_host: 'hub-cloud.browserstack.com',
      desiredCapabilities: {
        'browserstack.user': 'shane215',
        'browserstack.key': 'uqwTgk4rqqvaTVi6eviX',
        'os_version': '6.0',
        'device' : 'Samsung Galaxy S7',
        'real_mobile' : 'true',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'browserstack.appium_version' : '1.9.1',
        'project': 'test project',
        'build': 'test build',
        'webkitResponseTimeout': '60000'
      }
    },
    firefox : {
      desiredCapabilities: {
        browserName: "firefox",
        marionette: true,
      }
    },
    chrome_debug: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    firefox_debug: {
      desiredCapabilities: {
        browserName: "firefox",
      }
    }
  }
}
