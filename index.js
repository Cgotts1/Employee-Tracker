// Bring in inquirer
const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
// const Employee = require("./lib/Employee")

let employees = [];

// Message at beginning of application
console.log("Please build your team!");

// Questions at the beginning for creating a manager
const questionsManager = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "name",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
  },

];

// Main question that will be asked everytime when creaitng a new employee
const mainQuestion = [
  {
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "position",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
  },
];

// Questions for adding an Engineer
const questionsEngineer = [
  {
    type: "input",
    message: "What is the Department's name?",
    name: "name",
  },
];

// Questions for adding an Intern
const questionsIntern = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "name",
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


// Questions for adding an Intern
const questionsEmployee = [
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
      type: "input",
      message: "What is the employee's role?",
      name: "email",
    },
    {
      type: "input",
      message: "Who is the employee's manager?",
      name: "school",
    },
  ];




// Generates the HTML page after done creating employees
function generateHTML() {
  let cards = "";

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].getRole() === "Manager") {
      cards += generateManagerCard(employees[i]);
    } else if (employees[i].getRole() === "Engineer") {
      cards += generateEngineerCard(employees[i]);
    } else if (employees[i].getRole() === "Intern") {
      cards += generateInternCard(employees[i]);
    } else {
      console.log("Please create an employee!");
    }
  }

  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Team Generator</title>
  </head>



  <body>
  <header class="my-team">
    <h1 class="title">My Team</h1>
  </header>

  <div class="cards-container">
    
      ${cards}
    
  </div>  

  <footer>
  
  </footer>
  </body>
`;
  return template;
}

// Generates the Manager Card
function generateManagerCard(manager) {
  const template = `
<div class="card">
        <h2 class="name">${manager.name}</h2>
        <h3 class="role">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cup-hot-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5Z"
            />
            <path
              d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z"
            /></svg
          > ${manager.getRole()}
</h3>

        <div class="info">
          <h4>ID: ${manager.id}</h4>
          <h4>Email:<a href = "mailto:${manager.email}">${
    manager.email
  }</a></h4>
          <h4>Office number: ${manager.officeNumber}</h4>
        </div>
      </div>
`;
  return template;
}

// Generates the Engineer Card
function generateEngineerCard(engineer) {
  const template = `

<div class="card">
        <h2 class="name">${engineer.name}</h2>
        <h3 class="role">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
              </svg> ${engineer.getRole()}
        </h3>

        <div class="info">
          <h4>ID: ${engineer.id}</h4>
          <h4>Email:<a href = "mailto:${engineer.email}">${
    engineer.email
  }</a></h4>
          <h4>Github: <a href = "https://github.com/${
            engineer.gitHub
          }" target = "_blank">${engineer.gitHub}</a></h4>
        </div>
</div>
`;
  return template;
}

// Generates the Intern Card
function generateInternCard(intern) {
  const template = `

<div class="card">
        <h2 class="name">${intern.name}</h2>
        <h3 class="role">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
              </svg> ${intern.getRole()}
        </h3>

        <div class="info">
          <h4>ID: ${intern.id}</h4>
          <h4>Email:<a href = "mailto:${intern.email}">${intern.email}</a></h4>
          <h4 title = "school">School: ${intern.school}</h4>
        </div>
      </div>
`;
  return template;
}

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