//--------------------------------//
// Node JS modules imports
//--------------------------------//
const {getFavorites,getMovie,addFavorite} = require('../controllers/movieController')
const { Router } = require('express');
const route = Router();

// this API_Key was not implemented because of an error type con the url
// const API_KEY = process.env.API_KEY

//-------------------------------//
// Movies endpoint
//-------------------------------//
// GET endpoint with keyword implementation
route.get('/', (req, res) => {
    getMovie(req, res);
});

// GET endpoint for favorites movies
route.get('/favorites', (req, res) => {
    getFavorites(req, res);
});

// POST endpoint to add a favorite movie
route.post('/favorites', (req, res) => {
    addFavorite(req, res);
});

// export the route
module.exports = route;