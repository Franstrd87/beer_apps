# The Noobs
## What the project is?
This app is meant to be a recipe guide for the common bar hopper. 
## Who did this project?
The project was split apart as follows: Edgar in front end and aesthetics; tulus as a floater between the front and back end, with a heavy focus on the front end, as well as helping to resolve conflicts; and Everardo as the back end and conflict resolution developer. 
## How it works?
* The app uses Bootstrap for its styling, AJAX for the API call with Cocktail DB and SearchGiphy as the main API's being used. There is a separate file that contains css, javascript, etc. 
* The app has a home page, where in there are four randomly chosen cocktails. , and appending 4 randomly generated indexes into the html. The function randomDrinkGenerator()is responsible for this styling, appending a picture and the drink name to the html #drinkInfo. the latter is clickable.
* searchCocktail is the main AJAX call in our app, searching the API for the drink name, returning its ID, and then appending the information of the drink. this info includes:appending a picture, a table made up of the ingredients and measuremnts necessary, and drink instructions for the drink recalled. this was done using a for loop to iterate through the arrays of objects. 
* Another Ajax call is then executed to search through a diffferent variety of objects. The object is then inspected.
* The names of the drinks are links, implemented through the use of an on click function. The on click function creates a variable that equals the value of the text, empties the parent container, #drinkInfo, and then executes the API call, searchCocktail(variable). 
* This is also executed with the search function in the navbar. upon pressing the search button, searchCocktail(variable) is called and dynamically creates the same result for that drink specifically input as the parameter. 
Ultimately, there will be a login for the purpose of creating a viable site for bartenders as well. the target consumer at its start is the average person wanting a reliable source of information on how drinks are made. The goal is to become more bartender friendly by creating a login, giving people the choice to add to a favorites bar, and the ability to create recipes themselves. hopefully this will be done using firebase, and hopefully it will be done soon. 
