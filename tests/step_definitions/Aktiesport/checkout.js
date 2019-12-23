const registerInfos = require('../../data/registerPageData')
const { client } = require('nightwatch-api')
const { Then } = require('cucumber')
let title,price,brand,size,cartPrice,orderNumber,email,firstName,productQuantity = 10,productTypeQuantity,products = [],pl = client.page.productList(),home = client.page.homepage()

accountInfoValidateFun = (fieldSelector, fieldValue, validationInfoSelector, validationInfo) => {
    client.setValue(fieldSelector, 'test1234')
    client.click('.create-account h2')
    client.expect.element(validationInfoSelector).text.to.equal(validationInfo)
    client.clearValue(fieldSelector)
    client.setValue(fieldSelector, fieldValue)
    client.click('.create-account h2')
    client.expect.element(validationInfoSelector).to.not.be.present.after()
    return this
}

Then('add product into cart', async () => {
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await pl.section.productList.waitForElementPresent('@lastProductTitle')
    await pl.section.productList.waitForElementPresent('@firstProductImage')
    for(let i = 0;i < 1;i++){
        await client.elements('css selector', '#products .product', result => {
            element = result.value[0]
            // result.value.forEach((element) => {
                client.elementIdDisplayed(element.ELEMENT)
                client.elementIdElement(element.ELEMENT, 'css selector', '.product-title', result1 => {
                    client.elementIdText(result1.value.ELEMENT, result2 => {
                        title = result2.value
                    })
                })
                client.elementIdElement(element.ELEMENT, 'css selector', '.btw-incl', result1 => {
                    client.elementIdText(result1.value.ELEMENT, result2 => {
                        price = result2.value.replace(/[\r\n\s]/g,"")
                    })
                })
                client.elementIdClick(element.ELEMENT)
                client.waitForElementVisible('.matrix-options')
                client.elements('css selector', '#product-detail-header-content-tabs .tab-links li', result1 => {
                    result1.value.forEach((element1) => {
                        client.elementIdText(element1.ELEMENT, result2 => {
                            if(result2.value === 'Informatie'){
                                client.elementIdClick(element1.ELEMENT)
                            }
                        })
                    })
                })
                client.element('css selector', '#productInfo .tab-links li:nth-child(2) span:nth-child(2)', result1 => {
                    client.elementIdText(result1.value.ELEMENT, result2 => {
                        brand = result2.value
                    })
                })
                client.elements('css selector', '.matrix-options .matrix-option-available', result1 => {
                    if(result1.value.length >= 1){
                        client.elementIdText(result1.value[0].ELEMENT, result2 => {
                            size = result2.value
                        })
                        client.elementIdClick(result1.value[0].ELEMENT)
                        home.section.loading.waitForElementNotVisible('@loadingIcon')
                        client.perform((done) => {
                            client.expect.element('#product-detail-header-content-title').text.to.startWith(`${brand}`)
                            client.expect.element('#product-detail-header-content-title').text.to.endWith(`${size}`)
                            client.getText('#product-detail-header-content-title', result => {
                                title = result.value
                            })
                            client.getText('#product-detail-header-content-wrapper .btw-incl', result => {
                                client.assert.equal(result.value.replace(/(Van)|[\r\n\s]/g,""), price.replace(/[\r\n\s]/g,""), 'The product price should be same.')
                            })
                            done()
                        })
                        for(let i = 1;i < productQuantity;i++){
                            client.click('#product-detail-navigation-quantity-add')
                        }
                        client.expect.element('#product-detail-navigation-quantity').text.to.equal(productQuantity+'')
                        client.click('#product-detail-navigation-order-title')
                        home.section.loading.waitForElementNotVisible('@loadingIcon')
                        
                    }else{
                        client.click('#product-detail-navigation-close-title')
                    }
                })
                client.perform((done) => {
                    products.push({'title':title,'price':price,'brand':brand,'quantity':productQuantity,'size':size})
                    productTypeQuantity++
                    console.log(products)
                    done()
                })
            // })
        })
        await pl.click('@nextPageBtn')
        await client.page.homepage().section.loading.waitForElementNotVisible('@loadingIcon')
        console.log()
    }
    await home.section.header.section.cart.waitForElementVisible('@cartPrice')
    await home.section.header.section.cart.getText('@cartPrice', result => {
        cartPrice = result.value
    })
});

