const mysql = require("mysql2");
let inquirer = require("inquirer");
require("console.table");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeesdb"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  firstPrompt();
});

function firstPrompt() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "1. View all Departments",
        "2. View all Roles",
        "3. View all Employees",
        "4. View Employees by Department",
        // "View Employees by Manager",
        "5. Add a Department",
        "6. Add an Employee",
        "7. Remove an Employee",
        "8. Update an Employee Role",
        "9. Add a Role",
        // "Remove Role",
        // "Update Employee Manager",
        "10. End Session"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "1. View all Departments":
          viewDepartments();
          break;
        case "2. View all Roles":
          viewRoles();
          break;
        case "3. View all Employees":
          viewEmployee();
          break;
        case "4. View Employees by Department":
          viewEmployeeByDepartment();
          break;
        // case "View Employees by Manager":
        //   viewEmployeeByManager();
        //   break;
        case "5. Add a Department":
          addDepartment();
          break;
        case "6. Add an Employee":
          addEmployee();
          break;
        case "7. Remove an Employee":
          removeEmployees();
          break;
        case "8. Update an Employee Role":
          updateEmployeeRole();
          break;
        case "9. Add a Role":
          addRole();
          break;
        // case "Remove Role":
        //   removeRole();
        //   break;

        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;

        case "10. End Session":
          connection.end();
          break;
      }
    });
}

//////////////////========================= 1."View all Departments"/ READ all, SELECT * FROM

function viewDepartments() {
  console.log("Viewing all Departments\n");

  let query =
    `SELECT * FROM department ORDER BY id ASC;`

    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Departments viewed!\n");
  
      firstPrompt();
})
};

//////////////////========================= 2."View all Roles"/ READ all, SELECT * FROM

function viewRoles() {
  console.log("Viewing all Roles\n");

  let query =
    `SELECT * FROM role
    INNER JOIN department
    ON role.department_id = department.id
    ORDER by role.id ASC;`

    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Roles viewed!\n");
  
      firstPrompt();
})
};

//////////////////========================= 3."View all Employees"/ READ all, SELECT * FROM

function viewEmployee() {
  console.log("Viewing all employees\n");

  let query =
    `SELECT * FROM employee 
    INNER JOIN role on employee.role_id = role.id 
    RIGHT JOIN department on department.id = role.department_id
    GROUP BY employee.id, employee.first_name, employee.last_name ORDER by employee.id;`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    firstPrompt();
  });
  // console.log(query.sql);
}

//========================================= 4."View Employees by Department" / READ by, SELECT * FROM

// Make a department array

function viewEmployeeByDepartment() {
  console.log("Viewing employees by department\n");

  let query =
    `SELECT d.id, d.name, r.salary AS budget
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  GROUP BY d.id, d.name`

  connection.query(query, function (err, res) {
    if (err) throw err;

    // const departmentChoices = res.map(({ id, name }) => ({
    //   name: `${id} ${name}`,
    //   value: id
    // }));

    const departmentChoices = res.map(data => ({
      value: data.id, name: data.name
    }));

    console.table(res);
    console.log("Department view succeed!\n");

    promptDepartment(departmentChoices);
  });
  // console.log(query.sql);
}

// User choose the department list, then employees pop up

function promptDepartment(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you choose?",
        choices: departmentChoices
      }
    ])
    .then(function (answer) {
      console.log("answer ", answer.departmentId);

      var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  WHERE d.id = ?`

      connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees are viewed!\n");

        firstPrompt();
      });
    });
}

//========================================= 5."Add a Department"

function addDepartment() {
  console.log("Adding a Department!")

  var query =
    `SELECT * FROM department`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id, name: `${name}`
    }));

    console.table(res);
    console.log("Department to add!");

    promptDeptInsert();
  });
}

function promptDeptInsert() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Department?"
      },
      
    ])
    .then(function (answer) {
      console.log(answer);

      let query = `INSERT INTO employeesdb.department SET ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        {
          name: answer.name,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Added Department successfully!\n");

          firstPrompt();
        });
      // console.log(query.sql);
    });
}

//========================================= 4."Add Employee"
// Make a employee array

function addEmployee() {
  console.log("Adding an employee!")

  let query =
    `SELECT r.id, r.title, r.salary 
      FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id, name: `${title}`, salary: `${salary}`
    }));

    console.table(res);
    console.log("RoleToInsert!");

    promptInsert(roleChoices);
  });
}

function promptInsert(roleChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager_id?",
      }
    ])
    .then(function (answer) {
      console.log(answer);

      let query = `INSERT INTO employee SET ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.manager_id,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Inserted successfully!\n");

          firstPrompt();
        });
      // console.log(query.sql);
    });
}

//========================================= 6."Remove Employees" / DELETE, DELETE FROM

// Make a employee array to delete

function removeEmployees() {
  console.log("Deleting an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);
    console.log("ArrayToDelete!\n");

    promptDelete(deleteEmployeeChoices);
  });
}

// User choose the employee list, then employee is deleted

function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
      // console.log(query.sql);
    });
}

//========================================= 6."Update Employee Role" / UPDATE,

function updateEmployeeRole() { 
  employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);
    console.log("employeeArray To Update!\n")

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Updating an role");

  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("roleArray to Update!\n")

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          firstPrompt();
        });
      // console.log(query.sql);
    });
}



//////////////////========================= 7."Add Role" / CREATE: INSERT INTO

// function addRole() {
//   console.log("Adding a Role!")

//   let query =
//     `SELECT * FROM role 
//     RIGHT JOIN department on role.department_id = department.id
//     ORDER by role.id;`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
//   const roleChoices = res.map(({ id, title, salary, department_id }) => ({
//       value: id, name: `${id} ${title} ${salary} ${department_id}`
//     }));

//     console.table(res);
//     console.log("Role to add!");

//     promptAddRole();
//   });
// }

// function promptAddRole() {

//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "title",
//         message: "Role title?"
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is the Role Salary"
//       },
//       {
//         type: "list",
//         name: "department_id",
//         message: "Select the Department ID from the list?",
//         choices: ["Sales", "Engineering", "Finance", "Operations", "Executive", "Marketing", "Human Resources"]
//       },
//     ])
//     .then(function (answer) {

//       var query = `INSERT INTO role SET ?`

//       connection.query(query, {
//         title: answer.title,
//         salary: answer.salary,
//         department_id: answer.departmentId
//       },
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log("Role Inserted!");

//           firstPrompt();
//         });

//     });
// }

function addRole() {

  var query =
    `SELECT * FROM role
    INNER JOIN department
    on role.department_id = department.id
    ORDER BY role.id ASC;`

  connection.query(query, function (err, res) {
    if (err) throw err;

    // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
    const departmentChoices = res.map(({ id, name }) => ({
      value: id, name: `${id} ${name}`
    }));

    console.table(res);
    console.log("Viewing all Roles!");

    promptAddRole(departmentChoices);
  });
}

function promptAddRole(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Role title?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Role Salary"
      },
      {
        type: "list",
        name: "departmentId",
        message: "Department?",
        choices: departmentChoices
      },
    ])
    .then(function (answer) {

      var query = `INSERT INTO employeesdb.role SET ?`

      connection.query(query, {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentId
      },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Role Inserted!");

          firstPrompt();
        });

    });
}


