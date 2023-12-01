const { Router } = require('express');
const route = Router();

route.post('/login', (req,res) => {
    let { email, password } = req.body;
    
})