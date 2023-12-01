const { system,user } = require('../js/classes')
const { Router } = require('express');
const route = Router();

route.post('/', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!validateEmail(email)) {
        let newUser = new user(email, password, firstName, lastName)
        system.Users = newUser // Setter to add a new user
        res.status(200).json({response:"user registged successfully"})
    } else {
        res.status(400).json({response:"email already in use"})
    }
});


const validateEmail = (email) => {
    for (let i of system.users) {
        if (email === i.email) return true;
    }
    return false;
}


module.exports = route;