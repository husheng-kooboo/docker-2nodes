@sohu
Feature: Sohu Search

Scenario: Searching Sohu

  Given I open Sohu's search page
  Then the title is "手机搜狐网"
  And the Sohu search form exists