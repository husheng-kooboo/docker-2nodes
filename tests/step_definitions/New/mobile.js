const { client } = require('nightwatch-api')
const { Given, Then, When} = require('cucumber')

Given('open mobile 163 news', async function () {
    await client.url('https://3g.163.com/news/article/EJN99AOF000189FH.html?clickfrom=index2018_news_newslist#offset=0')
})

When('choose share by QQ', async function () {
    await client.waitForElementVisible('.sharelogo')
    await client.click('.sharelogo')
})

Then('the popup should show', async function () {
    await client.waitForElementVisible('.qzone')
    await client.click('.qzone')
    await client.setContext('NATIVE_APP')
    await client.useXpath()
    await client.click('//*[@name="Allow"]')
    await client.contexts(function(result) {
        client.setContext(result.value[result.value.length - 1])
        client.useCss()
    })
})