let url = 'http://kioskkoboo.aspos.nl/home'
let sportCommands = {
    verify_category_number: function(number) {
        this.api.elements('css selector','.cms-section a', function(result){
            this.assert.equal(result.value.length, number)
        })
        return this
    },
    homepage_verify: function() {
        this.assert.urlEquals(url)
        return this
    },
    press_enter: function(){
        this.api.keys(this.api.Keys.ENTER)
        return this
    }
};
  
module.exports = {
    // url: 'http://kiosk_vue_11.localkooboo.com/standby',
    // url: 'http://kioskkoboo.aspos.nl/?storecode=M899',
    url: 'http://aktiesport.buychina.site/standby',
    sections: {
        loading: {
            selector: '#loading',
            elements: {
                loadingIcon: {
                    selector: '.loading-icon'
                }
            }
        },
        header: {
            selector: '#header-view',
            elements: {
                logo: {
                    selector: '#header-logo'
                },
                storeLabel: {
                    selector: '#header-store'
                }
            },
            sections:  {
                cart: {
                    selector: '.header-button',
                    elements: {
                        cartIcon: {
                            selector: '.header-button-icon-cart'
                        },
                        cartNumber: {
                            selector: '.header-button-count'
                        },
                        cartPrice: {
                            selector: '.header-button-title'
                        }
                    }
                }
            }
        },
        category: {
            selector: '.cms-section',
            elements: {
                damesClothes: {
                    selector: 'div:nth-child(1) > a:nth-child(1) > div > img'
                },
                herenClothes: {
                    selector: 'div:nth-child(1) > a:nth-child(2) > div > img'
                },
                kidClothes: {
                    selector: 'div:nth-child(1) > a:nth-child(3) > div > img'
                },
                all: {
                    selector: 'div:nth-child(2) > a:nth-child(1) > div > img'
                }
            },
            
        }
    },
    commands: [sportCommands]
}