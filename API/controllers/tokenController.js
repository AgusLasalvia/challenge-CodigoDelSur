// -------------- TOKEN CONTROLLER MODULE -------------- //
const { system } = require('../js/classes');

const deleteToken = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    system.deleteToken(token);
    res.json({ message: "Token deleted successfully" });
}

const createToken = (req, res) => {
    const { email, password } = req.body;
    const token = btoa(`${email}:${password}`);
    system.activeTokens.push(token);
    res.status(200).json({ response: "success", token: token });
};

const searchToken = (token) => {
    return system.searchToken(token);
}

module.exports = {
    deleteToken,
    createToken,
    searchToken
}