const { system } = require('../js/classes')

module.exports.Middleware = (req, res, next) => {
    // if the token is not in the active list
    // take the authorization headers value and save the base64 encoded string
    if (!req.headers.authorization || !system.searchToken(req.headers.authorization.split(' ')[1]) || req.headers.authorization.split(' ')[1] == undefined) {
        return res.status(401).json({ message: 'you must be logged in' }); // responde to the client with non existing active user.
    }
    next();
}