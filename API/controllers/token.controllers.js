// -------------- TOKEN CONTROLLER MODULE -------------- //
const { system } = require('../js/classes');


// Deelet Token Function
const deleteToken = (req, res) => {
    // take the authorization headers value and save the base64 encoded string
    const token = req.headers.authorization.split(' ')[1];
    // delete the token from the active list
    system.deleteToken(token);
    // response with status code 200
    res.status(200).json({ message: "Token deleted successfully" });
}


// Create Token Function
const createToken = (req, res) => {
    // take the email and password from the body of the request
    const { email, password } = req.body;
    // create a token with the email and password with base64 encoding
    const token = btoa(`${email}:${password}`);
    // add the token to the active list
    system.activeTokens.push(token);
    // response with status code 200 and the token
    res.status(200).json({ response: "success", token: token });
};

// Search Token Function
const searchToken = (token) => {
    return system.searchToken(token); // returns true or false
}

module.exports = {
    deleteToken,
    createToken,
    searchToken
}