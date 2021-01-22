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
const {
    hasUncaughtExceptionCaptureCallback
} = require("process");
const Employee = require("./lib/Employee");

const Employees = [];
var htmlJohn;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const genericQuestions = [{
        type: "input",
        message: "Enter your email address: ",
        name: "email",
        validate: emailEntry => {
            var checkEmail = validator.validate(emailEntry);
            if (checkEmail) {
                return true;
            }
            else {
                console.log ("Please enter an email address!");
            }
        }
    },
    {
        type: "input",
        message: "Enter the ID: ",
        name: "id",
        validate: idEntry => {
            if (!isNaN(idEntry)) {
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
        type: "input",
        message: "Enter name: ",
        name: "name",
        validate: nameEntry => {
            if (nameEntry) {
                return true;
            }
            else {
                console.log ("Please enter a name!");
            }
        }
    }
]

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const mgrQuestion = [{
    type: "input",
    message: "Enter the office number: ",
    name: "officeNumber",
    validate: officeEntry => {
        if (!isNaN(officeEntry)) {
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

const internQuestion = [{
    type: "input",
    message: "Enter your school: ",
    name: "school",
    validate: schoolEntry => {
        if (schoolEntry) {
            return true;
        }
        else {
            console.log ("Please enter a school!");
        }
    }
}]

const engineerQuestion = [{
    type: "input",
    message: "Enter your GitHub name: ",
    name: "github",
    validate: githubEntry => {
        if (githubEntry) {
            return true;
        }
        else {
            console.log ("Please enter a Github name!");
        }
    }
}]

const numberEmp = [{
    type: "input",
    message: "How many employees?: ",
    name: "numberEmployees",
    validate: empCountEntry => {
        if (!isNaN(empCountEntry)) {
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

const empRole = [{
    type: "list",
    message: "What is this team member's role?: ",
    choices: ["Engineer", "Intern"],
    name: "role",
}]

async function init() {

    console.log("First, enter the Team Manager information");
    var general = await inquirer.prompt(genericQuestions)
    var general1 = await inquirer.prompt(mgrQuestion)

    const manager = new Manager(general.name, general.id, general.email, general1.officeNumber);
    Employees.push(manager)

    var numEmployees = await inquirer.prompt(numberEmp);

    console.log("Now, enter each Team Member's information");
    for (let i = 0; i < numEmployees.numberEmployees; i++) {
        var role = await inquirer.prompt(empRole);
        var general = await inquirer.prompt(genericQuestions);

        if (role.role === "Engineer") {
            var eng = await inquirer.prompt(engineerQuestion);
            var engineer = new Engineer(general.name, general.id, general.email, eng.github);
            Employees.push(engineer);
        } else {
            var intern = await inquirer.prompt(internQuestion);
            var internMember = new Intern(general.name, general.id, general.email, intern.school);
            Employees.push(internMember);
        }
    }
    console.log(Employees);
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
    htmlJohn = render(Employees);
    writeFile();
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function writeFile() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        console.log("directory doesn't exist");
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, htmlJohn, (err) =>
    err ? console.error(err) : console.log('Success'));
}

init();