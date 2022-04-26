Feature: Test user can view list of users

    Scenario: verify user can view a list of users displayed in a table
        When user navigates to users screen
        Then randomuser API should be called
        And users list should be visible