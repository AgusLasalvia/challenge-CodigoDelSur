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
        this.users = this.loadUsers() 
        this.favorites = this.loadUsers()

    }


    loadUsers() {  
		// Load all users as JSON
		return JSON.parse(fs.readFileSync(__dirname+'/users.txt', 'utf8').toString());
	};

    loadFavorites() { 
		// Load all favorites as JSON
		return JSON.parse(fs.readFileSync(__dirname+'/favorites.txt', 'utf8').toString());
	 };


	// Getter that return created users
    get Users() {
        return this.users;
    }

	// Setter that add a new User
    set Users(newUser) {
        this.users.push(newUser);
        // Update txt
    }
	
	// Email validation for the registration endpoint
	validateEmail = (email) => {
    	for (let i of this.users) {
        	if (email === i.email) return true;
    	}
    	return false;
	}
	
	// Login validation method for the auth endpoint
	validateLogin = (email, password) => {
	for (let i of this.users) {
		if (email === i.email && password === i.password) return true;
	}
	return false;
};


}

module.exports.user = User;
module.exports.system = new System();
