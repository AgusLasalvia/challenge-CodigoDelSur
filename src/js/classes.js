const fs = require('fs');

class User {
    constructor(email,password,firstName,lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class System {
    constructor() {
        this.users = [];
        this.favorites = [];
    }


    loadUsers() {
        this.users.
    };
    loadFavorites() { };


    get Users() {
        return this.users;
    }


    set Users(newUser) {
        this.users.push(newUser);
        // Update txt
    }
}

module.exports.user = User;
module.exports.system = new System();
