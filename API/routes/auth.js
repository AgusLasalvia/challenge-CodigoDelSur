//--------------------------------------//
// Node.js Modules Imports
//--------------------------------------//
const { login } = require('../controllers/userController');
const { Router } = require('express');
const route = Router();

// POST endpoint for auth URL
route.post('/login', (req, res) => {
   login(req, res);
});

module.exports = route;
