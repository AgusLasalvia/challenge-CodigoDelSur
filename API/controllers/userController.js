const { system, User } = require('../js/classes')
const { searchToken, createToken } = require('./tokenController')

const login = (req, res) => {
    const { email, password } = req.body;

    // Create a token for the user
    const token = btoa(`${email}:${password}`);

    // Validate email and fields
    if (system.validateLogin(email,password) && fieldValidationLogin(email, password)) {
        if (!searchToken(token)) {
            createToken(req, res);

        } else {
            res.status(401).json({ response: "user already logged in" });
        }
    } else {
        res.status(404).json({ response: "user not found, verify email and password" });
    };
};


const registration = (req, res) => {
    // read the value of the fields on the incoming request body
    const { email, password, firstName, lastName } = req.body;
    if (!system.validateEmail(email) && fieldValidationRegistration(email, password, firstName, lastName)) {
        let newUser = new User(email, password, firstName, lastName)
        system.Users = newUser // Setter to add a new user
        // response with status code 200
        res.status(200).json({ response: "success" })

    } else {
        // response with status code 404
        res.status(404).json({ response: "email already in use or verify empty fields" })
    }
};


// function to validate the fields
const fieldValidationRegistration=(email, password, firstName, lastName)=> {
    if (email == "" || password == "" || firstName == "" || lastName == "") {
        return false;
    } else {
        return true;
    }
}

// Function to validate fields
const fieldValidationLogin = (email, password) => {
    return email !== "" && password !== "";
};


module.exports = {
    login,
    registration
}