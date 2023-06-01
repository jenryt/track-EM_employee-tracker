const inquirer = require("inquirer");
const connection = require("./config/connection");
const cTable = require("console.table");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
} = require("./utils/queries");

// // Create a function to initialize app
// function init() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         message: "What would you like to do?",
//         name: "todo",
//         choices: [
//           "View All Departments",
//           "View All Roles",
//           "View All Employees",
//           "Add Department",
//           "Add Role",
//           "Add An Employee",
//           "Update Employee Role",
//           "Quit",
//         ],
//       },
//     ])
//     .then(async (response) => {
//       switch (response.todo) {
//         case "View All Departments":
//           viewAllDepartments();
//           break;

//         case "View All Roles":
//           viewAllRoles();
//           break;

//         case "View All Employees":
//           viewAllEmployees();
//           break;

//         case "Add Department":
//           break;

//         case "Add Role":
//           break;

//         case "Add An Employee":
//           break;

//         case "Update Employee Role":
//           break;

//         case "Quit":
//           process.exit();
//       }
//     });
// }

// // Function call to initialize app
// init();

// // .then(() => {
// //   inquirer.prompt([
// //     {
// //       type: "confirm",
// //       message: "continue?",
// //       name: "continue",
// //     },
// //   ]);
// // });

const pastSelections = [];

function init() {
  promptUser();
}

function promptUser() {
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
      const selected = response.todo;

      switch (selected) {
        case "View All Departments":
          viewAllDepartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Department":
          break;

        case "Add Role":
          break;

        case "Add An Employee":
          break;

        case "Update Employee Role":
          break;

        case "Quit":
          // console.log("Past selections:", pastSelections);
          process.exit();
      }

      pastSelections.push(selected); // Add the selected option to past selections

      console.log(); // Add a newline for better readability
      promptUser(); // Prompt user again for the next selection
    });
}

// Function call to initialize app
init();
