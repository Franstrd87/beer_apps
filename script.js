$(document).ready(function () {
    function searchCocktail(searchParameter) {
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
            for (let i = 0; i < response.drinks.length; i++) {
                if (response.drinks[i].strDrink.toLowerCase() == searchParameter.toLowerCase()) {
                    settings.url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i="
                        + response.drinks[i].idDrink;
                    var newDiv = $("<div>")
                        .addClass("card");
                    $(newDiv).append("<div class='card-image  drinkImg'> <img src=" +
                        response.drinks[i].strDrinkThumb
                        + "></div>",
                        "<div class='card-content' id='drinkRecipe'>");
                    var newCard = $("<div>")
                        .addClass("col-12")
                        .html(newDiv);
                    $("#drinkInfo").html(newCard);
                    $.ajax(settings).done(function (response) {
                        console.log(response)
                        var nameDrink = $("<h1>" + response.drinks[0].strDrink + "<h1>");
                        $("#drinkRecipe").append(nameDrink);
                        for (let i in response.drinks[0]) {
                            var arrIrrelevant = ['dateModified', 'idDrink', 'strAlcoholic', 'strDrink', 'strIBA', 'strCategory', 'strCreativeCommonsConfirmed', 'strDrinkThumb', 'strInstructionsDE', 'strTags'];
                            if (arrIrrelevant.indexOf(i) == -1 && response.drinks[0][i] !== null) {
                                var ingredients = $("<li>" + response.drinks[0][i] + "</li>");
                                $("#drinkRecipe").append(ingredients);
                            }
                        }
                    })
                    break;
                }
                else if (response.drinks[i].strDrink.toLowerCase() !== searchParameter.toLowerCase()) {
                    console.log(response.drinks[i].strDrink.toLowerCase())
                    var errorCard = $("<div>")
                        .addClass("col-12")
                        .html(newError);
                    var newError = $("<div>")
                        .addClass("card")
                        .append("<div class='card-content' id='errorMessage'><h1>Sorry, not in our database:(<h1></div>");
                    $("#drinkInfo").html(errorCard);
                }
            }
        })
    }
    $(document).on("click", "#searchBtn", function (event) {
        event.preventDefault();
        $("#drinkInfo").empty();
        var searchParameter = $("#search").val().trim();
        searchCocktail(searchParameter);
        $("#search").val("");
    })
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
                    .append("<div class='card-image hinge delay-3s'><img src='" + response.drinks[randNum].strDrinkThumb
                        + "' class='drinkImg'><span class='card-title'>" + response.drinks[randNum].strDrink + "</span></div>");
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
                    .append("<div class='card-image hinge delay-3s'><img src='" + response.drinks[randNum].strDrinkThumb
                        + "' class='drinkImg'><span class='card-title'>" + response.drinks[randNum].strDrink + "</span></div>");
                secondRow.append(randomCard2);
            }
            console.log(firstRow)
            $("#drinkInfo").append(firstRow, secondRow);
        })
    }
    randomDrinkGenerator();
})

