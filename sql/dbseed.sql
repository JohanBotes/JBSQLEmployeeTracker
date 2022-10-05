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
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 185000, 2);
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
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 185000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Manager", 150000, 7);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Consultant", 87500, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Accounting Assistant", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Web/UI/UX Designer", 54000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Technician", 60000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Driver", 102500, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Driver", 54000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Technician", 120000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Social Media Consultant", 60000, 6);

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
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Muledeer", "Moleskin", 2, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Android", "IPhone", 7, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Molly", "TheChicken", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dane", "Edwards", 6, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "McMillan", 3, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Louise", "van der Merwe", 8, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marina", "Kotze", 10, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hakkie", "Kotze", 5, 5);

