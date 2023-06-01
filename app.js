const inquirer = require("inquirer");
const connection = require("./config/connection");
const cTable = require("console.table");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  AddDepartment,
  AddRole,
  AddEmployee,
  UpdateEmployeeRole,
} = require("./utils/queries");

// Create a function to initialize app
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "todo",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add An Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then(async (response) => {
      switch (response.todo) {
        case "View All Departments": {
          let allDepartments = await viewAllDepartments();
          console.table(allDepartments);
          return init();
        }

        case "View All Roles": {
          let allRoles = await viewAllRoles();
          console.table(allRoles);
          return init();
        }

        case "View All Employees": {
          let allEmployees = await viewAllEmployees();
          console.table(allEmployees);
          return init();
        }

        case "Add Department": {
          await AddDepartment();
          return init();
        }

        case "Add Role": {
          await AddRole();
          return init();
        }

        case "Add An Employee": {
          await AddEmployee();
          return init();
        }

        case "Update Employee Role": {
          await UpdateEmployeeRole();
          return init();
        }

        case "Quit": {
          process.exit();
        }
      }
    });
}

// Function call to initialize app
init();

// for testing
// Operations

// { title: 'Business Analyst', salary: 80000.00, department_id: 3 },

// ('James', 'Wilson', 4, 2), -- Marketing Specialist, managed by David Brown
