SELECT  department.id, 
        department.name AS department
FROM department;


SELECT  role.id,
        role.title,
        department.name AS department,
        role.salary 
FROM role 
JOIN department 
ON role.department_id = department.name;


SELECT  employee.id, 
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        employee.manager_id AS manager 
FROM employee 
JOIN role 
ON  role.id = employee.role_id 
JOIN department
ON  department.id = role.department_id;
