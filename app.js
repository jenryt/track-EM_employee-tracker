const inquirer = require("inquirer");
const connection = require("./config/connection");
const cTable = require("console.table");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  departmentBudget,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
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
          "View employees by manager",
          "View employees by department",
          "View Department Budget",
          "Add Department",
          "Add Role",
          "Add An Employee",
          "Update Employee Role",
          "Update Employee Manager", //
          "Delete Department", //
          "Delete Role", //
          "Delete Employee", //
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

        case "View employees by manager": {
          let allEmployees = await viewEmployeesByManager();
          console.table(allEmployees);
          return init();
        }

        case "View employees by department": {
          let allEmployees = await viewEmployeesByDepartment();
          console.table(allEmployees);
          return init();
        }

        case "View Department Budget": {
          await departmentBudget();
          return init();
        }

        case "Add Department": {
          await addDepartment();
          return init();
        }

        case "Add Role": {
          await addRole();
          return init();
        }

        case "Add An Employee": {
          await addEmployee();
          return init();
        }

        case "Update Employee Role": {
          await updateEmployeeRole();
          return init();
        }

        case "Update Employee Manager": {
          await updateEmployeeManager();
          return init();
        }

        case "Delete Department": {
          await deleteDepartment();
          return init();
        }

        case "Delete Role": {
          await deleteRole();
          return init();
        }

        case "Delete Employee": {
          await deleteEmployee();
          return init();
        }

        case "Quit": {
          console.log("ciao!");
          process.exit();
        }
      }
    });
}

// Function call to initialize app
init();