Then('open cart to click check out button', async () => {
    await home.section.header.section.cart.click('@cartPrice')
    await client.waitForElementVisible('.cart-line-total-price')
    await client.expect.element('.cart-line-total-price').text.to.equal(cartPrice)
    await client.elements('css selector', '.cart-popup .cart-popup-line', result => {
        result.value.map((item,index) => {
            client.elementIdElement(item.ELEMENT, 'css selector', '.cart-line-price', result1 => {
                client.elementIdText(result1.value.ELEMENT, result2 => {
                    client.assert.equal(result2.value.replace(/[\r\n\s]/g,""), products[index].price.replace(/[\r\n\s]/g,""), `The product price should be same,${result2.value} = ${products[index].price}`)
                })
            })
            client.elementIdElement(item.ELEMENT, 'css selector', '.cart-line-description', result1 => {
                client.elementIdText(result1.value.ELEMENT, result2 => {
                    client.assert.equal(result2.value.replace(/[\r\n\s]/g,""),`${productQuantity}x${products[index].title}`.replace(/[\r\n\s]/g,""), `The product quantity, title and size should be same,${result2.value.replace(/[\r\n\s]/g,"")} = ${productQuantity}x${products[index].title}`)
                })
            })
        })
    })
    if(productTypeQuantity > 5){
        await client.expect.element('.cart-line-product-count').text.to.equal(`En nog ${productTypeQuantity - 5} product.`)
    }
    await client.waitForElementVisible('.popup-button-edit')
    await client.click('.popup-button-edit')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.elements('css selector', '.cart-products .cart-product', result => {
        result.value.map((item,index) => {
            client.elementIdElement(item.ELEMENT, 'css selector', '.cart-product-information', result1 => {
                client.elementIdText(result1.value.ELEMENT, result2 => {
                    client.assert.equal(result2.value, products[index].title, `The product title should be same,${result2.value} = ${products[index].title}`)
                })
            })
            client.elementIdElement(item.ELEMENT, 'css selector', '.cart-quantity .cart-label', result1 => {
                client.elementIdText(result1.value.ELEMENT, result2 => {
                    client.assert.equal(parseInt(result2.value), products[index].quantity, `The product quantity should be same,${result2.value} = ${products[index].quantity}`)
                })
            })
            client.elementIdElement(item.ELEMENT, 'css selector', '.cart-product-price', result1 => {
                client.elementIdText(result1.value.ELEMENT, result2 => {
                    client.assert.equal(result2.value.replace(/(Prijs:)|[\r\n\s]/g,""), products[index].price, `The product price should be same,${result2.value} = ${products[index].price}`)
                })
            })
        })
    })
    await client.waitForElementVisible('.cart-checkout-price .btw-incl')
    await client.expect.element('.cart-checkout-price .btw-incl').text.to.equal(cartPrice)
    await client.waitForElementVisible('a[href="/checkout"]')
    await client.click('a[href="/checkout"]')
});

Then('choose the login account option', async () => {
    await client.waitForElementVisible('form[action="/oldAccount"] button')
    await client.click('form[action="/oldAccount"] button')
});

Then('choose the anonymous option', async () => {
    await client.waitForElementVisible('form[action="/anonymousAccount"] button')
    await client.click('form[action="/anonymousAccount"] button')
});

Then('choose the regist option', async () => {
    await client.waitForElementVisible('form[action="/newAccount"] button')
    await client.click('form[action="/newAccount"] button')
});

