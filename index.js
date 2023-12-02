//--------------------------------//
// Node JS modules imports
//--------------------------------//
const express = require('express');
const cors = require('cors');
const app = express();

//--------------------------------//
// Route imports
//--------------------------------//
const auth = require('./src/routes/auth');
const movies = require('./src/routes/movies')
const registration = require('./src/routes/registration');

//-------------------------------//
// Express configuration
//-------------------------------//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//-------------------------------//
// Routing configuration
//-------------------------------//
app.use('/api/v1/registration', registration);
app.use('/api/v1/movie',movies)
app.use('/api/v1/auth', auth);



//-------------------------------//
// Server start and console message
//-------------------------------//
app.listen(3000, () => { console.log('http://localhost:3000') })