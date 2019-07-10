@sohu
Feature: Facebook homepage

Scenario: Facebook login

  Given I open Facebook's homepage
  Then the title is "Facebook - Log In or Sign Up"
  And the Facebook login form exists