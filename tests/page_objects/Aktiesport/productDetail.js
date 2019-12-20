var sportCommands = {
    clickUntilGone: (client, selector) =>{
        client.page.productList().getCssProperty(selector, 'display', result => {
            if(result.value === 'none'){
               return this
            }else{
                client.page.productList().click(selector)
                sportCommands.clickUntilGone(client, selector)
            }
        })
    }
};
  
module.exports = {
    elements: {
        sliderArrowNext: {
            selector: '#header-navigation-next'
        },
        detailPage: {
            selector: '#product-detail'
        },
        closeBtn: {
            selector: '#product-detail-navigation-close-icon'
        }
    },
    sections: {
        thumbnails: {
            selector: '.lSGallery',
            elements: {
                firstThumb: {
                    selector: '.lSGallery li:first-child img'
                },
                lastThumb: {
                    selector: '.lSGallery li:last-child img'
                }
            }
        },
        productPic: {
            selector: '.lSSlideWrapper',
            elements: {
                currentPic: {
                    selector: '.lslide.active img'
                }
            }
        },
        productHedaer: {
            selector: '#product-detail-header-content-wrapper',
            elements: {
                title: {
                    selector: '#product-detail-header-content-title'
                },
                price: {
                    selector: '.btw-incl'
                }
            }
            
        },
        productTabs: {
            selector: '#product-detail-header-content-tabs',
            elements: {
                descriptionTab: {
                    selector: 'a[href="#description"]'
                },
                informationTab: {
                    selector: 'a[href="#productInfo"]'
                },
                alternativeTab: {
                    selector: 'a[href="#alternative-products"]'
                },
                mapTab: {
                    selector: 'a[href="#availability-map"]'
                },
            }
        },
        productDescription: {
            selector: '#product-detail-header-tab-content',
            elements: {
                description: {
                    selector: '#description'
                }
            }
        },
        productInformation: {
            selector: '#productInfo',
            elements: {
                information: {
                    selector: 'ul'
                }
            }
        },
        alternativeProducts: {
            selector: '#alternative-products',
            elements: {
                firstAlternativeProductImage: {
                    selector: '.section-tab-content-alternative-products .product:first-child img'
                },
                firstAlternativeProductTitle: {
                    selector: '.section-tab-content-alternative-products .product:first-child .product-title'
                },
                firstAlternativeProductPrice: {
                    selector: '.section-tab-content-alternative-products .product:first-child .btw-incl'
                },
            }
        }
    },
    commands: [sportCommands]
}