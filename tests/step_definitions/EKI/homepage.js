const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

Given(/^open the homepage$/, async () => {
  await client.url('http://dev:dev@eki.hypernode.io/eki400.html')
});