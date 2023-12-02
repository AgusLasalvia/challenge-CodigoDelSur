//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { system,user } = require('../js/classes')
const { Router } = require('express');
const route = Router();

//--------------------------------//
// Endpoints and methods for the same
//--------------------------------//
// POST endpoint for registration URL
route.post('/', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!system.validateEmail(email)) {
        let newUser = new user(email, password, firstName, lastName)
        system.Users = newUser // Setter to add a new user
        res.status(200).json({response:"user registged successfully"})
    } else {
        res.status(400).json({response:"email already in use"})
    }
});




module.exports = route;