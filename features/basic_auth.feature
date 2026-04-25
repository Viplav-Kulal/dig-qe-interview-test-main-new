@BASIC_AUTH
Feature: The Internet Guinea Pig Website

  Scenario: As a user, I can log into the secure area with valid credentials
    Given I use basic auth to login with admin and admin
    Then I should see a paragraph saying Congratulations! You must have the proper credentials.
