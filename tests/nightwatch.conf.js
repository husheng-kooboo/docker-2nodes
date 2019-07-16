module.exports ={
  custom_assertions_path: "tests/custom_assertions",
  custom_commands_path: "tests/custom_commands",
  page_objects_path: ["tests/page_objects/","tests/page_objects/google/"],
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
        browserName: "chrome",
        'goog:chromeOptions': {
          args: ['--disable-gpu',
          '--ignore-certificate-errors',
          'window-size=1280,768']
        }
      }
    },
    chrome_bs : {
      selenium_port: 80,
      selenium_host: 'hub-cloud.browserstack.com',
      desiredCapabilities: {
        'browserstack.user': 'leon245',
        'browserstack.key': 'R3a1BxyWyNZNVgpkM9pC',
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
        'browserstack.user': 'leon245',
        'browserstack.key': 'R3a1BxyWyNZNVgpkM9pC',
        'os_version': '11',
        'device' : 'iPhone 8 Plus',
        'real_mobile' : 'true',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'browserstack.appium_version': '1.7.0',
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
        'browserstack.user': 'leon245',
        'browserstack.key': 'R3a1BxyWyNZNVgpkM9pC',
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
        'browserstack.user': 'leon245',
        'browserstack.key': 'R3a1BxyWyNZNVgpkM9pC',
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
