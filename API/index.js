//--------------------------------//
// Node JS modules imports
//--------------------------------//
const express = require('express');
const cors = require('cors');
const app = express();


// --------------------------------//
// Middleware Controller Import
// --------------------------------//
const { Middleware } = require('./controllers/middlewareController');


//--------------------------------//
// Route imports
//--------------------------------//
const registration = require('./routes/registration');
const movies = require('./routes/movies');
const logout = require('./routes/logout');
const auth = require('./routes/auth');


//-------------------------------//
// Express configuration
//-------------------------------//
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//-------------------------------//
// Middleware
//-------------------------------//
app.use((req, res, next) => {
    Middleware(req, res, next);
});

//-------------------------------//
// Routing configuration
//-------------------------------//
app.use('/api/v1/registration', registration);
app.use('/api/v1/logout', logout);
app.use('/api/v1/movies', movies)
app.use('/api/v1/auth', auth);


//-------------------------------//
// Server start and console message
//-------------------------------//
app.listen(3000, () => { console.log('http://localhost:3000') })