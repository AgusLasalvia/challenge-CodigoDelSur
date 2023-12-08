const fs = require('fs');

class User {
    // Contrsutcor for the class User
	constructor(email, password, firstName, lastName) {
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}


class Movie {
    // Contrsutcor for the class Favorite
	constructor(id, name, overview,score) {
		this.id = id;
		this.name = name;
		this.overview = overview;
		this.score = score;
	}
}


class System {
	// Contrsutcor for the class System
	constructor() {
		this.users = this.loadUsers() // Automatically load the users in the users.txt
        this.favorites = this.loadUsers() // Automatically load the users in the users.txt
        this.activeTokens = [
            "bG9naW46", // Login default token of world "login"
            "cmVnaXN0cmF0aW9uOg==" // Register default token of word "registration"
        ];

	}

	//---------------------------//
	// Class Methods
	//---------------------------//
	loadUsers() {
		// Load all users as JSON
		return JSON.parse(fs.readFileSync('./users.json', 'utf8').toString());
	};

	loadFavorites() {
		// Load all favorites as JSON
		return JSON.parse(fs.readFileSync('./favorites.txt', 'utf8').toString())[0].Favorite;
	};


	// Email validation for the registration endpoint
	validateEmail(email) {
		for (let i of this.users) {
			if (email === i.email) return true;
		}
		return false;
	}

	// Login validation method for the auth endpoint
	validateLogin(email, password) {
		for (let i of this.users) {
			if (email === i.email && password === i.password) return true;
		}
		return false;
    };
    

    searchToken(token) {
        for (let i of this.activeTokens) {
            if (i == token) return true;
        }
        return false;
	}
	

    deleteToken(token) { 
        for (let x in this.activeTokens) {
            if (this.activeTokens[x] == token) {
                this.activeTokens.splice(x,1)
            }
        }
    }

	// Getter that return created users
	get Users() {
		return this.users;
	}

	// Setter that add a new User
	set Users(newUser) {
		this.users.push(newUser);
		fs.writeFile('users.json', JSON.stringify(this.users), (err) => {
			if (err) throw err;
		});

	}

	//  Getter that return created all the favorites movies
	userFavorites(email) {
		let newList = [];
		for (let i of this.favorites) {
			if (email === i.email) newList.push(i);
		}
		return newList;
	}

	// Setter that add a new User
	addUserNewFavorite(email,newFavorites) {
		// Adds a new Movie into Favorites list
		this.favorites.push({"email":email,"movie":newFavorites});
		// Write the changes in the favorites json file
		fs.writeFile('favorites.json', JSON.stringify(this.favorites), (err) => {
			if (err) throw err; // if theres an error show it in the console
			console.log('new favorites added'); // if not, print successfull message
		});
	}

}


// Module exports clases and variable type System
module.exports = { User, Movie };
module.exports.system = new System();
