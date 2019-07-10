@mobile_pop
Feature: Mobile popup test

  Scenario: Mobile popup test
    Given open mobile 163 news
    When choose share by QQ
    Then the popup should show