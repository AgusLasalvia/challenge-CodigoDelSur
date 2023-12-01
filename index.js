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
const registration = require('./src/routes/registration');


//-------------------------------//
// Express configuration
//-------------------------------//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//-------------------------------//
// Routing configuration
//-------------------------------//
app.use('/api/v1/auth', auth);
app.use('/api/v1/registration', registration);



//-------------------------------//
// Server start and console message
//-------------------------------//
app.listen(3000, () => { console.log('http://localhost:3000') })