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
	let { email, password } = req.body;
	if (system.validateLogin(email, password)) {
		// res.header
		res.status(200).json({ responde: "success" });

	} else {
		res.status(401).json({ responde: "user not found" });
	};
});





module.exports = route;