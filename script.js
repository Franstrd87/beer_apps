$(document).ready(function () {
    //searchGiphy searches for a gif that is appropriate to where it will be appended.
    //uses an ajax call to return a random gif from the api
    function searchGiphy() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GejTzVgcu0DoFlIQjwSnMjK4TX3eG3c3&q=error&limit=1&offset=0&rating=G&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var errorGif = $("<div>")
                .attr("style", "background-image:url('" + response.data[0].url + "')");
            $(errorCard).append(errorGif);
        });
    }
    searchGiphy();
    //this variable will be used for an error statement
    //searchCocktail returns the appropriate drink using our Cocktail DB as a setting. 
    //this is a different syntax from what we were taught.
    function searchCocktail(newSearch) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c=Cocktail",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "85567027edmsh326c4363be56f0bp123f0bjsn555442865117"
            }
        };
        //this function searches through one array in the api, referred to as lookup.
        //this function also dynamically creates html which replaces the content in our main html.
        //the url of our ajax parameters is changed and used for a different ajax call.
        $.ajax(settings).done(function (response) {
            console.log(response)
            for (let i = 0; i < response.drinks.length; i++) {
                if (response.drinks[i].strDrink.toLowerCase() !== newSearch.toLowerCase()) {
                    var errorCard = $("<div>")
                        .addClass("col-12")
                        .html(newError);
                    var newError = $("<div>")
                        .addClass("card")
                        .append("<div class='card-content' id='errorMessage'><h1>Sorry, not in our database:(<h1></div>");
                    $("#drinkInfo").html(errorCard);
                }
                else {

                    settings.url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i="
                        + response.drinks[i].idDrink;
                    //creating a card, appending an image into it, and creatign a table for the drink ingredients.
                    //then replacing html content through javascript.
                    var newDiv1 = $("<div>")
                        .addClass("col-5")
                        .append("<div style='background-color:#ffc107' class='card'>");
                    newDiv1.append("<div class='card-image'> <img src=" +
                        response.drinks[i].strDrinkThumb
                        + " class='drinkImg'></div>");
                    var newTable = $("<table>")
                        .addClass("table")
                        .append("<tbody><tr id='liquids'></tr><tr id='measurements'></tr><tbody>");
                    var newDiv2 = $("<div>")
                        .addClass("col-7")
                        .append(newTable);
                    var newCard = $("<div>")
                        .addClass("row")
                        .append(newDiv1, newDiv2);
                    var drinkName = $("<div>")
                        .addClass("row")
                        .append("<div class='col-12' id='drinkName'>");
                    $("#drinkInfo").append(drinkName, newCard);
                    //this second ajax call looks for the id of the drink found in the first array.
                    //this function uses the id found in the earlier call to fetch the ingredients of our result.
                    // it also places the title and instructions into our card.
                    $.ajax(settings).done(function (response) {
                        $(errorCard).hide();
                        var nameDrink = $("<h1>" + response.drinks[0].strDrink + "</h1>");
                        $("#drinkName").html(nameDrink);
                        var instructions = $("<li>" + response.drinks[0].strInstructions + "</li>");
                        newDiv2.append(instructions);
                        var fullRecipe = [];
                        //this for loop returns the ingredients found in the api and pushes the returned values into a new aray.
                        //the next variable then removes a few variables not wanted into the array.
                        for (let i in response.drinks[0]) {
                            var arrIrrelevant = ['dateModified', 'idDrink', 'strAlcoholic', 'strDrink', 'strIBA', 'strCategory', 'strCreativeCommonsConfirmed', 'strDrinkThumb', 'strInstructionsDE', 'strTags'];
                            if (arrIrrelevant.indexOf(i) == -1 && response.drinks[0][i] !== null) {
                                fullRecipe.push(response.drinks[0][i]);
                            }
                        }
                        fullRecipe = fullRecipe.splice(2);
                        //these two for loops go through fullRecipe variable and append the liquids and ingredients into our card
                        for (let m = 0; m < (fullRecipe.length / 2); m++) {
                            var ingredients1 = $("<td>" + fullRecipe[m] + "</td>");
                            $("#liquids").append(ingredients1);
                        }
                        for (let m = (fullRecipe.length / 2); m < fullRecipe.length; m++) {
                            var ingredients2 = $("<td>" + fullRecipe[m] + "</td>");
                            $("#measurements").append(ingredients2);
                        }
                    })
                    break;
<<<<<<< HEAD

=======
                }
                
                else if (response.drinks[i].strDrink.toLowerCase() !== newSearch.toLowerCase()) {
                    console.log(response.drinks[i].strDrink.toLowerCase())
                    var errorCard = $("<div>")
                        .addClass("col-12")
                        .html(newError);
                    var newError = $("<div>")
                        .addClass("card")
                        .append("<div class='card-content' id='errorMessage'><h1>Sorry, not in our database:(<h1></div>");
                    $("#drinkInfo").html(errorCard);
>>>>>>> a000b9c5021e5afaf049fbee906a0f0431db4e17
                }
            }
        })
    }
    //an attempt at creating the fuzzy search for fuse.js, unsuccesful though.
    // function fuzzySearch(searchParameter) {

    //     let settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c=Cocktail",
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    //             "x-rapidapi-key": "85567027edmsh326c4363be56f0bp123f0bjsn555442865117"
    //         }
    //     };

    //     $.ajax(settings).done(function (response) {
    //         console.log(response)
    //         var options = {
    //             keys: ['response.drinks.strDrink'],
    //         };
    //         var fuse = new Fuse(response.drinks, options);

    //         var result = fuse.search(searchParameter);
    //         console.log(result)
    //     })
    // }

    // }
    //this function is for the titles of the random drinks created with our randomDrinkGenerator.
    //it places the name of the drink into the searchCocktail function.
    $(document).on("click", ".drinkName", function (event) {
        event.preventDefault();
        $("#drinkInfo").empty();
        var drinkSearch = $(this).text();
        console.log(drinkSearch)
        searchCocktail(drinkSearch);
    })
    //this on click function returns the name of the random drink created and searches our api through searchCocktail function.
    //it also empties our input box.
    $(document).on("click", "#searchBtn", function (event) {
        event.preventDefault();
        $("#drinkInfo").empty();
        var searchParameter = $("#search").val().trim();
        searchCocktail(searchParameter);
        $("#search").val("");
    })
    //randomDrinkGenerator searches our api for a drink in our array and appends it to our main menu html.
    function randomDrinkGenerator() {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c=Cocktail",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "85567027edmsh326c4363be56f0bp123f0bjsn555442865117"
            }
        };
        $.ajax(settings).done(function (response) {
            //the variables create rows in which we will append our content. the for loops return a random index 
            //and append two cards per for loop into a topr row and a second row
            var firstRow = $("<div>")
                .attr({
                    "class": "row ",
                    "id": "firstRow"
                });
            for (let k = 0; k < 2; k++) {
                var randNum = Math.floor((Math.random() * 100) + 1);
                console.log(response.drinks[randNum])
                var randomCard1 = $("<div>")
                    .addClass("card col-6")
                    .append("<div class='card-image'><img src='" + response.drinks[randNum].strDrinkThumb
                        + "' class='drinkImg'><p class='drinkName'>" + response.drinks[randNum].strDrink + "</p></div>");
                firstRow.append(randomCard1);
            }
            var secondRow = $("<div>")
                .attr({
                    "class": "row",
                    "id": "secondRow"
                });
            for (let k = 0; k < 2; k++) {
                var randNum = Math.floor((Math.random() * 100) + 1);
                console.log(response.drinks[randNum])
                var randomCard2 = $("<div>")
                    .addClass("card col-6")
                    .append("<div class='card-image'><img src='" + response.drinks[randNum].strDrinkThumb
                        + "' class='drinkImg'><p class='drinkName'>" + response.drinks[randNum].strDrink + "</p></div>");
                secondRow.append(randomCard2);
            }
            console.log(firstRow)
            //here we append all the information into our html, then outside the loop, we call our function
            $("#drinkInfo").append(firstRow, secondRow);
        })
    }
    randomDrinkGenerator();
})