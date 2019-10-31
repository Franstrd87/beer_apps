$(document).on("click")
var settings = {
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
    console.log(response);
});
