const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

Given('open the homepage', async () => {
    await client.page.homepage().navigate()
    await client.maximizeWindow()
});

Given('click the heren collectie category', async () => {
    await client.page.homepage().section.category.click('@herenClothes')
});

Given('click the dames collectie category', async () => {
    await client.page.homepage().section.category.click('@damesClothes')
});

Then('the site logo show', async () => {
    await client.page.homepage().section.header.waitForElementPresent('@logo')
});

Then('the store label is {string}', async label => {
    await client.page.homepage().section.header.expect.element('@storeLabel').text.equal(label)
});

Then('the cart icon show', async () => {
    await client.page.homepage().section.header.section.cart.waitForElementPresent('@cartIcon')
    await client.page.homepage().section.header.section.cart.waitForElementPresent('@cartNumber')
});

Then('the product category show', async () => {
    await client.page.homepage().verify_category_number(10)
});