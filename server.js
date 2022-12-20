const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer
const inquirer = require("inquirer");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)

  // Function that starts the questions
  // startApplication();
);

// Query database
db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








































const fs = require("fs");


let employees = [];

// Message at beginning of application
console.log("-----EMPLOYEE TRACKER-----");

// Questions at the beginning for creating a manager
const questionsManager = [
  {
    type: "list",
    message: "Hello, please select the following to begin?",
    name: "name",
    choices: ["Start navigating database"],
  },

];

// Main question that will be asked everytime when creaitng a new employee
const mainQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "position",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
  },
];

// Questions for adding a departmentName
const questionsEngineer = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "name",
  },
];



// Questions for adding an employee
const questionsToAddEmployeeRole = [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "id",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "employeeRole",
      choices: ['Sales Lead', 'Sales Person', ' Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "employeeManager",
      choices: ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],
    },
  ];

// Questions for updating employee role
const questionsIntern = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    name: "name",
    choices: ["List of employee names"]
  },
  {
    type: "input",
    message: "What is the salary?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the department?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the team Intern's school?",
    name: "school",
  },
];






// Generates the HTML page after done creating employees
// function generateHTML() {
//   let cards = "";

//   for (let i = 0; i < employees.length; i++) {
//     if (employees[i].getRole() === "Manager") {
//       cards += generateManagerCard(employees[i]);
//     } else if (employees[i].getRole() === "Engineer") {
//       cards += generateEngineerCard(employees[i]);
//     } else if (employees[i].getRole() === "Intern") {
//       cards += generateInternCard(employees[i]);
//     } else {
//       console.log("Please create an employee!");
//     }
//   }

//   const template = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=, initial-scale=1.0" />
//     <link rel="stylesheet" href="style.css" />
//     <title>Team Generator</title>
//   </head>

//   <body>
//   <header class="my-team">
//     <h1 class="title">My Team</h1>
//   </header>

//   <div class="cards-container">
    
//       ${cards}
    
//   </div>  

//   <footer>
  
//   </footer>
//   </body>
// `;
//   return template;
// }






// Enables prompting of questions and takes in users input
inquirer.prompt(questionsManager).then((answers) => {
  let newManager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  employees.push(newManager);
  console.log(employees);
  mainQuestionFunction(); // Allows to loop through questions
});

// Asks the main question
function mainQuestionFunction() {
  inquirer.prompt(mainQuestion).then((answers) => {
    //"Engineer", "Intern", "I don't want to add anymore team members"
    if (answers.position === "Engineer") {
      inquirer.prompt(questionsEngineer).then((answers) => {
        let newEngineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.gitHub
        );
        employees.push(newEngineer);
        console.log(employees);
        mainQuestionFunction();
      }); //Allows to loop through questions
    } else if (answers.position === "Intern") {
      inquirer.prompt(questionsIntern).then((answers) => {
        let newIntern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        employees.push(newIntern);
        console.log(employees);
        mainQuestionFunction(); //Allows to loop through questions
      });
    } else {
      console.log("Generating team");
      console.log(employees);

      fs.writeFile("./dist/output.html", generateHTML(), (err) => {
        if (err) {
          throw err;
        } else {
          console.log("Generating Team Profiles!");
        }
      });
    }
  });
}