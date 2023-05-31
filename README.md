# Employee Tracker

![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description
The application **employee-tracker** allows a user to easily view and interact with information from a database named company_db. Users can manage employees, departments and roles within the database. Users can choose to view or add departments, roles and employess.  Employee roles can also be updated.

Because this application is not deployed, the following walkthrough videos  demonstrate the **employee-tracker** application's functionality:

[employee-tracker: Create company_db and Seed company_db](https://drive.google.com/file/d/1Six1kU4hn1X963Gv4A5N__MzUkTwPNNo/view)

[employee-tracker: View, add, & update: Departments, Roles, and Employees](https://drive.google.com/file/d/1IAdipFMhxhUu9oxwMjVpjX830kDwVGyb/view)


## Installation

This application requires Node.JS to be installed. The user should run ```npm install``` in their terminal to load the following npm packages: Express.js (version 4.18.2), mysql2 (version 3.3.1), and Inquier (version 8.2.4).

## Usage

In the MySQL shell, create the database company_db and load the tables by typing in the following command

```source schema.sql``` 

Next to seed the database, type the following in the command line 

```source seeds.sql```

To invoke the application, run the following command in the terminal.

```node server.js```

A functional menu is presented to the user with various commands. Use the arrow keys to select from the menu.  The user can choose to view, add, or update employees. They can also choose to view or add departments and roles. Once the user has selected what they would like to do, they should follow the prompts and answer accordingly.  Their answers will be added to the company database.

## Credits

Online resources were beneficial in figuring out a few key concepts. Some that were referenced were self joins, queries with promises and object data manipulation for use in inquirer prompt lists. 

Stackoverflow, npm package documentation and Unit 12 SQL had many helpful examples.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Questions
For any further information about this application or questions you might have, please visit my GitHub profile
[meghansimmons](https://github.com/meghansimmons/employee-tracker).