var sportCommands = {
    formatNumber: (number) => {
        let result
        if(number.indexOf(',') > -1){
            result = parseInt(number.replace(',','.'))
        }else{
            result = parseInt(number.replace('.',''))
        }
        return result
    },

    press_enter: () => {
        this.api.keys(this.api.Keys.ENTER)
        return this
    },

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
        sliderArrowPrev: {
            selector: '#header-navigation-prev'
        },
        filterNavigationNext: {
            selector: '.filter-navigation-right'
        },
        filterNavigationPrev: {
            selector: '.filter-navigation-left'
        },
        lastCategoryScrollDownBtn: {
            selector: '#filter-category-list > li:last-child .filter-item-list-scroll-down .icon'
        },
        lastCategoryScrollUpBtn: {
            selector: '#filter-category-list > li:last-child .filter-item-list-scroll-up .icon'
        },
        nextPageBtn: {
            selector: '#next-button',
        },
        prevPageBtn: {
            selector: '#prev-button',
        }
    },
    sections: {
        breadcrumb: {
            selector: '#header-breadcrumb',
            elements: {
                homeBtn: {
                    selector: '#header-breadcrumb-home'
                },
                searchBox: {
                    selector: '#header-breadcrumb-search-input'
                },
                searchBtn: {
                    selector: '#header-breadcrumb-search-submit'
                },
                theLastButOneLinkName: {
                    selector: '#header-breadcrumb-wrapper a:last-of-type .header-breadcrumb-link-text'
                },
                theLastButOneLinkNumber: {
                    selector: '#header-breadcrumb-wrapper a:last-of-type .header-breadcrumb-link-count'
                },
                theLastLink: {
                    selector: '#header-breadcrumb-wrapper div'
                },
                theLastLinkNumber: {
                    selector: '#header-breadcrumb-wrapper div .header-breadcrumb-link-count'
                }
            }
        },
        slider: {
            selector: '#header-navigation-slider',
            elements: {
                lastNode: {
                    selector: '#header-navigation-slider-content .header-navigation-node:last-child'
                },
                firstNode: {
                    selector: '#header-navigation-slider-content .header-navigation-node:first-child'
                },
                firstNodeTitle: {
                    selector: '#header-navigation-slider-content .header-navigation-node:first-child .header-navigation-node-title'
                },
                firstNodeNumber: {
                    selector: '#header-navigation-slider-content .header-navigation-node:first-child .header-navigation-node-count'
                }
            }
        },
        headFilter: {
            selector: '#header-filter',
            elements: {
                title: {
                    selector: '#header-filter-title'
                },
                lastFilterButton: {
                    selector: '#filter-active div:last-child'
                }
            },
            
        },
        filterList: {
            selector: '.filter-scroll-window',
            elements: {
                lastCategoryTitle: {
                    selector: '#filter-category-list > li:last-child .filter-item-header'
                },
                lastCategoryItem: {
                    selector: '#filter-category-list > li:last-child .filter-item-list > li:last-child > label'
                },
                lastCategoryItemNumber: {
                    selector: '#filter-category-list > li:last-child .filter-item-list > li:last-child .count'
                },
                lastCategoryShowMoreBtn: {
                    selector: '#filter-category-list > li:last-child .filter-item-list .filter-show-more'
                }
            }
        },
        productList: {
            selector: '#products',
            elements: {
                firstProductImage: {
                    selector: '.product:first-child img'
                },
                firstProductListPrice: {
                    selector: '.product:first-child .strikethrough'
                },
                firstProductIncTaxPrice: {
                    selector: '.product:first-child .price-to'
                },
                firstProductPrice: {
                    selector: '.product:first-child .btw-incl'
                },
                firstProductTitle: {
                    selector: '.product:first-child .product-title'
                },
                lastProductImage: {
                    selector: '.product:last-child img'
                },
                lastProductListPrice: {
                    selector: '.product:last-child .strikethrough'
                },
                lastProductIncTaxPrice: {
                    selector: '.product:last-child .price-to'
                },
                lastProductTitle: {
                    selector: '.product:last-child .product-title'
                }
            }
        }
    },
    commands: [sportCommands]
}