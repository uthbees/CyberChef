## CyberChef

A website where you can generate a shopping list from the recipes you want to make. Aims to make shopping more convenient by saving time assembling shopping lists. (At least, it would in theory if it was polished and feature-rich. 🙂)

#### How to run

Install node: https://nodejs.org/en/download/package-manager

Run `npm install` to install the project dependencies.

Copy the `recipes.db` file in the `server` directory into the `server/tmp` directory. The file in the `tmp` directory will be your working local copy of the database when you run the application.

Run `npm run server` to run the server, and run `npm run client` to run the client application. You will need to have the client and the server running at the same time for the application to work.

`npm run api-spec` opens the API specification.

#### How to use

On the recipe search page, you can see all the available recipes. You can add a recipe or recipes to your shopping list with the button in the top right corner of each recipe card, or remove a recipe with the same button. If you want to add one of your own recipes to your shopping list, you can upload it to the database by filling out the form accessible from the navbar.

The shopping list is accessible at all times from the button in the top right corner. The checkboxes save across page reloads and are there for your convenience.

#### Ideas for further development

-   [ ] General styling improvements
-   [ ] Recipe pictures
-   [ ] Improve shopping list UX
-   [ ] Better mobile view(?)
-   [ ] Tags and ratings
-   [ ] User accounts
-   [ ] Fuzzy searching with [match-sorter](https://github.com/kentcdodds/match-sorter)