Then('input the user information', async () => {
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.waitForElementVisible('.cart-checkout-bar')
    await client.waitForElementVisible('.checkout-step-active')
    await client.click('.content-wrapper .form-box:nth-child(1) h2')
    await client.waitForElementVisible('.cart-checkout-bar button')
    await client.click('.cart-checkout-bar button')
    await client.expect.element('span[data-valmsg-for="AlternativeAddress.FirstName"]').text.to.equal('Voornaam is een verplicht veld.')
    await client.expect.element('span[data-valmsg-for="AlternativeAddress.LastName"]').text.to.equal('Achternaam is een verplicht veld.')
    await client.expect.element('span[data-valmsg-for="CustomerDetails.Email"]').text.to.equal('E-mailadres is een verplicht veld.')
    await client.expect.element('span[data-valmsg-for="AlternativeAddress.PostalCode"]').text.to.equal('Postcode is een verplicht veld.')
    await client.expect.element('span[data-valmsg-for="AlternativeAddress.HouseNumber"]').text.to.equal('Huisnummer is een verplicht veld.')
    await client.expect.element('.checkout-step-active').text.to.equal('Gegevens')
    await client.setValue('#AlternativeAddress_FirstName', firstName = registerInfos.accountInfo.firstName)
    await client.setValue('#AlternativeAddress_LastName', registerInfos.accountInfo.lastName)
    await client.setValue('#CustomerDetails_Email', registerInfos.registeredAccountInfo.email)
    await client.click('.content-wrapper .form-box:nth-child(1) h2')
    await client.waitForElementVisible('#EmailAddress-error')
    await client.expect.element('#EmailAddress-error').text.to.equal('Er is al een account bekend bij ons met het ingevoerde e-mailadres. Mogelijk gebruik je dit adres al voor je Perrysport-account. Je kunt dit account gebruiken om hier in te loggen.')
    await client.clearValue('#CustomerDetails_Email')
    await client.setValue('#CustomerDetails_Email', email = `test${(new Date()).valueOf()}@test.com`)
    await client.click('.content-wrapper .form-box:nth-child(1) h2')
    await client.setValue('#AlternativeAddress_PostalCode', '1111AB')
    await client.setValue('#AlternativeAddress_HouseNumber', '00')
    await client.click('.content-wrapper .form-box:nth-child(2) h2')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.waitForElementPresent('.field-validation-error')
    await client.expect.element('.field-validation-error').text.to.equal('Geen geldige postcode en huisnummer combinatie')
    await client.expect.element('#AlternativeAddress_StreetName').to.have.value.that.equals('')
    await client.expect.element('#AlternativeAddress_City').to.have.value.that.equals('')
    await client.clearValue('#AlternativeAddress_PostalCode')
    await client.setValue('#AlternativeAddress_PostalCode', registerInfos.accountInfo.postcode)
    await client.clearValue('#AlternativeAddress_HouseNumber')
    await client.setValue('#AlternativeAddress_HouseNumber', registerInfos.accountInfo.houseNum)
    await client.click('.content-wrapper .form-box:nth-child(2) h2')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.expect.element('#AlternativeAddress_StreetName').to.have.value.that.equals(registerInfos.accountInfo.street)
    await client.expect.element('#AlternativeAddress_City').to.have.value.that.equals(registerInfos.accountInfo.city)
    await client.setValue('#AlternativeAddress_HouseNumberExtension', registerInfos.accountInfo.houseNumExtension)
    await client.click('.content-wrapper .form-box:nth-child(2) h2')
    await client.click(`#AlternativeAddress_CountryId option[value=${registerInfos.accountInfo.country}]`)
    await client.click('.cart-checkout-bar button')
});

Then('input the email address', async () => {
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.waitForElementVisible('.login-next .login-next-icon')
    await client.click('.login-next .login-next-icon')
    await client.waitForElementVisible('.text-warning')
    await client.getText('.text-warning', result => {
        client.assert.equal('E-mailadres is een verplicht veld.', result.value)
    })
    await client.waitForElementVisible('#LoginName')
    await client.click('#LoginName')
    await client.setValue('#LoginName', email = registerInfos.registeredAccountInfo.email)
    await client.click('.login-next .login-next-icon')
    await client.click('.login-next .login-next-icon')
});
    
