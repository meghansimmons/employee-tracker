require('dotenv').config()

// packages needed for this application
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.password,
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


// array of questions for user input
const questions = [
  {
    type: 'list',
    name: 'company',
    message: 'What would you like to do?',
    choices: ['View All Employees',
              'Add Employee',
              'Update Employee Role',
              'View All Roles',
              'Add Role',
              'View All Departments',
              'Add Department'
            ],
  }
];

// function init() prompts the user for information about the project in the integrated terminal
function init() {
inquirer
.prompt(questions)
.then((responses) => {
  // console.log(responses.license);
  switch(responses.company) {
    case 'View All Employees':
      console.log();
      viewAllEmployees();
      console.log();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'Update Employee Role':
      console.log();
      updateEmployee();
      console.log();
      break; 
    case 'View All Roles':
      console.log();
      viewAllRoles();
      console.log();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'View All Departments':
      console.log();
      viewAllDepartments();
      console.log();
      break;     
    case 'Add Department':
      addDepartment();
      break;
    default:
      // code block
  };
});
};

function viewAllEmployees(){
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee LEFT JOIN employee m ON m.id = employee.manager_id JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id`;
  
  db.query(sql, function (err, result, fields){
    console.table(result);
  });
  init();
};

function addEmployee(){
  inquirer
    .prompt([  
      {
      type: 'input',
      name: 'first',
      message: 'What is the employee\'s first name?'
      },
      {
      type: 'input',
      name: 'last',
      message: 'What is the employee\'s last name?'
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: ['Sales Lead',
        'Lead Engineer',
        'Customer Service']
        }
    ])
    .then((newEmployee) => {
      console.log(`Added ${newEmployee.first} ${newEmployee.last} to the database`);
      const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${newEmployee.first}', '${newEmployee.last}', 9)`;
      db.query(sql, function (err, result, fields){
      });
    })
    .then(() => {
      init();
    });
};



function addDepartment(){
  inquirer
    .prompt(  
      {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?'
      })
    .then((newDepartment) => {
      console.log(`Added ${newDepartment.department} to the database`);
      const sql = `INSERT INTO department (name) VALUES ('${newDepartment.department}')`;
      db.query(sql, function (err, result, fields){
      });
    })
    .then(() => {
      init();
    });
};

function updateEmployee (){
  const sql = `SELECT e.last_name AS Employee, m.last_name AS Manager FROM employee e JOIN employee m ON e.manager_id = m.id`;
  db.query(sql, function (err, result) {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else {
      console.table(result);
    }
  });
}

function viewAllRoles(){
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id`;
  db.query(sql, function (err, result, fields){
    console.table(result);
  });
  init();
};

function addRole(){
  inquirer
    .prompt([  
      {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?'
      },
      {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'dept',
        message: 'Which department does the role belong to?',
        choices: ['Sales',
        'Engineering',
        'Finance',
        'Legal',
        'Service']
        }
    ])
    .then((newRole) => {
      console.log(`Added ${newRole.title} to the database`);
      const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${newRole.title}', '${newRole.salary}', 5)`;
      db.query(sql, function (err, result, fields){
      });
    })
    .then(() => {
      init();
    });
};

function viewAllDepartments(){
  const sql = "SELECT id, name AS department FROM department";
  
  db.query(sql, function (err, result, fields){
    // if (err) {
    //   res.status(500).json({ error: err.message });
    //    return;
    // }
    // res.json({
    //   message: 'success',
    //   data: result
    // });
    console.table(result);
  });
  init();
};

// function addDepartment(){
//   inquirer
//     .prompt(  
//       {
//       type: 'input',
//       name: 'department',
//       message: 'What is the name of the department?'
//       })
//     .then((newDepartment) => {
//       console.log(`Added ${newDepartment.department} to the database`);
//     })
//     .then(() => {
//       init();
//     });
// };
 

//   // db.connect(function(err) {
//   //   if (err) throw err;
//   //   db.query("SELECT * FROM department", function (err, result, fields) {
//   //     if (err) throw err;
//   //     console.log(result);
//   //   });
//   // });
//   init(); 
// };






function viewAllManagers(){
  const sql = `SELECT e.last_name AS Employee, m.last_name AS Manager FROM employee e JOIN employee m ON e.manager_id = m.id`;
  db.query(sql, function (err, result, fields){

    console.table(result);
  });
  init();
};



// Calls the function init() after the index.js is run in the integrated terminal
init();

app.listen(PORT, () => {});