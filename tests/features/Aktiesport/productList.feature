@productList
Feature: Check product list
    Check the product list

    Background:
        Given open the homepage
        And click the heren collectie category
    
    Scenario: Home icon verify
        Then the home button show
        When click the home button
        Then return to homepage

    Scenario: Breadcrumb link verify
        Then the breadcrumb link name show
        And the breadcrumb link number show
    
    Scenario: Slider verify
        Then the slider node show
        When click the node
        Then the breadcrumb will increase
    
    Scenario: Filter verify
        Then the breadcrumb link number show
        And the filter title show
        When choose the filter item
        Then the filter title will increase

    Scenario: Product list verify
        Then the product pic show
        And the product title show
        And the product list price show
        And the product price include tax show
        And the product navigation button show

    Scenario: Search product verify
        Then the search box show
        And the search button show
        When input search keyword 'LOLITA'
        And click the search button
        Then the search result show