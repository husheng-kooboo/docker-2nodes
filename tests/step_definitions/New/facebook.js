const { client } = require('nightwatch-api')
const { Given, Then} = require('cucumber')

Given('I open Facebook\'s homepage', async () => {
  await client.url('https://www.facebook.com');
});

Then('the Facebook login form exists', async () => {
  // await client.click('.header-search')
  await client.waitForElementVisible('#login_form');
});