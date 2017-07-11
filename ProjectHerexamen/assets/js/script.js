/**
 * Created by shans on 6/07/2017.
 */
var searchRandomJokes = (function (e) {
    e.preventDefault();
    $('.randomJoke').remove().empty();
    $.ajax({
        method:"GET",
        url: 'https://api.chucknorris.io/jokes/random',
        icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",

        success: (function (data) {
        $(".randomJokes").append("<p class='randomJoke'>"+data.value+"</p>");

    })
    })
});

var removeJokes = function (e) {
    e.preventDefault();
    $(".removeRandomJoke").hide();
    $('.randomJoke').remove().empty();

};

var removeCategoriesAndJokes = function (e) {
    e.preventDefault();
    $(".removeCategoriesAndJoke").hide();
    $(".categoriesButtons").hide();
    $(".jokesListWithCategory").hide();
};



var searchCatagories = (function (e) {
    e.preventDefault();
    $.ajax({
        method: 'GET',
        url: 'https://api.chucknorris.io/jokes/categories',


        success: (function (data) {
            var categoriesButtons = $('.categoriesButtons');
            categoriesButtons.empty();
            for (var g = 0; g < 16; ++g) {
                categoriesButtons.append
                ("<input type='button' onclick='reply_click(this.value)' class='catButton' value='" + data[g] + "' />");

            }
        })
    })
});

var reply_click = function (clicked_value) {
        var call = "https://api.chucknorris.io/jokes/random?category=" + clicked_value;
        $('.jokeWithCategory').remove().empty();
        $.ajax({
            method:'GET',
            url:call,
        success: (function (data) {
            if(data.category === null){ data.category = "explicit"}

            $('.jokesListWithCategory').append
            ("<p class='jokeWithCategory'>" + data.value +" - From Category: "+ data.category +"</p>");


        })
        })
    };


$(document).ready(function () {
    var randomJokeButton = $(".randomJokeButton");
    var removeRandomJoke = $(".removeRandomJoke");
    var giveCategories = $(".giveCategories");
    var removeCategoriesAndJoke = $(".removeCategoriesAndJoke");


    randomJokeButton.click("button", searchRandomJokes);
    giveCategories.click("button",searchCatagories);

    removeRandomJoke.hide();
    removeCategoriesAndJoke.hide();



    randomJokeButton.click(function () {
        removeRandomJoke.show();
    });
    removeRandomJoke.click("button", removeJokes);

    giveCategories.click(function () {
        removeCategoriesAndJoke.show();
        $(".categoriesButtons").show();
    });
    $(".categoriesButtons").click(function () {
       $(".jokesListWithCategory").show();
    });

    removeCategoriesAndJoke.click("button" , removeCategoriesAndJokes);

});
