const Employee = require("./Employee");

// Intern class inherits from Employee class
class Intern extends Employee {
    // constructor for Intern class
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    // method that returns Employee school
    getSchool() {
        return this.school;
    }

    // method that returns Employee role
    getRole() {
        return "Intern";
    }
}

// export the Intern class
module.exports = Intern;