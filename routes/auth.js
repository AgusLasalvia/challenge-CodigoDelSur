//--------------------------------------//
// Node JS modules imports
//--------------------------------------//
const { system } = require('../classes')
const { Router } = require('express');
const route = Router();


//------------------------------------//
// Endpoints and methods for the same
//-----------------------------------//
// POST endpoint for auth URL
route.post('/login', (req, res) => {
    let { email, password } = req.body; // retreive the email and password from the body
    let token = btoa(`${email}:${password}`) // create a token for that user
	if (system.validateEmail(email, password)) {
        system.activeTokens.push(token); // add the token to the activeToken 
        res.status(200).header({ 'Authorization': token }).json({ responde: "success" });
        
        console.log(system.activeTokens);
	} else {
		res.status(401).json({ responde: "user not found" });
	};
});




module.exports = route;