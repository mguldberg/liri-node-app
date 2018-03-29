var dotEnv = require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//default movie name to Mr. Nobody
var movieName = "Mr. Nobody";

//default movie name to Mr. Nobody
var songName = "The Sign";


// We then store the textfile filename given to us from the command line
var liriOperation = process.argv[2];

//swith on what type of search to do
switch (liriOperation) {
    //twitter search
    case "my-tweets":
        twitterSearch();
        break;

    //spotify search
    case "spotify-this-song":
        spotifySearch();
        break;

    //omdb search
    case "movie-this":
        omdbSearch();
        break;

    case "do-what-it-says":
        doWhatItSaysSearch();
        break;
}

//twitter Search function
function twitterSearch() {
    console.log("in twitter search");


//     var Twit = require('twit'); // this is how we import the twit package
// var config = require('./config') //this is we import the config 
// file which is a js file which contains the keys ans tokens
// var T = new Twit(config); //this is the object of twit which 
// will help us to call functions inside it
// var params = {
// q: 'akshay',
// count: 100
// } // this is the param variable which will have key and value 
// ,the key is the keyword which we are interested in searching and count 
// is the count of it
// T.get('search/tweets', params,searchedData); // get is the 
// function to search the tweet which three paramaters 'search/tweets'
// ,params and a callback function.
// function searchedData(err, data, response) {
// console.log(data);
// } // searchedData function is a callback function which 
// returns the data when we make a search

}

//spotify search function
function spotifySearch() {
    console.log("in spotify search");

}

//omdb search function
function omdbSearch() {

    console.log(process.argv[3]);

    //checks if there is a movie title given by the user
    if (process.argv[3] != undefined) {

        console.log("inside if statement");

        //init movieName to over write Mr. Nobody because their is a user passed argument
        movieName = "";

        //loop through the arg array until there aren't any more arguments
        for (i = 3; process.argv[i] != undefined; i++) {
            console.log("inside for loop");

            //add each arg to the movieName var to use in the QueryURL
            movieName = movieName + "+" + process.argv[i];

            console.log(movieName);
        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //this line is just to help us debug against the actual URL
    console.log(queryUrl);

    // Then create a request to the queryUrl
    // ...
    request(queryUrl, function (error, response, body) {

        console.log(response.statusCode);

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            console.log(body);

            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.

            console.log("* Title of the movie");
            console.log(JSON.parse(body).Title);
            console.log("* Year the movie came out");
            console.log(JSON.parse(body).Year);


            if (JSON.parse(body).Ratings[0].Value != undefined) {
                console.log("* IMDB Rating of the movie.");
                console.log(JSON.parse(body).Ratings[0].Source + " - " + JSON.parse(body).Ratings[0].Value);
            }

            if (JSON.parse(body).Ratings[1].Value != undefined) {
                console.log("* Rotten Tomatoes Rating of the movie.");
                console.log(JSON.parse(body).Ratings[1].Source + " - " + JSON.parse(body).Ratings[1].Value);
            }

            console.log("* Country where the movie was produced.");
            console.log(JSON.parse(body).Country);

            console.log("* Language of the movie.");
            console.log(JSON.parse(body).Language);

            console.log("* Plot of the movie.");
            console.log(JSON.parse(body).Plot);

            console.log();"* Actors in the movie."
            console.log(JSON.parse(body).Actors);

            // if (JSON.parse(body).Ratings[2].Value != undefined) {
            //     console.log(JSON.parse(body).Ratings[2].Source);
            //     console.log(JSON.parse(body).Ratings[2].Value);
            // }
        }

    });

};

//do what it says search function
function doWhatItSaysSearch() {
    console.log("in dwis search");

}