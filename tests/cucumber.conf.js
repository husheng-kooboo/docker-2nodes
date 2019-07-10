const { setDefaultTimeout, AfterAll, BeforeAll, Before, After } = require('cucumber')
const { createSession, closeSession, startWebDriver, stopWebDriver, client } = require('nightwatch-api')
var Logger = require('../node_modules/nightwatch/lib/util/logger.js')
var request = require('request')
let sessionId
let user = 'shane215'
let key = 'uqwTgk4rqqvaTVi6eviX'

setDefaultTimeout(600000);

var sendRestRequest = (user, key, sessionId, args) => {
  request({
    uri: `https://${user}:${key}@api.browserstack.com/automate/sessions/${sessionId}.json`,
    method: 'PUT',
    form: args
  })
}

Before(async function (scenario) {
  await startWebDriver({env: process.env.BROWSER, configFile: 'tests/nightwatch.conf.js'})
  await createSession()
  await client.session(function (session) {
    sessionId = session.sessionId
    console.log(Logger.colors.green('    Session ID: ' + session.sessionId))
    console.log(Logger.colors.green('    Scenario Name: ' + scenario.pickle.name))
  })
  await sendRestRequest(user, key, sessionId, {'name': scenario.pickle.name})
});

After(async function (scenario) {
  try {
    if (scenario.result.status !== 'passed') {
      console.log(Logger.colors.red('test failed'))
      if(process.env.BROWSER.indexOf('bs') > -1){
        sendRestRequest(user, key, sessionId, {'status': 'error', 'reason': scenario.result.exception})
      }
    }
  } catch (err) {
    console.log(err)
  } finally {
    console.log(Logger.colors.green('    Scenario duration:' + Math.round(parseInt(scenario.result.duration) * 100 / 60000) / 100 + ' min.'))
    await closeSession()
    await stopWebDriver()
  }
})