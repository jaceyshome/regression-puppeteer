@regressionVisual @prod
Feature: Page visual regression none production environment

    Scenario Outline: Page visual regression demo

        Given   Page visual test on <PAGE URL>
        When    I visit the page on tablet-landscape
        Then    I should see the visual result
        Examples:
            |   PAGE URL                                        |
            |   http://todomvc.com//examples/backbone/          |
            |   http://todomvc.com//examples/angularjs/         |
            |   http://todomvc.com//examples/mithril/           |
