//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { system, User } = require('../js/classes')
const { Router } = require('express');
const route = Router();

//------------------------------------//
// Endpoints and methods for the same
//-----------------------------------//
// POST endpoint for registration URL
route.post('/', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!system.validateEmail(email) && fieldValidation(email, password, firstName, lastName)) {
        let newUser = new User(email, password, firstName, lastName)
        system.Users = newUser // Setter to add a new user
        // response with status code 200
        res.status(200).json({ response: "success" })

    } else {
        // response with status code 404
        res.status(401).json({ response: "email already in use" })
    }
});


// function to validate the fields
function fieldValidation(email, password, firstName, lastName) {
    if (email == "" || password == "" || firstName == "" || lastName == "") {
        return false;
    } else {
        return true;
    }
}

module.exports = route;