//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { Router } = require('express');
const { deleteToken } = require('../controllers/token.controllers');
const { Middleware } = require('../controllers/middleware.controllers');
const route = Router();

// DELETE endpoint for logout URL
route.delete('/', Middleware, deleteToken);


module.exports = route;
