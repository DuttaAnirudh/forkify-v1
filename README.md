# Forkify

Forkify is a web application that allows users to search for food items and discover a variety of dishes associated with them. Users can select a dish, view its ingredients, adjust serving sizes, and access cooking instructions from an external website. [Live Demo](https://forkify-v1-dutta.netlify.app/)

![Forkify User Interface](/src/img/Project-forkify.png 'Forkify User Interface')

## Tech Stack

The project is built using the following technologies:

- HTML
- CSS
- SASS
- JavaScript
- Parcel

## Features

- Search: Users can search for any food item or dish and receive a list of recipes associated with it.
- Serving Size Adjustment: Users can change the number of servings, and the amount of ingredients required adjusts accordingly.
- Bookmarking: Users can bookmark a recipe to view it later in the bookmark tab.
- Recipe Upload: Users can upload their own recipes using the add recipe button. Recipes are saved locally in the user's browser.
- Persistent Recipe Viewing: Users can revisit the site or hard refresh the browser without losing the last viewed recipe.
- Dynamic DOM Update: The site utilizes a DOM updating algorithm to prevent page reloads with every update.

## Architecture

![Forkify Architecture](/architecture%20&%20Flowchart/forkify-architecture-recipe-loading.png 'Forkify Architecture')

## Flowchart

![Forkify Flowchart](/architecture%20&%20Flowchart/forkify-flowchart-part-3.png 'Forkify Flowchart')

## Learning

- Accessing and managing data from third-party APIs with AJAX calls.
- Implementing Model View Controller (MVC) architecture for organized code structure.
- Saving data to the local storage of a browser.
- Utilizing Object-Oriented Programming (OOP) classes for code organization and feature implementation.
- Creating and managing project configuration modules and project helper function modules.
- Applying the Publisher-Subscriber design pattern for efficient communication between components.
- Developing a dynamic DOM update algorithm for real-time changes without page reloads.
- Enabling users to bookmark favorite dishes for future reference.

## Improvement

1. Responsiveness: Make the website fully responsive for all screen sizes.
2. Improved Recipe Format: Enhance the format for specifying ingredients when adding a recipe.
3. Pagination Enhancement: Show the number of pages between pagination buttons for easier navigation.
4. Calorie Tracker: Integrate an external API to track calories based on ingredient names and adjust them according to servings.
5. Shopping List Feature: Implement a feature to create a separate shopping list with ingredients required for cooking recipes.
