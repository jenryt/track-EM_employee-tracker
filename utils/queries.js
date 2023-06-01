const inquirer = require("inquirer");
const connection = require("../config/connection");
const cTable = require("console.table");

async function viewAllDepartments() {
  try {
    const results = await connection
      .promise()
      .query("SELECT * FROM department");
    console.log();
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}
async function viewAllRoles() {
  try {
    const results = await connection.promise().query("SELECT * FROM role");
    console.log();
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function viewAllEmployees() {
  try {
    const results = await connection.promise().query("SELECT * FROM employee");
    console.log();
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function AddDepartment() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter a new department name.",
          name: "newDepartment",
        },
      ])
      .then(async (response) => {
        connection
          .promise()
          .query(
            `INSERT INTO department (name) VALUES ('${response.newDepartment}')`
          );
        console.log("New department has been successfully added!");
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

async function AddRole() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter a new role title.",
          name: "title",
        },
        {
          type: "number",
          message: "Please enter the salary for the new role.",
          name: "salary",
          filter: function (value) {
            // Convert the value to a floating-point number
            let parsedValue = parseFloat(value);
            // Round the number to two decimal places
            parsedValue = parsedValue.toFixed(2);
            // Return the modified value
            return parsedValue;
          },
        },
        {
          type: "number",
          message: "Please enter the department_id for the new role.",
          name: "department_id",
        },
      ])
      .then(async (response) => {
        connection
          .promise()
          .query(
            `INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department_id}')`
          );
        console.log("New role has been successfully added!");
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

async function AddEmployee() {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter the empolyee's first name.",
          name: "first_name",
        },
        {
          type: "input",
          message: "Please enter the empolyee's last name.",
          name: "last_name",
        },
        {
          type: "number",
          message: "Please enter the role id for this employee.",
          name: "role_id",
        },
        {
          type: "number",
          message: "Please enter the manager id for this employee.",
          name: "manager_id",
        },
      ])
      .then(async (response) => {
        connection
          .promise()
          .query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`
          );
        console.log("New employee has been successfully added!");
      });
  } catch (error) {
    console.log(error);
    return;
  }
}
async function UpdateEmployeeRole() {
  try {
    await inquirer
      .prompt([
        {
          type: "number",
          message: "Please provide employee id to update.",
          name: "employee_id",
        },
        {
          type: "number",
          message: "Please enter the new role id for this employee.",
          name: "new_role_id",
        },
      ])
      .then(async (response) => {
        connection.promise().query(
          `
          UPDATE employee
          SET role_id = '${response.new_role_id}'
          WHERE id = '${response.employee_id}';
          `
        );
        console.log("Employee role has been successfully updated!");
      });
  } catch (error) {
    console.log(error);
    return;
  }
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
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  AddDepartment,
  AddRole,
  AddEmployee,
  UpdateEmployeeRole,
};
