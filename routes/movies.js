const { Router } = require('express');
const route = Router();

// const API_KEY = process.env.API_KEY

//-------------------------------//
// Movies endpoint
//-------------------------------//
// Get endpoint with keyword implementation
route.get('/', (req, res) => {
	console.log(req.headers.authorization)
	let url;
	let keyword = req.query.keyword;
	let randomMoviePage = Math.floor(Math.random() * 499);
	if (keyword != undefined) {
		url = `https://api.themoviedb.org/3/discover/movie?with_keyword=${keyword}&api_key=d64f9fd75f1a32d59606d4d042b42ee7`
	} else {
		url = `https://api.themoviedb.org/3/discover/movie?page=${randomMoviePage}&api_key=d64f9fd75f1a32d59606d4d042b42ee7`
	}
	fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		method: 'GET',
	})
		.then(response => response.json())
		.then((data) => {
			res.json(data.results);
		})
});


route.get('/favorites', (req,res) => {
	
}),



module.exports = route;