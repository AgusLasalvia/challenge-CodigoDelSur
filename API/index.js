//--------------------------------//
// Node JS modules imports
//--------------------------------//
const { system } = require('./js/classes');
const express = require('express');
const cors = require('cors');
const app = express();

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
    // if the token is not in the active list
    // take the authorization headers value and save the base64 encoded string
    if (!req.headers.authorization || !system.searchToken(req.headers.authorization.split(' ')[1]) || req.headers.authorization.split(' ')[1] == undefined) {
        return res.status(401).json({ message: 'you must be logged in' }); // responde to the client with non existing active user.
    }
    next();
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