@google
Feature: Google Search
  @desktop
  Scenario: Open Google to search in laptop

    Given I open Google's search page
    Then the title is "Google"
    And the Google search form exists
    And the link count should be correct

    Given search "nightwatch" in search box
    When press the enter in keyboard
    Then the "nightwatch" search result show correct
  
  @mobile
  Scenario: Open Google to search in mobile phone

    Given I open Google's search page
    Then the title is "Google"
    And the Google search form exists
    And the link count should be correct

    Given search "nightwatch" in search box
    When click the search button
    Then the "nightwatch" search result show correct