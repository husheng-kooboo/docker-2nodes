var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'tests/report/cucumber_report.json',
        output: 'tests/report/cucumber_report.html',
        screenshotsDirectory: 'tests/screenshots/',
        storeScreenshots: true,
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

    try{
        reporter.generate(options);
    }catch(err){}
    