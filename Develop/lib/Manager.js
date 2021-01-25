const Employee = require("./Employee");

// Manager class inherits from Employee class
class Manager extends Employee {
    // constructor for Manager class
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // method to return Employee role
    getRole() {
        return "Manager";
    }

    // method to return office number
    getOfficeNumber() {
        return this.officeNumber;
    }
}

// Export the Manager class
module.exports = Manager;