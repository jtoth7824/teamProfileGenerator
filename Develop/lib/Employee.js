// Employee class
class Employee {
    // constructor for Employee class, 3 parameters
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // method to return Employee name
    getName() {
        return this.name;
      }
    // method to return Employee ID
    getId() {
        return this.id;
    }
    // method to return Employee email
    getEmail() {
        return this.email;
    }
    // method to return Employee role
    getRole() {
        return "Employee";
    }
}

// export Employee class
module.exports = Employee;