Then('input the password', async () => {
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.waitForElementVisible('.login-bar .login-next-icon')
    await client.click('.login-bar .login-next-icon')
    await client.waitForElementVisible('.text-warning')
    await client.getText('.text-warning', result1 => {
        client.assert.equal('Wachtwoord is een verplicht veld.', result1.value)
    })
    await client.setValue('#Password', registerInfos.registeredAccountInfo.password)
    await client.waitForElementPresent('#login > form.form-horizontal > div.login-bar .login-next-icon')
    await client.click('.login-bar .login-next-icon')
    await client.click('.login-bar .login-next-icon')
});

Then('verify the {string} user information', async (type) => {
    let accountInfo = (type === 'login') ? registerInfos.registeredAccountInfo : registerInfos.accountInfo
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.waitForElementVisible('.cart-checkout-bar')
    await client.waitForElementVisible('.checkout-step-active')
    await client.click('.content-wrapper .form-box:nth-child(1) h2')
    await client.expect.element('.checkout-step-active').text.to.equal('Gegevens')
    await client.expect.element('#AlternativeAddress_FirstName').to.have.value.that.equals(firstName = accountInfo.firstName)
    await client.expect.element('#AlternativeAddress_LastName').to.have.value.that.equals(accountInfo.lastName)
    await client.expect.element('#CustomerDetails_Email').to.have.value.that.equals(accountInfo.email)
    await client.expect.element('#AlternativeAddress_PostalCode').to.have.value.that.equals(accountInfo.postcode)
    await client.expect.element('#AlternativeAddress_HouseNumber').to.have.value.that.equals(accountInfo.houseNum)
    await client.expect.element('#AlternativeAddress_HouseNumberExtension').to.have.value.that.equals(accountInfo.houseNumExtension)
    await client.expect.element('#AlternativeAddress_StreetName').to.have.value.that.equals(accountInfo.street)
    await client.expect.element('#AlternativeAddress_City').to.have.value.that.equals(accountInfo.city)
    await client.expect.element('#AlternativeAddress_CountryId').to.have.value.that.equals(accountInfo.country)
    await client.click('.cart-checkout-bar button')
});
    
Then('choose mail home as the delivery method', async () => {
    await client.waitForElementVisible('.content-wrapper')
    await client.expect.element('.checkout-step-active').text.to.equal('Aflevering')
    await client.click('.content-wrapper .form-content:nth-of-type(2) button')//mail home
});

Then('choose store fetch as the delivery method', async () => {
    await client.waitForElementVisible('.content-wrapper')
    await client.expect.element('.checkout-step-active').text.to.equal('Aflevering')
    await client.click('.content-wrapper .form-content:nth-of-type(1) button')//store fetch
});
    
Then('choose pay now as the payment method', async () => {
    await client.waitForElementVisible('.content-wrapper')
    await client.expect.element('.checkout-step-active').text.to.equal('Betaling')
    await client.click('.content-wrapper .form-content:nth-of-type(2) button')// pay now
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
});

Then('input the user payment information', async () => {
    await client.waitForElementVisible('#BirthDay')
    await client.waitForElementVisible('#Gender')
    await client.waitForElementVisible('#PhoneNumber')
    await client.click('label[for="BirthDay"]')
    await client.waitForElementVisible('.ui-datepicker-close')
    await client.click('.ui-datepicker-close')
    await client.click('#Gender option[value=FEMALE]')
    await client.setValue('#PhoneNumber', '0206247131')
    await client.click('.content-wrapper h2')
    await client.waitForElementVisible('.cart-checkout-bar > button')
    await client.click('.cart-checkout-bar > button')
});
    
