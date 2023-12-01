//Node JS modules import
const express = require('express');
const app = express();
const fs = require('fs');
const { stringify } = require('querystring');
const { database } = require('./db/sql3')

// Import Routes


// Decalre port variable
const PORT = process.env.PORT || 3000


// Express configuration
app.use(express.json()); // Let express use json




// Express start up listening on port given by environment
app.listen(PORT,()=>{`http://localhost:${PORT}`})





