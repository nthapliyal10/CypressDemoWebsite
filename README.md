## The automations is for technical-assignment which has two components -
### 1. Frontend - consists of two functionalities 'add assets' and check 'existing assets' 
### 2. Backend - using flask, consists of the API's and database for storage of asset data

The automation scripts use cypress + cucumber approach. Follwoing dependencies have been used -
### "cypress": "^6.3.0",
### "cypress-cucumber-preprocessor": "^4.0.0"

The project consists of two feature files -
1. addasset - consists of tests for add asset functionalities, including tests for invalid input data format
2. existingasset - tests for sort, search and filter functionalities including invalid pattern search

Global configurations are stored in the cypress.json file which dependencies are configured in package.json file.

# Test-cases.xlsx
  The file consists of two sheets -
  1. Test-case - contains the manual test cases for the demo website.
  2. Defects - contains defects found in the website.
  
# Execution:
 The project can be executed using commands -
### 'npx cypress run'
or
### 'npx cypress open' (opens the GUI for executing the test cases)


