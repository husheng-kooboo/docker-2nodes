module.exports ={
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
    firefox : {
      desiredCapabilities: {
        browserName: "firefox",
        marionette: true,
        // proxy: {
        //   proxyType : "manual",
        //   httpProxy : "10.0.75.1:4411",
        //   noProxy : ""
        // }
      }
      // Capabilities: {
      //   browserName: "firefox",
      //   marionette: true,
      //   "moz:firefoxOptions": {
      //     proxy: {
      //       proxyType: "MANUAL",
      //       httpProxy: "10.0.75.1:4411"
      //     }
      //   }
      // }
    },
    chrome_debug: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    firefox_debug: {
      desiredCapabilities: {
        browserName: "firefox",
        // proxy: {
        //   proxyType : "manual",
        //   httpProxy : "10.0.75.1:4411",
        //   noProxy : ""
        // }
      }
    }
  }
}
