const { Router } = require('express');
const route = Router();


// Endpount for registration
route.post('/', (req, res) => {
    // Capture data from the incoming body
    const { email, fistName, lastName, password } = req.body;

    // Verification
    if (verifyFields(email, fistName, lastName, password)) {
        res.status(400).json({ response: 'empty fields' })

    } else if (verifyUserExisens(email)) {
        res.status()
    }

});


// Existring user method
const verifyUserExisens = (email) => {
    // load the txt data into a variable and convert it into a json
    let users = JSON.parse(fs.readFileSync('users.txt', 'utf8').toString())
    for (let i of users) {
        if (users[i].email === email) return true;
    }
    return false;
};


// Empty fields methods
const verifyFields = (email, fistName, lastName, password) => {
    if (email == "") return true;
    if (fistName == "") return true;
    if (lastName == "") return true;
    if (password == "") return true;
    return false;
};