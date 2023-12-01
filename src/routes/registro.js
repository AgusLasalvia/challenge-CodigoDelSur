const { Router } = require('express');
const route = Router();

let users = require('../index')

// Endpount for registration
route.post('/', (req, res) => {
	// Capture data from the incoming body
	const { email, fistName, lastName, password } = req.body;

	// Verification
	if (verifyFields(email, fistName, lastName, password)) {
		res.status(400).json({ response: 'empty fields' })

	} else if (verifyUserExisens(email)) {
		res.json({ response: 'email already registered' })
	}

});


// Existring user method
const verifyUserExisens = (email) => {
	// load the txt data into a variable and convert it into a json
	for (let i of users) {
		if (i.email === email) return true;
	}
	return false;
};


// Empty fields methods
const verifyFields = (email, fistName, lastName, password) => {
	if (email == "") return true;
	if (fistName == "") return true;
	if (lastName == "") return true;
	if (password == "") return true;
	return false;
};


module.exports = route;