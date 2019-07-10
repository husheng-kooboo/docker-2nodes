@sohu
Feature: Facebook homepage

Scenario: Facebook login

  Given I open Facebook's homepage
  Then the title is "Facebook - Log In or Sign Up11"
  And the Facebook login form exists