const { Router } = require('express');
const route = Router();


route.post('/', (req, res) => {
    let { email, password } = req.body;
    if (!validateLogin(email, password)) {
        
    }
});


const validateLogin = (email, password) => {
    for (let i of system.users) {
        if (email === i.email && password === i.password) return true;
    }
    return false;
};


module.exports = route;