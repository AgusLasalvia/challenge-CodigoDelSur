//--------------------------------------//
// Node JS modules imports
//--------------------------------------//
const { system } = require('../js/classes')
const { Router } = require('express');
const route = Router();


//------------------------------------//
// Endpoints and methods for the same
//-----------------------------------//
// POST endpoint for auth URL
route.post('/login', (req, res) => {
    let { email, password } = req.body; // retreive the email and password from the body
    let token = btoa(`${email}:${password}`) // create a token for that user

    if (system.validateEmail(email) && fieldValidation(email, password)) {
        if (!system.searchToken(token)) {
            system.activeTokens.push(token); // add the token to the activeToken 
            res.status(200).json({ responde: "success", token: token });

        } else {
            res.status(401).json({ responde: "user already logged in" });
        }
    } else {
        res.status(401).json({ responde: "user not found" });
    };
});



// function to validate the fields
const fieldValidation = (email, password) => {
    if (email == "" || password == "") {
        return false;
    } else {
        return true;
    }
}



module.exports = route;