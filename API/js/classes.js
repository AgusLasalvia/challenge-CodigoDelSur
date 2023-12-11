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
    constructor(title,overview,id) {
        this.title = title;
        this.overview = overview;
        this.id = id;
    }
}


class System {
    // Contrsutcor for the class System
    constructor() {
        this.users = [] // Automatically load the users in the users.txt
        this.favorites = [] // Automatically load the users in the users.txt
        this.activeTokens = [
            "bG9naW46", // Login default token of world "login"
            "cmVnaXN0cmF0aW9uOg==" // Register default token of word "registration"
        ];
        this.loadUsers();
        this.loadFavorites();

    }

    //---------------------------//
    // Class Methods
    //---------------------------//

    loadUsers() {
        this.users = require('./users.json');
    }

    loadFavorites() {
        this.favorites = require('./favorites.json');
    }
    // Getter that return created users
    get Users() {
        return this.users;
    }

    // Setter that add a new User
    set Users(newUser) {
        this.users.push(newUser);
        this.saveUsers();
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
    addUserNewFavorite(email, newFavorites) {
        // Adds a new Movie into Favorites list
        this.favorites.push({ "email": email, "movie": newFavorites });
        this.saveFavorites();
    }



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
                this.activeTokens.splice(x, 1)
            }
        }
    }


    //Save methods
    saveFavorites() {
        // Write the changes in the favorites json file
        fs.writeFile(__dirname + '/favorites.json', JSON.stringify(this.favorites), (err) => {
            if (err) throw err; // if theres an error show it in the console
            // console.log('new favorites added'); // if not, print successfull message
        });
    }

    saveUsers() {
        fs.writeFile(__dirname + "/users.json", JSON.stringify(this.users), (err) => {
            if (err) throw err;
        });
    }



}


// Module exports clases and variable type System
module.exports = { User,Movie };
module.exports.system = new System();
