const { client } = require('nightwatch-api')
const { Given, Then, When } = require('cucumber')

Given(/^I open Baidu's search page$/, async () => {
  await client.url('https://www.baidu.com')
  await client.waitForElementVisible('#form',60000)
});

Then(/^the title is "([^"]*)"$/, async title => {
  await client.assert.title(title)
});

Then(/^the Baidu search form exists$/, {timeout: 600*1000}, async () => {
  await client.expect.element('#form').to.be.present
  await client.expect.element('#u1').to.be.present
  await client.expect.element('#u1').text.to.contain('新闻')
  await client.expect.element('#u1').to.have.css('display').which.equals('block')
  await client.expect.element('#u1').text.startWith('新闻')
  await client.expect.element('#u1').text.endWith('更多产品')
  await client.expect.element('#u1 > a:nth-child(1)').text.equal('新闻')
  await client.expect.element('#u1 > a:nth-child(1)').text.to.not.equal('123')
  await client.expect.element('#u1 > a:nth-child(1)').text.to.not.contain('456')
  await client.expect.element('#u1 > a:nth-child(1)').to.have.css('display').which.does.not.equal('in-line')
  await client.expect.element('#u1 > a:nth-child(1)').to.have.css('display').which.equals('block')
  await client.getCookies(function(res){
    console.log(res)
  })
  await client.expect.cookie('delPer').to.contain('0')
  await client.expect.cookie('BD_HOME', 'www.baidu.com').to.contain('0')
  await client.expect.element('#u1').to.be.an('div')
  await client.expect.element('#u1').to.be.not.active
  await client.expect.element('#kw').to.be.active.before()
  await client.expect.element('#kw').to.have.attribute('name')
  await client.expect.element('#kw').to.not.have.attribute('nihao')
  await client.expect.element('#kw').to.have.attribute('name').equals('wd')
  await client.expect.element('#kw').to.have.attribute('name').which.equals('wd')
  await client.expect.element('#kw').to.have.attribute('name').contains('d')
  await client.expect.element('#kw').to.be.enabled
  await client.expect.element('#u1').to.be.present
  await client.expect.element('#kw').to.be.present
  await client.expect.element('#kw').to.be.present
  await client.expect.element('#wrapper').to.be.present
  await client.expect.element('.setup_storeSug').to.be.not.present
  await client.expect.element('a[name="tj_login"]').to.be.present.before()
  await client.waitForElementVisible('#u1 > a:nth-child(7)')
  await client.click('#u1 > a:nth-child(7)')
  // await client.waitForElementPresent('.tang-pass-footerBarULogin')
  await client.expect.element('#TANGRAM__PSP_4__foreground').to.be.present
  await client.click('.tang-pass-footerBar > p:nth-child(2)')
  await client.expect.element('input[name="memberPass"]').to.be.selected
  await client.click('.close-btn')
  await client.setValue('#kw', '1234')
  await client.expect.element('#kw').to.have.value.that.equals('1234')
  await client.clearValue('#kw')
  await client.expect.element('#kw').to.be.visible
  await client.expect.elements('a').count.to.equal(45)
  await client.expect.title().to.equal('百度一下，你就知道')
  await client.expect.url().to.contain('https://www.baidu.com')
  await client.assert.attributeContains('#kw', 'name', 'wd')
  await client.assert.elementNotPresent(".should_not_exist")
  await client.assert.cssClassNotPresent("#kw", "container");
  await client.element('css selector', 'a', function(res){
    console.log(res)
  })
  await client.elements('css selector', 'a', function(res){
    client.elementIdEquals(res.value[1].ELEMENT, res.value[2].ELEMENT, function(res){
      console.log(res.value)
    })
  })
  await client.element('css selector', '#kw', function(res){
    console.log(res)
  })
  await client.element('css selector', '#u', function(res){
    console.log(res)
    // client.elementIdElement(res.value.ELEMENT, 'css selector', '#u > a:nth-child(2)', function(res1){
    client.elementIdElement(res.value.ELEMENT, 'link text', '设置', function(res1){
      client.elementIdText(res1.value.ELEMENT,function(res2){
        console.log(res2)
      })
      client.elementIdName(res1.value.ELEMENT,function(res2){
        console.log(res2)
      })
      client.elementIdLocation(res1.value.ELEMENT,function(res2){
        console.log(res2)
      })
      client.elementIdDisplayed(res1.value.ELEMENT,function(res2){
        console.log(res2)
      })
      client.elementIdClick(res1.value.ELEMENT,function(res2){
        console.log('click!')
      })
    })
  })
  await client.elementActive(function(res){
    client.elementIdText(res.value.ELEMENT,function(res2){
      console.log(res2)
    })
  })
  await client.setValue('#kw', 'Nightwatch')
  await client.click('#su')
  // await client.pause(10000)
  // await console.log(client.page.resultPage().section.search_result.getResultById(1).elements)
  // let sec = client.page.resultPage().section.search_result.getResultById(2)
  // await client.getText(sec.selector, function(res){
  //   console.log(res.value)
  // })
  // await client.pause(10000)
  // await console.log(sec.selector)
  // await sec.getText('@description', function(res){
  //   console.log(res.value)
  // })
  // await sec.expect.element('@description').to.be.visible
  // await console.log(sec.elements.title.selector)
  // await client.getText(sec.selector + ' ' + sec.elements.title.selector, function(res){
  //   console.log(res.value)
  // })
  for(var i = 1;i <= 10;i++){
    let sec = client.page.resultPage().section.search_result.getResultById(i)
    await client.getText(sec.selector, function(res){
      console.log(res.value)
    })
    await sec.click('@title')
    await client.pause(1000)
    await client.windowHandles(function(res){
      client.switchWindow(res.value[res.value.length - 1])
      client.closeWindow()
      client.switchWindow(res.value[0]);
    })
  }
  // await sec.getText('@title', function(res){
  //   console.log(res.value)
  // })
})