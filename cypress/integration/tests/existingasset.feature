Feature: Verify existing Assets functionality

Background:
	Given I navigate existing asset page
    And I verify the count of assests

Scenario: user can search an existing asset name from search textbox
    Then verify that I can search an assetid

Scenario: user can sort the asset name data in ascending and descending order
    Then verify that I can sort assetid in ascending order
    And verify that I can sort assetid in descending order

Scenario: user can filter the data using the pattern or exact match
    Then verify that I can filter assetid

Scenario: error is displayed for invalid search
    Then verify error message for invalid search    