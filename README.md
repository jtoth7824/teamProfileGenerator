# teamProfileGenerator

## Description

This project demonstrates a command line input (CLI) application that gathers employee information for the make-up of a team.    JavaScript classes were utilized to show inheritance for sub-classes.  (All team members are considered an Employee with a name, an ID, and an email.)  Initially, the application requests user to enter information for the team manager.   The team manager also requires an office number.  Once the team manager is created, the user is free to enter any number of employees of either Engineer or Intern types.  If user chooses an Engineer employee, then they are required to enter a Github username.  If the user chooses an Intern employee, then they are required to enter a school.

Once the final block of employee information is entered, an HTML file is output that displays the particular information for the team members.

The application utilized the Inquirer package to retrieve the user input.  It also utilized an email-validator package to validate if the entered email address is correct formatted.  Node.js is used to execute the application at the command line.

As an added bonus, the user inputs are all validated for correct information before allowing the prompts to continue.  

## Table of Contents

* [Screenshots](#Screenshots)
* [Installation](#Installation)
* [Usage](#Usage)
* [Support](#Support)
* [Technologies](#Technologies)
* [Video](#Video)
* [Repository](#Repository)
* [Output](#Output)

## Screenshots
 
The following is a screenshot of the Team Profile Generator application.

<p align="center">
  <img src="./assets/images/teamProfileGenerator.png" alt="Team Profile Generator application screenshot">
</p>

## Installation

* Install node.js to computer, if not already present.
    * Node.js can be installed from [here](https://nodejs.org/en/)
* Copy all the application files in folder 'Develop' locally to one's machine.
* In a terminal window where you copied the files, install 'inquirer' using node package manager (npm)
    * **npm install inquirer**
* Then install 'email-validator' using npm
    * **npm install email-validator**

## Usage

This application requires Node.js to be installed.  It also requires the user to have installed 'Inquirer' and 'email-validator' via npm.  (See [Installation](#installation) section.)  Once these items have been installed, the user can launch the application from a terminal window as follows:

**node app.js**

The application will proceed to ask the user a series of questions about the make-up of the team profile to be generated.   Specifically, information about the team manager and then however many engineers and/or interns the user would like to add to the team.

## Support

Please email me for further information
<div><h5>John Toth</h5>jtoth7824@gmail.com</div>


## Technologies

<div>Node.js</div>
<div>Classes</div>
<div>Javascript</div>
<div>npm</div>
<div>HTML</div>
<div>CSS</div>

## Video

Due to there being no front end to this project that a user can open in a browser, please view the following video link to get a feel for how the command line application is executed and types of inputs required by the user in order to generate the team profile.

https://drive.google.com/file/d/1UeRR1pywB0RzW9oeA2HV9D6JtXeJyhOR/view?usp=sharing

## Repository

Direct link to repository:  https://github.com/jtoth7824/teamProfileGenerator

## Output

The following link shows a sample team profile html file generated with this application

https://github.com/jtoth7824/teamProfileGenerator/blob/main/team.html