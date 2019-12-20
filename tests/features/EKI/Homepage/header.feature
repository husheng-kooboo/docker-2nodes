Feature: Check header
    Check all the elements in the header

    Background:
        Given open the homepage

    @header
    Scenario: Home link verify
        Given the home link show

    Scenario Outline: dropdown list verify
        Given the <name> dropdown list show
        When click the <name> dropdown list
        Then the <name> sub menu show

        Examples:
            | name             |
            | category         |
            | customer service |
            | language         |

    Scenario: Customer service dropdown list verify
        Given the customer service dropdown list show
        When click the dropdown list
        Then the category sub menu show

    Scenario: Category dropdown list verify
        Given the category dropdown list show
        When click the dropdown list
        Then the category sub menu show

    Scenario: About EKI link verify
        Given the about EKI link show
        When click the About EKI link
        Then redirect to the About EKI page

    Scenario: Kennis link verify
        Given the Kennis link show

    Scenario: Contact link verify
        Given the contact link show
        When click the contact link
        Then redirect to the contact page

    Scenario: Search bar
        Given the search bar show
        When input the keywords in search bar
        And click the search button
        Then redirect to the search result page

