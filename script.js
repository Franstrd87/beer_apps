$(document).ready(function () {
    
    function searchGiphy(){
    let giphy = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GejTzVgcu0DoFlIQjwSnMjK4TX3eG3c3&q=cocktail&limit=4&offset=0&rating=G&lang=en";
    console.log(giphy);
    $("#giphy").empty()

    $ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
};


        $(document).on("click",".drinkImg", function(event){

            event.preventDefault();
            var giphyUp = searchGiphy;
            append(giphyUp);
            
        })


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
                    var newDiv1 = $("<div>")
                        .addClass("col-6")
                        .append("<div class='card'>");
                    newDiv1.append("<div class='card-image'> <img src=" +
                        response.drinks[i].strDrinkThumb
                        + " class='drinkImg'></div>");
                    var newDiv2 = $("<div>")
                        .addClass("col-6")
                        .append("<div class='card'><div class='card-text' id='drinkRecipe'>");
                    var newCard = $("<div>")
                        .addClass("row")
                        .append(newDiv1, newDiv2);
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
                    "class": "row",
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
            $("#drinkInfo").append(firstRow, secondRow);
        })
    }
    randomDrinkGenerator();
})

