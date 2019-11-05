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
        $("#drinkInfo").empty();
        $.ajax(settings).done(function (response) {
            for (let i = 0; i < response.drinks.length; i++) {
                if (response.drinks[i].strDrink.toLowerCase().includes(searchParameter.toLowerCase())) {
                    settings.url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i="
                        + response.drinks[i].idDrink;
                    var newDiv = $("<div>")
                        .addClass("card");
                    $(newDiv).append("<div class='card-image'> <img src=" +
                        response.drinks[i].strDrinkThumb
                        + "></div>",
                        "<div class='card-content' id='drinkRecipe'>");
                    var newCard = $("<div>")
                        .addClass("col-12")
                        .html(newDiv);
                    $("#drinkInfo").append(newCard);
                    $.ajax(settings).done(function (response) {
                        console.log(response)
                        for (let i in response.drinks[0]) {
                            if (response.drinks[0][i] !== null) {
                                var ingredients = $("<li>" + response.drinks[0][i] + "</li>");
                                $("#drinkRecipe").append(ingredients);
                                console.log(ingredients)
                            }
                        }
                    })
                }
                else {

                }
            }
        })
    }
    $(document).on("click", "#srchBtn", function () {
        event.preventDefault();
        var searchParameter = $("#search").val().trim();
        searchCocktail(searchParameter);
        $("#search").val("");
    })
})

