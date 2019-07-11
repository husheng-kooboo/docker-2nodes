const { setDefaultTimeout, AfterAll, BeforeAll, Before, After, BeforeStep } = require('cucumber')
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
  var world = this
  try {
    if (scenario.result.status !== 'passed') {
      console.log(Logger.colors.red('test failed'))
      if(process.env.BROWSER.indexOf('bs') > -1){
        await sendRestRequest(user, key, sessionId, {'status': 'error', 'reason': scenario.result.exception})
      }
      console.log(this)
      // await client.saveScreenshot(`tests/screenshots/${new Date().valueOf()}.jpg`, function(att){
      await client.screenshot(true, function(att){
        console.log(att)
        // Buffer.from(att.split(''))
        // world.attach(Buffer.from(att.value.split('')), 'image/png')
        world.attach(att.value, 'image/png')
      })
    }
  } catch (err) {
    await console.log(err)
  } finally {
    await console.log(Logger.colors.green('    Scenario duration:' + Math.round(parseInt(scenario.result.duration) * 100 / 60000) / 100 + ' min.'))
    await closeSession()
    await stopWebDriver()
  }
})