//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { system, Movie } = require('../js/classes');
const { Router } = require('express');
const route = Router();

// this API_Key was not implemented because of an error type con the url
// const API_KEY = process.env.API_KEY

//-------------------------------//
// Movies endpoint
//-------------------------------//
// GET endpoint with keyword implementation
route.get('/', (req, res) => {
    let url; // creates a variable for the fetch url
    let keyword = req.query.keyword; // gets the keyword given by the request query
    let randomMoviePage = Math.floor(Math.random() * 499); // random number with top of 499 because the movieDB api has a limit of 500 pages
    let randomDayScore;

    // if theres no keyword passed in the query 
    if (keyword != undefined) {
        // if there is a keyword, url is equals to the API url with the parameter keyword and it's value
        url = `https://api.themoviedb.org/3/discover/movie?with_keyword=${keyword}&api_key=d64f9fd75f1a32d59606d4d042b42ee7`
    } else {
        // if theres no keyword, url is equals to a random page with random movies
        url = `https://api.themoviedb.org/3/discover/movie?page=${randomMoviePage}&api_key=d64f9fd75f1a32d59606d4d042b42ee7`
    }
    fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(response => response.json())
        .then((data) => {
            // adds a suggestionScore to each movie objects
            for (let i of data.results) {
                randomDayScore = Math.floor(Math.random() * 99);
                i.suggestionScore = randomDayScore;
            }
            // sort the movies by suggestionScore from top suggested to less suggested
            data.results.sort((a, b) => {
                if (a.suggestionScore < b.suggestionScore) {
                    return 1;
                }
                if (a.suggestionScore > b.suggestionScore) {
                    return -1;
                }
                return 0;
            });
            // Respondes to the client with the sorted movie list
            res.json(data.results);
        })
});

// GET endpoint for favorites movies
route.get('/favorites', (req, res) => {
    // Gets the current token of the user and decode it
    // gets the email from the decoded token
    let email = atob(req.headers.authorization.split(' ')[1]).split[':'][0]
    let listFavorites = system.userFavorites(email); // gets the favorites movies of the user
    if (listFavorites.length > 0) { // if the list is not empty
        res.status(200).json(listFavorites); // response with the list of movies
    } else {
        res.status(401).json({ message: "no favorites movies" }) // response with a error and no movies for that user
    }

});

// POST endpoint to add a favorite movie
route.post('/favorites', (req, res) => {
    console.log(req.body)
    let id = Number(req.query.id);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d64f9fd75f1a32d59606d4d042b42ee7`,
        {
            headers:
                { 'Content-Type': 'application/json' },
            method: 'GET',
        })
        .then(response => response.json())
        .then((data) => { 
            let email = atob(req.headers.authorization.split(' ')[1]).split(':')[0]
            let newMovie = new Movie(data.id, data.title, data.overview, id);
            system.addUserNewFavorite(email, newMovie);

         })
    // res.status(200).json({ message: "movie added to favorites" }); // response with a message
});


module.exports = route;