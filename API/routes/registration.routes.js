//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { registration } = require('../controllers/user.controllers');
const { Router } = require('express');
const route = Router();

//------------------------------------//
// Endpoints and methods for the same
//-----------------------------------//
// POST endpoint for registration URL
route.post('/', registration);


module.exports = route;