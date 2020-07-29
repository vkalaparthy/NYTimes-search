$(".jumbotron").css({"background-color": "#000099", 
"text-align": "center","color": "white",
"margin": "10px", "border-radius": "10px"});

$(".btn-primary").css({"background-color": "#000099"});

var searchT = "";
var searchNum = 1;
var searchstart = 2020;
var searchEnd = 0;
//var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";

$("#search-button").on("click", function() {
    //
    clear();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    searchT = $("#searchTerm").val();
    queryURL = queryURL+searchT;
    console.log(searchT);
    console.log(queryURL);
    searchNum = $("#searchNum").val();
    console.log(searchNum);
    searchstart = $("#searchStart").val();
    console.log(searchstart);
    if (searchstart != "")
      queryURL = queryURL + "&begin_date="+searchstart;
    searchend = $("#searchEnd").val();
    if (searchend != "")
      queryURL = queryURL + "&end_date="+searchend;
    queryURL = queryURL + "&api-key=HChE63INGzA71ycGg6rH9ZIoqRlyNevj";
    console.log(queryURL);
    searchArticles(searchNum, queryURL);
  });

//queryURL = queryURL + "&api-key=HChE63INGzA71ycGg6rH9ZIoqRlyNevj";

  function searchArticles(numCount, queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }). then (function(data) {
      console.log(data.response.docs);
      for (var i = 0; i < numCount; i++){
        var newCard = $("<div>").addClass("card");
        var newCardBody = $("<div>").addClass("card-body");
        var newP1 = $("<p>").text(i+1 + " " + data.response.docs[i].abstract);
        var newP2 = $("<p>").text(data.response.docs[i].byline.original);
        //If subsection_name is not defined, take section_name
        var sectText = data.response.docs[i].subsection_name;
        if (sectText == undefined) {
          sectText = data.response.docs[i].section_name;
        }
        var newP3 = $("<p>").text("Section: " + sectText);
        var newP4 = $("<p>").text("Published On: " + data.response.docs[i].pub_date);
        newCardBody.append(newP1, newP2, newP3, newP4);
        newCard.append(newCardBody);
        $("#articles").append(newCard);
      }

    });
  };
  function clear() {
    $("#articles").empty();
  }

  $("#clear-button").on("click", function() {
    clear();
  });
