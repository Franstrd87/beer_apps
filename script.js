$(document).ready(function () {
    function searchCocktail(userInput) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c=Cocktail",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "85567027edmsh326c4363be56f0bp123f0bjsn555442865117"
            }
        }
        $.ajax(settings).done(function (response) {
            for (let i = 0; i < response.drinks.length; i++) {
                if (response.drinks[i].strDrink.toLowerCase().includes(searchParameter.toLowerCase())) {
                    console.log(response.drinks[i].idDrink)
                    console.log(response.drinks[i].strDrink)
                }
                else {

                }
            }

        })
    }
    $(document).on("click", "#")
})

