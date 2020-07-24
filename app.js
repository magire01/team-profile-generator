const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const teamID = [];


function menu() {
    function createManager() {
        console.log("Please build your team: ");
        inquirer.prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "managerName",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                return "Please enter the manager's name!!";
                }
            }, 
            {
                type: "input",
                message: "What is the manager's ID?",
                name: "managerID",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/)
                    if(pass) {
                        return true;
                    }
                    return "Please enter a number!";
                }
            },
            {
                type: "input",
                message: "What is the manager's email?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "managerOffice",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/)
                    if(pass) {
                        return true;
                    }
                    return "Please enter a number!";
                }
            }
        ]).then(responses => {
            const manager = new Manager (responses.managerName, responses.managerID, responses.managerEmail, responses.managerOffice);
            teamMembers.push(manager);
            teamID.push(responses.managerID);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "None"],
                name: "teamType"
            }
        ]).then(teamRes => {
            switch(teamRes.teamType) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        })
    }
    //Build add engineer function
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What the Engineer's name?",
                name: "engineerName",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                return "Please enter the engineer's name!!";
                }
            },
            {
                type: "input",
                message: "What is the Engineer's ID?",
                name: "engineerID",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/)
                    if(pass) {
                        return true;
                    }
                    return "Please enter a number!";
                }
            },
            {
                type: "input",
                message: "what is the Engineer's email?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "what is the Engineer's Github profile link",
                name: "engineerLink",
            }
        ]).then(engineerRes => {
            const engineer = new Engineer(engineerRes.engineerName, engineerRes.engineerID, engineerRes.engineerEmail, engineerRes.engineerLink);
            teamMembers.push(engineer);
            teamID.push(engineerRes.engineerID);
            createTeam();
        })
    }
    //Build add intern function
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What the intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is the intern's ID?",
                name: "internID",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if(pass) {
                        return true;
                    }
                    return "Please enter a number!";
                }
            },
            {
                type: "input",
                message: "what is the intern's email?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "what is the intern's school name?",
                name: "internSchool",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                return "Please enter the engineer's name!!";
                }
            }
        ]).then(internRes => {
            const intern = new Intern(internRes.internName, internRes.internID, internRes.internEmail, internRes.internSchool);
            teamMembers.push(intern);
            teamID.push(internRes.internID);
            createTeam();
        });
    }
    function buildTeam() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();
}

menu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
