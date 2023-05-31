const inquirer = require("inquirer");
const express = require("express");
const connection = require("./config/connection");

const app = express();

const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
          break;
        }
        case "View All Roles": {
          break;
        }
        case "View All Employees": {
          break;
        }
        case "Add Department": {
          break;
        }
        case "Add Role": {
          break;
        }
        case "Add An Employee": {
          break;
        }
        case "Update Employee Role": {
          break;
        }
        case "Quit": {
          return;
        }
      }
    });
}

// Function call to initialize app
init();
