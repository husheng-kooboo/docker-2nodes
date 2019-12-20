const { client } = require('nightwatch-api')
const { Then, When } = require('cucumber')
let productTitle, productPrice, productUrl, pl = client.page.productList(), pd = client.page.productDetail(), hp = client.page.homepage()
 
When('click the first product in the list', async () => {
    await pl.section.productList.waitForElementVisible('@lastProductImage')
    await pl.section.productList.waitForElementVisible('@firstProductImage')
    await pl.section.productList.getText('@firstProductPrice', result => {
        productPrice = result.value
    })
    await pl.section.productList.getText('@firstProductTitle', result => {
        productTitle = result.value
    })
    await pl.section.productList.click('@firstProductImage')
});

Then('the detail page show', async () => {
    await hp.section.loading.waitForElementNotVisible('@loadingIcon')
    await pd.waitForElementVisible('@detailPage')
    await pd.expect.element('@detailPage').to.have.css('display').which.equals('block')
});

When('click the Terug button', async () => {
    await pd.waitForElementVisible('@closeBtn')
    await pd.click('@closeBtn')
});

Then('the detail page closed', async () => {
    await pd.waitForElementNotPresent('@detailPage')
});

Then('the thumbnail show', async () => {
    await pd.section.thumbnails.waitForElementVisible('@firstThumb')
    await pd.section.thumbnails.waitForElementVisible('@lastThumb')
});

When('click the thumbnail', async () => {
    await pd.section.thumbnails.click('@firstThumb')
    await pd.section.thumbnails.getElementProperty('@firstThumb','src', result => {
        productUrl = result.value
    })
});

Then('the product pic change correct', async () => {
    await pd.section.productPic.waitForElementVisible('@currentPic')
    await pd.section.productPic.expect.element('@currentPic').to.have.attribute('src').equals(productUrl)
});

Then('the product title is correct', async () => {
    await pd.section.productHedaer.waitForElementVisible('@title')
    await pd.section.productHedaer.expect.element('@title').text.to.contain(productTitle)
});

Then('the product price is correct', async () => {
    await pd.section.productHedaer.waitForElementVisible('@price')
    await pd.section.productHedaer.expect.element('@price').text.to.contain(productPrice)
});

Then('the product description show', async () => {
    await pd.section.productDescription.waitForElementVisible('@description')
    await pd.section.productDescription.expect.element('@description').text.to.match(/.+/);
});

When('click the description tab', async () => {
    await pd.section.productTabs.waitForElementVisible('@descriptionTab')
    await pd.section.productTabs.click('@descriptionTab')
});

Then('the product information show', async () => {
    await pd.section.productInformation.waitForElementVisible('@information')
    await pd.section.productInformation.expect.element('@information').text.to.contain('Scan code')
    await pd.section.productInformation.expect.element('@information').text.to.contain('Merk')
    await pd.section.productInformation.expect.element('@information').text.to.contain('Groep')
    await pd.section.productInformation.expect.element('@information').text.to.contain('Categorieën')
    await pd.section.productInformation.expect.element('@information').text.to.contain('Product Nummer')
});

When('click the information tab', async () => {
    await pd.section.productTabs.waitForElementVisible('@informationTab')
    await pd.section.productTabs.click('@informationTab')
});

Then('the alternative products show', async () => {

});

When('click the alternative tab', async () => {
    await pd.section.productTabs.waitForElementVisible('@alternativeTab')
    await pd.section.productTabs.click('@alternativeTab')
});

When('click the filter button', async () => {
    await pl.section.headFilter.waitForElementVisible('@title')
    await pl.section.headFilter.click('@title')
});

When('choose the filter item {string}', async itemName => {
    await client.elements('css selector', '#filter-category-list > li  li label', result => {
        result.value.forEach((element) => {
            client.elementIdText(element.ELEMENT, text => {
                if(text.value.indexOf(itemName) > -1){
                    console.log('hahah')
                    client.elementIdClick(element.ELEMENT)
                }
            })
        })
    })
});