USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Operations");
INSERT INTO department (name)
VALUES ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Operations Manager", 185000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("COO", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 300000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Peter", "Pumpkin", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Petronella", "Potato", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tommy", "Tomato", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angelina", "Apple", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Benjamin", "Banana", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Prickly", "Pear", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Troy", "TheFallenCity", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Jerusalem", 1, 2);