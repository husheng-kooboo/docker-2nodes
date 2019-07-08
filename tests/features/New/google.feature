@google
Feature: Google Search

Scenario: Searching Google

  Given I open Sohu's search page
  Then the title is "搜狐"
  And the Sohu search form exists

  Given I open Google's search page
  Then the title is "Google"
  And the Google search form exists
  And the link count should be 21