@productDetail
Feature: Check product detail
    Check the product detail

    Background:
        Given open the homepage
        And click the heren collectie category
        Then the search box show
        And the search button show
        When input search keyword 'BOXER BASIC'
        And click the search button
        And click the filter button
        And choose the filter item 'jeans blue'
        And click the first product in the list
        Then the detail page show
    
    Scenario: Return button verify
        When click the Terug button
        Then the detail page closed

    Scenario: product pic show
        Then the thumbnail show
        When click the thumbnail
        Then the product pic change correct
    
    Scenario: Verify product title and price
        Then the product title is correct
        And the product price is correct

    Scenario: Product description verify
        When click the description tab
        Then the product description show

    Scenario: Product information verify
        When click the information tab
        And the product information show

    @plist1
    Scenario: Product alternative verify
        When click the alternative tab
        Then the alternative products show