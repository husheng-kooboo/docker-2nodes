const { client } = require('nightwatch-api')
const { Given, Then, When} = require('cucumber')

Given('open mobile 163 news', async function () {
    await client.url('https://news.google.com/articles/CAIiENPV9MwJCYZXKcj1txU1e0sqGQgEKhAIACoHCAowocv1CjCSptoCMPrTpgU?hl=en-US&gl=US&ceid=US%3Aen')
})

When('choose share by QQ', async function () {
    await client.click('.recommend-list .card-type-news:nth-child(1) > a')
    await client.waitForElementVisible('.sharelogo.js-share')
    await client.click('.sharelogo.js-share')
})

Then('the popup should show', async function () {
    await client.waitForElementVisible('.qzone')
    // await client.click('.qzone')
    // await client.setContext('NATIVE_APP')
    // await client.useXpath()
    // await client.click('//*[@name="Allow"]')
    // await client.contexts(function(result) {
    //     client.setContext(result.value[result.value.length - 1])
    //     client.useCss()
    // })
})