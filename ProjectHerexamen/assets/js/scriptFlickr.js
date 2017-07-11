/**
 * Created by shans on 9/07/2017.
 */

var searchPictures = (function (e) {
    e.preventDefault();
    var valueSearch = $("#search").val();
    if (valueSearch === "") {
        alert("Geef een zoekterm in!")
    }
    else{

        $('.searchListWithChuckNorris').empty();
        var chuck = "Chuck Norris ";
        valueSearch = chuck + valueSearch;

        $.ajax({
            method: "GET",
            url: "https://api.flickr.com/services/rest/",
            data: {
                method: "flickr.photos.search",
                api_key: "9fd0aee629070b8beefb49ab79d2efe8",
                text: valueSearch,
                per_page: 12,
                format: "json",
                nojsoncallback: 1
            },
            success: function (response) {
                $.each(response.photos.photo, function (index, value) {
                    var url =
                        "https://farm"+value.farm +
                        ".staticflickr.com/"+value.server +
                        "/"+value.id+"_"+value.secret+"_b.jpg";

                    $('.searchListWithChuckNorris').append
                    ("<div class='gallery'>"
                        +"<img src='"+url+"' />"+
                        "<div class='desc'>ID: "+value.id+
                                          "<br>Owner: "+value.owner+
                                          "<br>Secret: "+value.secret+
                                          "<br>Server: "+value.server+
                                          "<br>Title: "+value.title+
                                          "</div>" + "</div>");


                })
            },
            error: function () {
                alert("Geen zoekresultaten");
            }
        })
    }
});


$(document).ready(function () {

    $("#searchForPictures").click("button", searchPictures);

});