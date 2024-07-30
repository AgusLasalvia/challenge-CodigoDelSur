// -------------- MOVIE CONTROLLER MODULE -------------- //

const { system, Movie } = require('../js/classes');

const getMovie = (req, res) => {
	let url; // creates a variable for the fetch url
	let keyword = req.query.keyword; // gets the keyword given by the request query
	let randomMoviePage = Math.floor(Math.random() * 499); // random number with top of 499 because the movieDB api has a limit of 500 pages
	let randomDayScore;

	// if theres no keyword passed in the query 
	if (keyword != undefined) {
		// if there is a keyword, url is equals to the API url with the parameter keyword and it's value
		url = `https://api.themoviedb.org/3/discover/movie?with_keyword=${keyword}&api_key=d64f9fd75f1a32d59606d4d042b42ee7`
	} else {
		// if theres no keyword, url is equals to a random page with random movies
		url = `https://api.themoviedb.org/3/discover/movie?page=${randomMoviePage}&api_key=d64f9fd75f1a32d59606d4d042b42ee7`
	}
	fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		method: 'GET',
	})
		.then(response => response.json())
		.then((data) => {
			// adds a suggestionScore to each movie objects
			for (let i of data.results) {
				randomDayScore = Math.floor(Math.random() * 99);
				i.suggestionScore = randomDayScore;
			}
			// sort the movies by suggestionScore from top suggested to less suggested
			data.results.sort((a, b) => {
				if (a.suggestionScore < b.suggestionScore) {
					return 1;
				}
				if (a.suggestionScore > b.suggestionScore) {
					return -1;
				}
				return 0;
			});
			// Respondes to the client with the sorted movie list
			res.json(data.results);
		})
};



const getFavorites = (req, res) => {
	// Gets the current token of the user and decode it
	// gets the email from the decoded token
	let email = atob(req.headers.authorization.split(' ')[1]).split(':')[0];
	let listFavorites = system.userFavorites(email); // gets the favorites movies of the user
	if (listFavorites.length > 0) { // if the list is not empty
		for (let i of listFavorites) {
			i.suggestionForTodayScore = Math.floor(Math.random() * 99)
		}
		res.status(200).json(listFavorites); // response with the list of movies
	} else {
		res.status(404).json({ message: "no favorites movies" }) // response with a error and no movies for that user
	}
};


const addFavorite = (req, res) => {
	let id = Number(req.body.id);
	if (isNaN(id)) {
		res.status(404).json({ message: "movie not found" }) // if theres an error, response with a error message
	} else {
		fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d64f9fd75f1a32d59606d4d042b42ee7`,
			{
				headers:
					{ 'Content-Type': 'application/json' },
				method: 'GET',
			})
			.then(response => response.json())
			.then((data) => {
				let email = atob(req.headers.authorization.split(' ')[1]).split(':')[0]
				if (data.id != undefined) {
					let newMovie = new Movie(data.title, data.overview, id);
					system.addUserNewFavorite(email, newMovie);
					res.status(200).json({ message: "movie added to favorites" }); // response with a message
				} else {
					res.status(404).json({ message: "movie not found" }) // if theres an error, response with a error message
				}
			}).catch(() => {
				res.status(400).json({ message: "movie already in favorites" }) // if theres an error, response with a error message
			})
	}

}



module.exports = {
	getMovie,
	getFavorites,
	addFavorite
}