//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { Router } = require('express');
const { deleteToken } = require('../controllers/tokenController');
const route = Router();

// DELETE endpoint for logout URL
route.delete('/', (req, res) => {
    deleteToken(req, res);
});


module.exports = route;
