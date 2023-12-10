//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { Router } = require('express');
const { system } = require('../js/classes');
const route = Router();

route.delete('/', (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token)
    system.deleteToken(token);
    console.log(system.activeTokens)
    res.json({ message: "token deleted successfully" })
});


module.exports = route;
