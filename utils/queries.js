const inquirer = require("inquirer");
const connection = require("../config/connection");
const cTable = require("console.table");

async function viewAllDepartments() {
  try {
    const results = await connection.query("SELECT * FROM department");
    console.log();
    console.table(results[0]);
  } catch (error) {
    console.log(error);
  }
}
async function viewAllRoles() {
  try {
    const results = await connection.query("SELECT * FROM role");
    console.log();
    console.table(results[0]);
  } catch (error) {
    console.log(error);
  }
}

async function viewAllEmployees() {
  try {
    const results = await connection.query("SELECT * FROM employee");
    console.log();
    console.table(results[0]);
  } catch (error) {
    console.log(error);
  }
}

async function AddDepartment() {
  connection.query();
}
async function AddRole() {
  connection.query();
}
async function AddEmployee() {
  connection.query();
}
async function UpdateEmployeeRole() {
  connection.query();
}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
// async function AddDepartment() {}
module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };
