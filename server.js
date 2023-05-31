//package used to keep sensitive data protected
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
  switch(responses.company) {
    case 'View All Employees':
      viewAllEmployees();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'Update Employee Role':
      updateEmployee();
      break; 
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'View All Departments':
      viewAllDepartments();
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
  db.promise().query(sql)
  .then( ([allEmployees,fields]) => {
    console.table(allEmployees);
  })
  .then(() => {
    init();
  });
};

function addEmployee(){
  const sql = `SELECT title AS name, id AS value FROM role`;
  db.promise().query(sql)
  .then(([roles,fields]) => {
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
        choices: roles
      }
    ])
    .then((newEmployee) => {
      const sql = `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`;
      db.promise().query(sql)
      .then(([manager,fields]) => {
        inquirer
         .prompt([ 
         {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: manager
          }
        ])
        .then((newManager) => {
          console.log(`Added ${newEmployee.first} ${newEmployee.last} to the database`);
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newEmployee.first}', '${newEmployee.last}', '${newEmployee.role}', '${newManager.manager}')`;
          db.promise().query(sql)
        })
        .then(() => {
         init();
        })
      })
    })
  });
};

function updateEmployee(){
  const sql = `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`;
  db.promise().query(sql)
  .then(([employee,fields]) => {
  inquirer
    .prompt([  
      {
        type: 'list',
        name: 'role',
        message: 'Which employee\'s role do you want to update?',
        choices: employee
      }
    ])
    .then((newEmployee) => {
      const sql = `SELECT title AS name, id AS value FROM role`;
      db.promise().query(sql)
      .then(([role,fields]) => {
        inquirer
         .prompt([ 
         {
            type: 'list',
            name: 'manager',
            message: 'Which role do you want to assign the selected employee?',
            choices: role
          }
        ])
        .then((updatedRole) => {
          console.log('Updated employee\'s role');
          const sql = `UPDATE employee SET role_id = ${updatedRole.manager} WHERE id = ${newEmployee.role}`;
          db.promise().query(sql)
        })
        .then(() => {
         init();
        })
      })
    })
  });
};

function viewAllRoles(){
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id`;
  db.promise().query(sql)
  .then( ([allRoles,fields]) => {
    console.table(allRoles);
  })
  .then(() => {
    init();
  });
};

function addRole(){
  const sql = `SELECT name, id AS value FROM department`;
  db.promise().query(sql)
  .then( ([depts,fields]) => {
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
        choices: depts
      }
    ])
    .then((newRole) => {
      console.log(`Added ${newRole.title} to the database`);    
      const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${newRole.title}', '${newRole.salary}', '${newRole.dept}')`;
      db.promise().query(sql)
    })
    .then(() => {
      init();
    });
  });
};

function viewAllDepartments(){
  const sql = `SELECT id, name AS department FROM department`;
  db.promise().query(sql)
  .then( ([allDepts,fields]) => {
    console.table(allDepts);
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
      db.promise().query(sql)
    })
    .then(() => {
      init();
    });
};

function viewAllManagers(){
  const sql = `SELECT e.last_name AS Employee, m.last_name AS Manager FROM employee e JOIN employee m ON e.manager_id = m.id`;
  db.promise().query(sql)
  .then( ([allManagers,fields]) => {
    console.table(allManagers);
  })
  .then(() => {
    init();
  });
};

// Calls the function init() 
init();

app.listen(PORT, () => {});