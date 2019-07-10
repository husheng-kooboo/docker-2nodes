const { client } = require('nightwatch-api')
const { Given, Then, When} = require('cucumber')

Given('I open Google\'s search page', async function () {
  // this.parameters.var1 = '1234'
  this.attach('{"name": "some JSON"}', 'application/json')
  // console.log(this)
  await client.page.homepage().navigate()
})

Then('the Google search form exists', async function () {
  // console.log(this.parameters.var1)
  // this.parameters.var2 = '5678'
  // console.log(this)
  await client.page.homepage().section.search_form.waitForElementVisible('@search_box')
})

Then('the link count should be correct', async function () {
  // var www = this
  await client.countElementNumber('a', function(res){
    client.assert.count('a', res.value)
    // console.log(www.parameters.var1)
    // console.log(www.parameters.var2)
  })
  // this.parameters.var3 = '0000'
  // console.log(this)
  // this.parameters = {}
  // console.log(this)
  
})

Given('search {string} in search box', async function (keyword) {
  await client.page.homepage().do_search(keyword)
})

When('click the search button', async function () {
  await client.page.homepage().section.search_form.waitForElementVisible('@search_button')
  await client.page.homepage().section.search_form.click('@search_button')
})

Then('the {string} search result show correct', async function (keyword) {
  await client.assert.title(`${keyword} - Google Search`)
})