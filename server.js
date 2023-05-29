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
      console.log("this is case 2");
      break;
    case 'Update Employee Role':
      console.log("this is case 3");
      break; 
    case 'View All Roles':
      console.log();
      viewAllRoles();
      console.log();
      break;
    case 'Add Role':
      console.log("this is case 5");
      break;
    case 'View All Departments':
      console.log();
      viewAllDepartments();
      console.log();
      break;     
    case 'Add Department':
      console.log("this is case 7");
      break;
    default:
      // code block
  };
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
 

  // db.connect(function(err) {
  //   if (err) throw err;
  //   db.query("SELECT * FROM department", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //   });
  // });
  init(); 
};

function viewAllEmployees(){
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id AS manager FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id`;
  
  db.query(sql, function (err, result, fields){
    console.table(result);
  });
  init();
};

function viewAllRoles(){
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id`;
  db.query(sql, function (err, result, fields){
    console.table(result);
  });
  init();
};


// Calls the function init() after the index.js is run in the integrated terminal
init();
