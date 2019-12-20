const { client } = require('nightwatch-api')
const { Then, When } = require('cucumber')
let silderNodeName,silderNodeNumber,lastBreadcrumbLinkNumber,filterNumber,lastFilterName,firstProductTitle,pl = client.page.productList()

Then('the home button show', async () => {
    await pl.section.breadcrumb.waitForElementPresent('@homeBtn')
});

When('click the home button', async () => {
    await pl.section.productList.expect.element('@lastProductTitle').to.be.present
    await pl.section.breadcrumb.click('@homeBtn')
});

Then('return to homepage', async () => {
    await client.page.homepage().homepage_verify()
});

Then('the breadcrumb link name show', async () => {
    await pl.section.breadcrumb.expect.element('@theLastLink').text.to.match(/.+ \d+/)
    await pl.section.breadcrumb.waitForElementPresent('@theLastLinkNumber')
});

Then('the breadcrumb link number show', async () => {
    await pl.section.breadcrumb.expect.element('@theLastLink').text.to.match(/.+ \d+/)
    await pl.section.breadcrumb.getText('@theLastLinkNumber', result => {
        lastBreadcrumbLinkNumber = result.value
        console.log(pl.formatNumber(result.value))
    })
});

Then('the slider node show', async () => {
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.slider.expect.element('@firstNodeTitle').to.be.present
    await pl.section.slider.expect.element('@firstNodeNumber').to.be.present
});

When('click the node', async () => {
    await pl.section.productList.expect.element('@lastProductTitle').to.be.present
    await pl.section.slider.getText('@firstNodeTitle', result => {
        silderNodeName = result.value
    })
    await pl.section.slider.getText('@firstNodeNumber', result => {
        silderNodeNumber = result.value
    })
    await pl.section.slider.click('@firstNode')
});

Then('the breadcrumb will increase', async () => {
    await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.breadcrumb.waitForElementPresent('@theLastLink')
    await pl.section.breadcrumb.waitForElementPresent('@theLastLinkNumber')
    await pl.section.breadcrumb.expect.element('@theLastLink').text.to.contain(silderNodeName)
    await pl.section.breadcrumb.expect.element('@theLastLinkNumber').text.to.equal(silderNodeNumber)
    await pl.waitForElementVisible('@sliderArrowNext')
    await pl.click('@sliderArrowNext')
    await pl.waitForElementVisible('@sliderArrowPrev')
    await pl.click('@sliderArrowPrev')
});

Then('the filter title show', async () => {
    await pl.section.productList.waitForElementVisible('@lastProductTitle')
    await pl.section.headFilter.expect.element('@title').text.to.contain(lastBreadcrumbLinkNumber)
});

When('choose the filter item', async () => {
    await pl.section.headFilter.click('@title')
    await pl.waitForElementVisible('@filterNavigationNext')
    await pl.clickUntilGone(client,'@filterNavigationNext')
    await pl.section.filterList.waitForElementVisible('@lastCategoryTitle')
    await pl.expect.element('@filterNavigationNext').to.have.css('display').which.equals('none')
    await pl.waitForElementVisible('@filterNavigationPrev')
    await pl.section.filterList.waitForElementVisible('@lastCategoryShowMoreBtn')
    await pl.section.filterList.click('@lastCategoryShowMoreBtn')
    await pl.section.filterList.waitForElementNotPresent('@lastCategoryShowMoreBtn')
    await pl.waitForElementPresent('@lastCategoryScrollDownBtn')
    await pl.clickUntilGone(client,'@lastCategoryScrollDownBtn')
    await pl.section.filterList.waitForElementVisible('@lastCategoryItem')
    await pl.section.filterList.waitForElementVisible('@lastCategoryItemNumber')
    await pl.section.filterList.getText('@lastCategoryTitle', result => {lastFilterName = result.value})
    await pl.section.filterList.getText('@lastCategoryItemNumber', result => {filterNumber = result.value})
    await pl.section.filterList.click('@lastCategoryItem')
});

Then('the filter title will increase', async () => {
    await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.headFilter.expect.element('@lastFilterButton').text.to.contain(lastFilterName)
    await pl.section.headFilter.expect.element('@title').text.to.contain(filterNumber)
    await pl.expect.element('@nextPageBtn').to.have.css('display').which.equals('none')
    await pl.expect.element('@prevPageBtn').to.have.css('display').which.equals('none')
});

Then('the product pic show', async () => {
    await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.productList.waitForElementPresent('@firstProductImage')
    await pl.section.productList.waitForElementPresent('@lastProductImage')
});

Then('the product title show', async () => {
    await pl.section.productList.waitForElementPresent('@firstProductTitle')
    await pl.section.productList.getText('@firstProductTitle', result => {firstProductTitle = result.value})
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
});

Then('the product list price show', async () => {
    await pl.section.productList.waitForElementPresent('@firstProductListPrice')
});

Then('the product price include tax show', async () => {
    await pl.section.productList.waitForElementPresent('@firstProductIncTaxPrice')
});

Then('the product navigation button show', async () => {
    await pl.waitForElementVisible('@nextPageBtn')
    await pl.click('@nextPageBtn')
    await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.productList.expect.element('@firstProductTitle').text.to.not.equal(firstProductTitle)
    await pl.waitForElementVisible('@prevPageBtn')
    await pl.click('@prevPageBtn')
});

Then('the search box show', async () => {
    await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.breadcrumb.waitForElementPresent('@searchBox')
});

Then('the search button show', async () => {
    await pl.section.breadcrumb.waitForElementPresent('@searchBtn')
});

When('input search keyword {string}', async (keywords) => {
    await pl.section.breadcrumb.setValue('@searchBox', keywords)
});

Then('the search result show', async () => {
    await client.pause(1000)
    await client.countElementNumber('#products .product', pnum => {
        pl.section.headFilter.getText('@title', result => {
            client.assert.equal(parseInt(result.value.split(' ')[1]), pnum.value)
        })
    })
});

When('click the search button', async () => {
    await pl.section.breadcrumb.click('@searchBtn')
    await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.waitForElementVisible('@sliderArrowNext')
    await pl.section.productList.waitForElementNotPresent('@lastProductImage')
    await pl.section.productList.waitForElementVisible('@lastProductImage')
});

