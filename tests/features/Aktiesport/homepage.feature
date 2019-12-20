@home
Feature: Check homepage
    Check the home page elements

    Background:
        Given open the homepage

    Scenario: Site logo verify
        Then the site logo show

    Scenario: cart icon verify
        Then the cart icon show

    Scenario: store label verify
        Then the store label is 'M899 Perrysport Testwinkel'

    Scenario: product category verify
        Then the product category show

