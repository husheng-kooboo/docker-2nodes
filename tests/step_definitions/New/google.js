const { client } = require('nightwatch-api')
const { Given, Then} = require('cucumber')

Given('I open Google\'s search page', async () => {
  await client.url('https://www.google.com')
})

Then('the Google search form exists', async () => {
  await client.waitForElementVisible('#searchform')
})

Then('the link count should be {int}', async (count) => {
  await client.assert.count('a', count)
})