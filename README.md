## Overview

**Project Title**: CyberChef

**Project Description**: A website where you can generate a shopping list from the recipes you want to make.

**Project Goals**: To make shopping more convenient by saving time assembling shopping lists.

## Instructions for Build and Use

#### How to run

Install node: https://nodejs.org/en/download/package-manager

Run `npm install` to install the project dependencies.

Copy the `recipes.db` file in the `server` directory into the `server/tmp` directory.

Run `npm run client` to run the client application.

Run `npm run server` to run the server.

You will need to have the client and the server running at the same time for the application to work.

#### How to use

On the recipe search page, you can see all the available recipes. You can add a recipe or recipes to your shopping list with the button in the top right corner of each recipe card, or remove a recipe with the same button. If you want to add one of your own recipes to your shopping list, you can upload it to the database by filling out the form accessible from the navbar.

The shopping list is accessible at all times from the button in the top right corner. The checkboxes save across page reloads and are there for your convenience.

## Development Environment

The website is currently not deployed anywhere, so if you can run it, you have the development environment set up.

If you are a developer, a useful command is `npm run api-spec`, which opens the API specification.

## Useful Websites to Learn More

I found these websites useful in developing this software:

-   [React Documentation](https://react.dev/)
-   [MUI Documentation](https://mui.com/)

## Future Work

Future potential fixes/improvements/additions:

-   [ ] General styling improvements
-   [ ] Recipe pictures
-   [ ] Improve shopping list UX
-   [ ] Better mobile view(?)
-   [ ] Tags and ratings
-   [ ] User accounts
-   [ ] Fuzzy searching with [match-sorter](https://github.com/kentcdodds/match-sorter)