Then('return to modify payment info', async () => {
    await client.waitForElementVisible('.amount___LANix')
    await client.expect.element('.amount___LANix').text.to.equal(cartPrice.replace(/\s*/g,""))
    await client.waitForElementVisible('#back-button__text')
    await client.click('#back-button__text')
    await client.waitForElementVisible('.continue-payment-side .table')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.waitForElementVisible('.checkout-prev-next input')
    await client.expect.element('.continue-payment-side h2').text.to.endWith(cartPrice)
    await client.expect.element('.continue-payment-side .table tr:last-child td:last-child').text.to.equal(cartPrice)
    await client.getText('.continue-payment-side .table tr:first-child td:last-child', result => {
        orderNumber = result.value
    })
    await client.waitForElementVisible('.payment-methods input')
    await client.click('.payment-methods input')
    await client.waitForElementVisible('.checkout-prev-next input')
    await client.click('.checkout-prev-next input')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.click('.content-wrapper h2')
    await client.waitForElementVisible('.cart-checkout-bar > button')
    await client.click('.cart-checkout-bar > button')
});
    
Then('check out at payment gateway', async () => {
    await client.waitForElementVisible('.amount___LANix')
    await client.waitForElementVisible('#klarna-hpp-instance-main')
    await client.frame('klarna-hpp-instance-main')
    await client.waitForElementVisible('#klarna-logo')
    await client.frameParent()
    await client.waitForElementVisible('#buy-button')
    await client.click('#buy-button')
});
    
Then('verify the payment order information', async () => {
    await client.waitForElementVisible('.order-button-label')
    await client.expect.element('.order-button-label').text.to.contain(firstName)
    await client.waitForElementVisible('.order-button-text')
    await client.expect.element('.order-button-text').text.to.contain(email)
    await client.expect.element('.order-button-text').text.to.contain(orderNumber)
    await home.section.header.section.cart.expect.element('@cartNumber').text.to.equal('0')
    await client.elements('css selector', '.toggle-single-selector > .toggle-data', result => {
        client.assert.equal(result.value.length, 0, `Verify the account ${email} has logout successfully.`)
        products = []
    })
});

Then('choose pay later as the payment method', async () => {
    await client.waitForElementVisible('.content-wrapper')
    await client.expect.element('.checkout-step-active').text.to.equal('Betaling')
    await client.click('.content-wrapper .form-content:nth-of-type(1) button')// pay later
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
});

Then('verify the order information', async () => {
    await client.waitForElementVisible('.order-button-text')
    await client.expect.element('.order-button-text').text.to.contain(firstName)
    await client.expect.element('.order-button-text').text.to.match(/[\s\S]+ordernummer: (\d+)[\s\S]+/)
    await home.section.header.section.cart.expect.element('@cartNumber').text.to.equal('0')
    await client.elements('css selector', '.toggle-single-selector > .toggle-data', result => {
        client.assert.equal(result.value.length, 0, `Verify the account ${email} has logout successfully.`)
        products = []
    })
});

Then('input the register information', async () => {
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.expect.element('.checkout-step-active').text.to.equal('Registratie')
    await client.waitForElementVisible('.create-account button')
    await client.click('.create-account button')
    await client.expect.element('span[data-valmsg-for="EmailAddress"]').text.to.equal('E-mailadres is een verplicht veld.')
    await client.expect.element('span[data-valmsg-for="Password"]').text.to.equal('Wachtwoord is een verplicht veld.')
    await client.expect.element('span[data-valmsg-for="PasswordRepeat"]').text.to.equal('Wachtwoord bevestigen is een verplicht veld.')
    await client.setValue('#EmailAddress', 'testa7@test.com')
    await client.click('.form-box h2')
    await client.waitForElementVisible('#EmailAddress-error')
    await client.expect.element('#EmailAddress-error').text.to.equal('Er is al een account bekend bij ons met het ingevoerde e-mailadres. Mogelijk gebruik je dit adres al voor je Perrysport-account. Je kunt dit account gebruiken om hier in te loggen.')
    await client.clearValue('#EmailAddress')
    await client.setValue('#EmailAddress', email = `test${(new Date()).valueOf()}@test.com`)
    await client.click('.form-box h2')
    await client.waitForElementNotVisible('#EmailAddress-error')
    await client.setValue('#Password', '123456')
    await client.setValue('#PasswordRepeat', '1234567')
    await client.click('.form-box h2')
    await client.expect.element('span[data-valmsg-for="PasswordRepeat"]').text.to.equal('Wachtwoord werd niet correct herhaald.')
    await client.clearValue('#PasswordRepeat')
    await client.setValue('#PasswordRepeat', '123456')
    await client.waitForElementNotVisible('span[data-valmsg-for="PasswordRepeat"]')
    await client.waitForElementPresent('.create-account button')
    await client.click('.create-account button')
});

