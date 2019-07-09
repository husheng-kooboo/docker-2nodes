const { client } = require('nightwatch-api')
const { Given, Then} = require('cucumber')
let search_form

Given('I open Google\'s search page', async function () {
  // this.parameters.var1 = '1234'
  this.attach('{"name": "some JSON"}', 'application/json')
  // console.log(this)
  await client.url('https://www.google.com')
})

Then('the Google search form exists', async function () {
  console.log(this.parameters.var1)
  // this.parameters.var2 = '5678'
  // console.log(this)
  search_form = client.page.homepage().section.search_form
  await search_form.waitForElementVisible('@search_box')
})

Then('the link count should be {int}', async function (count) {
  var www = this
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

Then('search {string} and show the result', async function (keyword) {
  await client.page.homepage().do_search(keyword)
})