INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");



INSERT INTO role (id ,title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
       (2,"Salesperson", 80000, 1),
       (3,"Lead Engineer", 150000, 2),
       (4,"Software Engineer", 120000, 2),
       (5,"Account Manager", 160000, 3),
       (6,"Accountant", 125000, 3),
       (7,"Legal Team Lead", 250000, 4),
       (8,"Lawyer", 190000, 4);

       

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, null),
       (2, "Mike", "Chan", 1, 1),
       (3, "Ashley", "Rodriguez", 1, null),
       (4, "Kevin", "Tupik", 1, 3),
       (5, "Kunal", "Singh", 1, null),
       (6, "Malia", "Brown", 1, 5),
       (7, "Sarah", "Lourd", 1, null),
       (8, "Tom", "Allen", 1, 7);














--        DROP DATABASE IF EXISTS employee_db;
-- CREATE DATABASE employee_db;

-- USE employee_db;


-- CREATE TABLE department(

--     id INT PRIMARY KEY,
--     name VARCHAR(30)
-- );


-- CREATE TABLE role(

--     role_id INT PRIMARY KEY,
--     title VARCHAR(30),
--     salary DECIMAL,
--     department_id INT
-- );

-- CREATE TABLE employee(

--     id INT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     role_id INT,
--     manager_id INT 
-- );

-- INSERT INTO department (id, name)
-- VALUES (1, "Sales"),
--        (2, "Engineering"),
--        (3, "Finance"),
--        (4, "Legal");


-- INSERT INTO role (role_id, title, salary, department_id)
-- VALUES (1, "Sales Lead", 100000, 1),
--        (2, "Salesperson", 80000, 1),
--        (3, "Lead Engineer", 150000, 2),
--        (4, "Software Engineer", 120000, 2),
--        (5, "Account Manager", 160000, 3),
--        (6, "Accountant", 125000, 3),
--        (7, "Legal Team Lead", 250000, 4),
--        (8, "Lawyer", 190000, 4);

      
-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
-- VALUES (1, "John", "Doe", 1, null),
--        (2,"Mike", "Chan", 1, 1),
--        (3,"Ashley", "Rodriguez", 1, null),
--        (4,"Kevin", "Tupik", 1, 3),
--        (5,"Kunal", "Singh", 1, null),
--        (6,"Malia", "Brown", 1, 5),
--        (7,"Sarah", "Lourd", 1, null),
--        (8,"Tom", "Allen", 1, 7);
       
--        SELECT department.id AS department, role.title
-- FROM role
-- LEFT JOIN department
-- ON role.department_id = department.id
-- ORDER BY department.id;
