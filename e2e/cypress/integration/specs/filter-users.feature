Feature: Test filtering user list

    Scenario Outline: Verify user can filter list of users by gender
        Given user navigates to users listing screen
        When user chooses gender "<gender>"
        And user clicks Filter Users button
        Then users list gender column will include "<gender>" only

        Examples:
            | gender |
            | male   |
            | female |

    Scenario Outline: Verify user can filter list of users by nationality
        Given user navigates to users listing screen
        When user selects "<nationality>" from nationality dropdown
        And user clicks Filter Users button
        Then users list location column will include "<country>" only

        Examples:
            | nationality | country       |
            | CA          | Canada        |
            | US          | United States |
