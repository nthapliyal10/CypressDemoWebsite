Feature: Adding Asset

Background: Background name
    Given I navigate to add asset page
    And I see field to add asset

Scenario: Should add new asset with valid ISIN and verify existing asset message
    Given I type valid asset id
    When I click add Asset
    Then I see new asset is sucessfully added
    And I type existing asset id
    And I click add Asset
    Then I see error message that assets exists    


Scenario Outline: Verify that the Asset Id should match the prescribed format
    Given I type invalid '<AssetId>'
    When I click add Asset
    Then I see validation error message
Examples:     
    |AssetId|
    |ISINA0000000015|
    |ISIN00000000150|
    |0000000015ISIN|
    |ISIN000000001|
    |ISI0000000015|
    |ISIN#0000000015|
    |IS0000IN000015|    