const { Router } = require('express');
const {users} = require('../index')
const route = Router();

route.post('/login/:email', (req,res) => {
    let email = req.params.email
	console.log(email)
	res.send(email)
	// if (loginValidation(email, password)) res.send(200).json({response: 'success'});

	// else res.send(404).json({response: 'user not found'})
})


const loginValidation = (email,password) => {
	for (let j of users){
		if (j.email === email && j.password === password) return true;
		return false;
	}
};


module.exports = route;