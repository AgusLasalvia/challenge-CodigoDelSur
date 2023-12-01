//Node JS modules import
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');

// Import Routes
const registro = require('./routes/registro');
const auth = require('./routes/auth');


// Decalre port variable
const PORT = process.env.PORT || 3000;

// Load the users data at the init
// and save it as a list 
module.users = users = JSON.parse(fs.readFileSync('./users.txt', 'utf8').toString());

app.get('/', (req, res) => {
	res.json({response:'success'})
})

// Express configuration
app.use(cors())
app.use(bodyParser.json()); // Let express use json
app.use(express.urlencoded({extended:true})); // Let express use urlencoded


// Routes use express
app.use('/registration',registro);
app.use('/auth',auth)



// Express start up listening on port given by environment
app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)});




