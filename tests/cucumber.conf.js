const { setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver, client } = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  console.log('-----------------')
  console.log(process.env.BROWSER)
  console.log('-----------------')
  await startWebDriver({env: process.env.BROWSER});
  await createSession();
});

AfterAll(async () => {
  await client.end();
  await closeSession();
  await stopWebDriver();
});