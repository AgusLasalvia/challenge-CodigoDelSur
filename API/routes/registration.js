//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { registration } = require('../controllers/userController');
const { Router } = require('express');
const route = Router();

//------------------------------------//
// Endpoints and methods for the same
//-----------------------------------//
// POST endpoint for registration URL
route.post('/', (req, res) => {
    registration(req, res);
});


module.exports = route;