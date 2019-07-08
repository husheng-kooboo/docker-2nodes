module.exports ={
  custom_assertions_path: "tests/custom_assertions",
  custom_commands_path: "tests/custom_commands",
  live_output: true,
  test_settings : {
    default: {
      launch_url: "https://www.baidu.com",
      selenium_host  : "hub",
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
        'browserstack.user': 'shane212',
        'browserstack.key': 'KaJRd6ECrpwpcxFyhCbS',
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '70.0',
        'resolution': '1920x1080',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'project': 'test project',
        'build': 'test build'
      },
    },
    iphone_bs : {
      selenium_port: 80,
      selenium_host: 'hub-cloud.browserstack.com',
      desiredCapabilities: {
        'browserstack.user': 'shane212',
        'browserstack.key': 'KaJRd6ECrpwpcxFyhCbS',
        'os_version': '11',
        'device' : 'iPhone 8 Plus',
        'real_mobile' : 'true',
        'browserstack.debug': 'true',
        'browserstack.networkLogs': 'true',
        'project': 'test project',
        'build': 'test build'
      },
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
