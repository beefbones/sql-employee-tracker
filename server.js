const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const cTable = require("console.table");

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "banana111",
  database: "employee_info_db"
});

connection.connect(err => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  startScreen();
});

function startScreen() {
  inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "Add department",
      "Add role",
      "Add employee",
      "View departments",
      "View roles",
      "View employees",
      "Update employee role",
      "Quit"
    ]
  }).then(({ option }) => {
    console.log(`You entered: ${option}`);
    switch (option) {
      case "Add department":
        return addDepartment();
      case "Add role":
        return addRole();
      case "Add employee":
        return addEmployee();
      case "View departments":
        return viewDepartment();
      case "View roles":
        return viewRoles();
      case "View employees":
        return viewEmployees();
      case "Update employee role":
        return updateEmployee();
      default:
        return quit();
    }
  });
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "deptName",
    message: "What is the name of the department?"
  }).then(({ deptName }) => {
    connection.query(
      "INSERT INTO department (name) VALUES (?)",
      [deptName],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        startScreen();
      }
    );
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What's the name of the role?"
    },
    {
      type: "input",
      name: "salaryTotal",
      message: "What is the salary for this role?"
    },
    {
      type: "input",
      name: "deptID",
      message: "What is the department id number?"
    }
  ]).then(({ roleName, salaryTotal, deptID }) => {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [roleName, salaryTotal, deptID],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        startScreen();
      }
    );
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "eeFirstName",
      message: "What's the first name of the employee?"
    },
    {
      type: "input",
      name: "eeLastName",
      message: "What's the last name of the employee?"
    },
    {
      type: "input",
      name: "roleID",
      message: "What is the employee's role id number?"
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the manager id number?"
    }
  ]).then(({ eeFirstName, eeLastName, roleID, managerID }) => {
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [eeFirstName, eeLastName, roleID, managerID],
      (err, res)=> {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function updateEmployee() {
    const {eeUpdate, updateRole} = await inquirer.prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },
  
      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ]);
  
    try {
      const result = await connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [updateRole, eeUpdate]);
      console.table(result);
    } catch (err) {
      console.error(err);
    }
  
    startScreen();
  }
  
  async function viewDepartment() {
    try {
      const result = await connection.query('SELECT * FROM department');
      console.table(result);
    } catch (err) {
      console.error(err);
    }
  
    startScreen();
  }
  
  async function viewRoles() {
    try {
      const result = await connection.query('SELECT * FROM role');
      console.table(result);
    } catch (err) {
      console.error(err);
    }
  
    startScreen();
  }
  
  async function viewEmployees() {
    try {
      const result = await connection.query('SELECT * FROM employee');
      console.table(result);
    } catch (err) {
      console.error(err);
    }
  
    startScreen();
  }
  
  function quit() {
    connection.end();
    process.exit();
  }