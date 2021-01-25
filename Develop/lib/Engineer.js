const Employee = require("./Employee");

// Engineer class that inherits from Employee class
class Engineer extends Employee {
    // constructor for Engineer class
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    // method that returns the Github name
    getGithub () {
        return this.github;
    }

    // method that returns the Employee role
    getRole () {
        return "Engineer";
    }
}

// export Engineer class
module.exports = Engineer;