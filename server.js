// Import and require mysql2
const mysql = require("mysql2");
// Import inquirer
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "root",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

//---------------------------------------------------------------------------------
// Message at beginning of application
console.log("-----EMPLOYEE TRACKER-----");

// Question at the beginning of the application
const startQuestion = [
  {
    type: "list",
    message: "Hello, would you like to start using the database?",
    name: "name",
    choices: ["Start", "Quit"],
  },
];

// Main question that will be asked everytime when creaitng a new employee
const mainQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

//----------------------------------------------------------------------------
// Function for when view all employees is selected
function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results); // Formatting
    mainQuestionFunction();
  });
}

// Function for when view all roles is selected
function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    mainQuestionFunction();
  });
}

// Function for when view all departments is selected
function viewAllDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    console.table(results);
    mainQuestionFunction();
  });
}

// -----------------------------------------------------------------

let newEmployee = [];

// Questions for adding an Employee
const employeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lastName",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "role",
    choices: [
      "Sales Lead",
      "Sales Person",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
    ],
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager",
    choices: [
      "John Doe",
      "Mike Chan",
      "Ashley Rodriquez",
      "Kevin Tupik",
      "Kunal Singh",
      "Malia Brown",
      "Sarah Lourd",
      "Tom Allen",
    ],
  },
];

// Stores answers
let newRole = [];

// Questions for adding a role
const roleQuestions = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "roleSalary",
  },
  {
    type: "list",
    message: "What department does the role belong to?",
    name: "roleDepartment",
    choices: ["Sales", "Engineering", "Finance", "Legal"],
  },
];

// Stores answers
let newDepartment = [];

// Question for adding a department
const departmentQuestion = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
  },
];

//----------------------------------------------------------------------

let newUpdate = [];

const updateEmployeeRoleQuestions = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    name: "updateName",
    choices: [
      "John Doe",
      "Mike Chan",
      "Ashley Rodriquez",
      "Kevin Tupik",
      "Kunal Singh",
      "Malia Brown",
      "Sarah Lourd",
      "Tom Allen",
    ],
  },
  {
    type: "list",
    message: "What role do you want to assign to the selected employee?",
    name: "updateAssign",
    choices: [
      "Sales Lead",
      "Sales Person",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
    ],
  },
];

// Enables prompting of questions and takes in users input
inquirer.prompt(startQuestion).then((answers) => {
  if (answers.name === "Quit") {
    return Quitting;
  } else {
    mainQuestionFunction(); // Allows to loop through questions
  }
});

// Asks the main question
function mainQuestionFunction() {
  inquirer.prompt(mainQuestion).then((answers) => {
    if (answers.choice === "View All Employees") {
      viewAllEmployees();
    } else if (answers.choice === "View All Roles") {
      viewAllRoles();
    } else if (answers.choice === "View All Departments") {
      viewAllDepartments();
    } else if (answers.choice === "Add Employee") {
      inquirer.prompt(employeeQuestions).then((answers) => {
        let employeeResultsFirstName = [`${answers.firstName}`];
        let employeeResultsLastName = [`${answers.lastName}`];
        let employeeResultsRole = [`${answers.role}`];
        let employeeResultsManager = [`${answers.manager}`];
        let employeeResults = [
          `${answers.firstName} ${answers.lastName}, ${answers.role}, ${answers.manager}`,
        ];
        newEmployee.push(employeeResults);

        db.query(
          `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', 1, null)`,
          function (err, results) {
            if (err) throw err;
          }
        );

        console.log(newEmployee);
        console.log(
          `Added ${answers.firstName} ${answers.lastName} to the database`
        );
        mainQuestionFunction(); //Allows to loop through questions
      });

      // addEmployee()
    } else if (answers.choice === "Add Role") {
      inquirer.prompt(roleQuestions).then((answers) => {
        let roleResultName = [`${answers.roleName}`];
        let roleResultSalary = [`${answers.roleSalary}`];
        let roleResultDepartment = [`${answers.roleDepartment}`];
        let roleResults = [
          `${answers.roleName}, ${answers.roleSalary}, ${answers.roleDepartment}`,
        ];
        newRole.push(roleResults);

        db.query(
          `INSERT INTO role(title, salary, department_id) VALUES ('${roleResultName}', '${roleResultSalary}', 5)`,
          function (err, results) {
            if (err) throw err;
          }
        );

        console.log(newRole);
        console.log(`Added ${answers.roleName} to the database`);
        mainQuestionFunction(); //Allows to loop through questions
      });
    } else if (answers.choice === "Add Department") {
      inquirer.prompt(departmentQuestion).then((answers) => {
        let departmentResults = [`${answers.departmentName}`];
        newDepartment.push(departmentResults);

        db.query(
          `INSERT INTO department(name) VALUES ('${departmentResults}')`,
          function (err, results) {
            if (err) throw err;
          }
        );

        console.log(newDepartment);
        console.log(`Added ${answers.departmentName} to the database`);
        mainQuestionFunction(); //Allows to loop through questions
      });
    } else if (answers.choice === "Update Employee Role") {
      inquirer.prompt(updateEmployeeRoleQuestions).then((answers) => {
        let updateResults = [`${answers.updateName}, ${answers.updateAssign}`];
        newUpdate.push(updateResults);
        console.log(newUpdate);
        console.log(`Updated Employee's Role`);
        mainQuestionFunction(); //Allows to loop through questions
      });
    } else if (answers.choice === "Quit") {
      quit();
    } else {
      return "Exiting Application";
    }
  });
}

// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = `INSERT INTO department (id,name) VALUES (5, ${answers.departmentName})`;
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

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
