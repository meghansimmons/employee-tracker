INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (department_id, title, salary)
VALUES (1, "Sales Lead", 100000),
       (1, "Salesperson", 80000),
       (2, "Lead Engineer", 150000),
       (2, "Software Engineer", 120000),
       (3, "Account Manager", 160000),
       (3, "Accountant", 125000),
       (4, "Legal Team Lead", 250000),
       (4, "Lawyer", 190000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "John", "Doe", NULL),
       (2, "Mike", "Chan", 1),
       (3, "Ashley", "Rodriquez", NULL),
       (4, "Kevin", "Tupik", 3),
       (5, "Kunal", "Singh", NULL),
       (6, "Malia", "Brown", 5),
       (7, "Sarah", "Lourd", NULL),
       (8, "Tom", "Allen", 7);
       