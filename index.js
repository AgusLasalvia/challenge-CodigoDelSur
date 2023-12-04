//--------------------------------//
// Node JS modules imports
//--------------------------------//
const express = require('express');
const app = express();

//--------------------------------//
// Route imports
//--------------------------------//
const auth = require('./routes/auth');
const movies = require('./routes/movies')
const registration = require('./routes/registration');

//-------------------------------//
// Express configuration
//-------------------------------//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for authentication
app.use( (req, res, next)=> {
    if (!req.headers.authorization || req.headers.authorization == "Basic Og==") {
        return res.status(403).json({ message:'you must be logged in' });
    }
    next();
}); 

//-------------------------------//
// Routing configuration
//-------------------------------//
app.use('/api/v1/registration', registration);
app.use('/api/v1/movies',movies)
app.use('/api/v1/auth', auth);



//-------------------------------//
// Server start and console message
//-------------------------------//
app.listen(3000, () => { console.log('http://localhost:3000') })