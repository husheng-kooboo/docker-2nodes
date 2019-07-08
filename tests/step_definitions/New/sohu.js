const { client } = require('nightwatch-api')
const { Given, Then} = require('cucumber')

Given('I open Sohu\'s search page', async () => {
  await client.url('https://www.sohu.com');
});

Then('the Sohu search form exists', async () => {
  await client.click('.header-search')
  await client.waitForElementVisible('#search-input');
});