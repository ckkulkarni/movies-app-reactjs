Feature: Search and Display Movie/TV Show Details

    Scenario: Search for a movie
        Given I am on the search page
        When I select the "Movie" tab
        And I enter "Manmadhudu" in the search input and hit submit
        Then I should see the search results card
        And I should be able to click the card to view more details

# Scenario: Search for a TV show
#     Given I am on the search page
#     When I select the "TV Show" tab
#     And I enter "Breaking Bad" in the search input
#     And I enter "1" in the season input
#     And I enter "2" in the episode input
#     And I click the "Submit" button
#     Then I should see the search results card
#     And the card should display TV show details
#     And the card should display season and episode details
#     And I should be able to click the card to view more details