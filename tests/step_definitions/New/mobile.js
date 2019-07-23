const { client } = require('nightwatch-api')
const { Given, Then, When} = require('cucumber')

Given('open mobile 163 news', async function () {
    await client.url('https://baidu.com')
})

When('choose share by QQ', async function () {
    await client.setValue('#index-kw', '')
    await client.expect.element('.newHisBtn').to.be.visible
    await client.click('.newHisBtn')
    await client.setValue('#index-kw', 'Nightwatch')
    await client.expect.element('#index-bn').to.be.visible
    await client.click('#index-bn')
})

Then('the popup should show', async function () {
    await client.expect.element('#results').to.be.present
    // await client.click('.qzone')
    // await client.setContext('NATIVE_APP')
    // await client.useXpath()
    // await client.click('//*[@name="Allow"]')
    // await client.contexts(function(result) {
    //     client.setContext(result.value[result.value.length - 1])
    //     client.useCss()
    // })
})