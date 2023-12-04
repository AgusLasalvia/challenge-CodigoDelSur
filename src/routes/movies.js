const { Router } = require('express');
const route = Router();

const API_KEY = process.env.API_KEY

route.get('/movie',(req,res)=>{
    let keyword = req.query.keyword;
	let newList = [];
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d64f9fd75f1a32d59606d4d042b42ee7`,{
		headers: {'Content-Type': 'application/json'},
		method: 'GET'
	})
	.then(response => response.json())
	.then((data) => {
		if (keyword == ""){
			for (let i of data){
				if(i.includes(keyword)) newList.push(i)
            }
            res.json(data);
        } else {
            res.json(data);
        }
	})
});

module.exports = route;