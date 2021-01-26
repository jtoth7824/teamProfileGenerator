const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validator = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const Employees = [];
var renderedPage;

// Array to hold answers to generic questions applicable for all employee types
const genericQuestions = [{
    // Ask user for validly formatted email address
        type: "input",
        message: "Enter your email address: ",
        name: "email",
        // Validation of email address, utilized an npm package that was installed for validation
        validate: emailEntry => {
            var checkEmail = validator.validate(emailEntry);
            if (checkEmail) {
                return true;
            }
            else {
                console.log ("Please enter a validly formatted email address!");
            }
        }
    },
    {
        // Ask user for an ID number
        type: "input",
        message: "Enter the ID: ",
        name: "id",
        validate: idEntry => {
            // Check that entry is a number
            if (!isNaN(idEntry)) {
                // Check that entry is not an empty string
                if(!(idEntry === "")) {
                    return true;
                }
                console.log("You must enter an ID number.");
            }
            else {
                console.log ("Please enter a number for the ID!");
            }
        }
    },
    {
        // Ask user for name
        type: "input",
        message: "Enter name: ",
        name: "name",
        validate: nameEntry => {
            // Check that user entered a string for name
            if (nameEntry) {
                return true;
            }
            else {
                console.log ("Please enter a name!");
            }
        }
    }
]

// Array for answer to office number
const mgrQuestion = [{
    // Ask user for the manager office number
    type: "input",
    message: "Enter the office number: ",
    name: "officeNumber",
    validate: officeEntry => {
        // Check that office number is a number
        if (!isNaN(officeEntry)) {
            // Check that office number is not blank
            if(!(officeEntry === "")) {
                return true;
            }
            console.log("You must enter an office number.");
        }
        else {
            console.log ("Please enter a number for the office number!");
        }
    }
}]

// Array for Intern specific answers
const internQuestion = [{
    // Ask user for Intern school name
    type: "input",
    message: "Enter your school: ",
    name: "school",
    validate: schoolEntry => {
        // Check that user provided a string
        if (schoolEntry) {
            return true;
        }
        else {
            console.log ("Please enter a school!");
        }
    }
}]

// Array for Engineer specific answers
const engineerQuestion = [{
    // Ask user for Engineer Github name
    type: "input",
    message: "Enter your GitHub name: ",
    name: "github",
    validate: githubEntry => {
        // Check that user provided a string
        if (githubEntry) {
            return true;
        }
        else {
            console.log ("Please enter a Github name!");
        }
    }
}]

// Array for user input regarding how many employees will be created
const numberEmp = [{
    // Ask user for how many employees to create
    type: "input",
    message: "How many employees?: ",
    name: "numberEmployees",
    validate: empCountEntry => {
        // Check that number of employees is a number
        if (!isNaN(empCountEntry)) {
            // Check that user entered something
            if(!(empCountEntry === "")) {
                return true;
            }
            console.log("You must enter how many employees.");
        }
        else {
            console.log ("Please enter a number for the employee count!");
        }
    }
}]

// Array for user input regarding role of each employee (Engineer or Intern)
const empRole = [{
    type: "list",
    message: "What is this team member's role?: ",
    choices: ["Engineer", "Intern"],
    name: "role",
}]

async function init() {

    // Initial instructions to user
    console.log("First, enter the Team Manager information");
    // Query user for answers to generic questions for the manager, wait until all answers provided before advancing to next line
    var mgr = await inquirer.prompt(genericQuestions)
    // Query user for answer to manager question, wait until answer provided before advancing to next line
    var mgr1 = await inquirer.prompt(mgrQuestion)

    // Create new Manager object
    const manager = new Manager(mgr.name, mgr.id, mgr.email, mgr1.officeNumber);
    // Push Manager object to Employees array
    Employees.push(manager)

    // Query user for number of employees to create (Engineer/Intern), wait until answer provided before advancing to next line
    var numEmployees = await inquirer.prompt(numberEmp);

    // Another instructional line to the user
    console.log("Now, enter each Team Member's information");
    // Loop to create all the employees based upon user entry
    for (let i = 0; i < numEmployees.numberEmployees; i++) {
        // Query user for role of employee, wait until answer provided before advancing to next line
        var role = await inquirer.prompt(empRole);
        // Query user for generic questions, wait until all answers provided before advancing to next line
        var general = await inquirer.prompt(genericQuestions);

        // Decide which type of employee specific information is needed
        if (role.role === "Engineer") {
            // Query user for Engineer question, wait until answer provided before advancing to next line
            var eng = await inquirer.prompt(engineerQuestion);
            // Create a new Engineer object
            var engineer = new Engineer(general.name, general.id, general.email, eng.github);
            // Push Engineer object to Employees array
            Employees.push(engineer);
        } else {
            // Query user for Intern question, wait until answer provided before advancing to next line
            var intern = await inquirer.prompt(internQuestion);
            // Create a new Intern object
            var internMember = new Intern(general.name, general.id, general.email, intern.school);
            // Push Intern object to Employees array
            Employees.push(internMember);
        }
    }

    // Pass the Employees function to the render function to generate the output html page
    renderedPage = render(Employees);
    // Call function to write out the html file
    writeFile();
}

// Function that writes out the html file
function writeFile() {
    // Check if the specified output directory already exists
    if(!fs.existsSync(OUTPUT_DIR)) {
        // Since directory doesn't exist, create the specified directory
        fs.mkdirSync(OUTPUT_DIR);
    }
    // Write out the html page to a file
    fs.writeFile(outputPath, renderedPage, (err) =>
    err ? console.error(err) : console.log('Success'));
}

// initial function that kicks off the application
init();