//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { getFavorites, getMovie, addFavorite } = require('../controllers/movie.controllers')
const { Middleware } = require('../controllers/middleware.controllers');
const { Router } = require('express');
const route = Router();

// this API_Key was not implemented because of an error type con the url
// const API_KEY = process.env.API_KEY

//-------------------------------//
// Movies endpoint
//-------------------------------//
// GET endpoint with keyword implementation
route.get('/', Middleware, getMovie);

// GET endpoint for favorites movies
route.get('/favorites', Middleware, getFavorites);

// POST endpoint to add a favorite movie
route.post('/favorites', Middleware, addFavorite);

// export the route
module.exports = route;