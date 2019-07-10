@google
Feature: Google Search

  Scenario: Open Google

    Given I open Google's search page
    Then the title is "Google"
    And the Google search form exists
    And the link count should be correct

    Given search "nightwatch" in search box
    When click the search button
    Then the "nightwatch" search result show correct