Then('input the account information', async () => {
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.expect.element('.checkout-step-active').text.to.equal('Account')
    await client.waitForElementVisible('#TermsAndConditions')
    await client.waitForElementVisible('.create-account button')
    await client.click('.create-account button')
    await client.elements('css selector', '.form-content .text-warning', result => {
        result.value.forEach((item,index) => {
            client.elementIdText(item.ELEMENT, res => {
                client.assert.equal(res.value,registerInfos.validationInfo[index],`The validation information is the same,${res.value} = ${registerInfos.validationInfo[index]}`)
            })
        })
    })
    await client.click(`#AddressViewModel_Gender option[value=${registerInfos.accountInfo.gender}]`)
    accountInfoValidateFun('#AddressViewModel_Firstname', firstName = registerInfos.accountInfo.firstName, '.form-content .text-warning:nth-child(3)', 'Voornaam is ongeldig')
    accountInfoValidateFun('#AddressViewModel_LastName', registerInfos.accountInfo.lastName, '.form-content .text-warning:nth-child(5)', 'Achternaam is ongeldig')
    accountInfoValidateFun('#AddressViewModel_PhoneNumber', registerInfos.accountInfo.telephone, '.form-content .text-warning:nth-child(7)', 'Telefoon is ongeldig')
    await client.setValue('#AddressViewModel_PostalCode', '1000XX')
    await client.setValue('#AddressViewModel_HouseNumber', '00')
    await client.click('.create-account h2')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.expect.element('.form-content .text-warning:nth-child(10)').text.to.equal('Geen geldige postcode en huisnummer combinatie')
    await client.clearValue('#AddressViewModel_HouseNumber')
    await client.setValue('#AddressViewModel_HouseNumber', registerInfos.accountInfo.houseNum)
    await client.click('.create-account h2')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.expect.element('.form-content .text-warning:nth-child(10)').text.to.equal('Geen geldige postcode en huisnummer combinatie')
    await client.clearValue('#AddressViewModel_PostalCode')
    await client.setValue('#AddressViewModel_PostalCode', registerInfos.accountInfo.postcode)
    await client.click('.create-account h2')
    await home.section.loading.waitForElementNotVisible('@loadingIcon')
    await client.expect.element('.form-content .text-warning:nth-child(10)').to.not.be.present.after()
    await client.expect.element('#AddressViewModel_StreetName').to.have.value.that.equals(registerInfos.accountInfo.street)
    await client.expect.element('#AddressViewModel_City').to.have.value.that.equals(registerInfos.accountInfo.city)
    await client.setValue('#AddressViewModel_HouseNumberExtension', registerInfos.accountInfo.houseNumExtension)
    await client.click('.create-account h2')
    await client.click('.login-checkbox-content a')
    await client.expect.element('#popup-ok').to.be.present.after()
    await client.expect.element('#popup-message .order-button-label').text.to.equal('Algemene voorwaarden')
    await client.click('#popup-ok')
    await client.expect.element('#popup-ok').to.not.be.present.after()
    await client.click('#TermsAndConditions')
    await client.click('.create-account button')
});