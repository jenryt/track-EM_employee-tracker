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
    const results = await connection.promise().query(`
    SELECT r.id, r.title, r.salary, d.name AS department_name
    FROM role r
    LEFT JOIN department d ON r.department_id = d.id
    `);
    console.log();
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function viewAllEmployees() {
  try {
    const results = await connection.promise().query(`
    SELECT e.id, 
           e.first_name, 
           e.last_name, 
           r.title AS role_title, 
           CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN employee m ON e.manager_id = m.id
    `);
    console.log();
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function viewEmployeesByManager() {
  try {
    const response = await inquirer.prompt([
      {
        type: "number",
        message: "Please enter the manager id to view employee by manager.",
        name: "manager_id",
      },
    ]);
    const results = await connection.promise().query(`
      SELECT e.id, 
             e.first_name, 
             e.last_name, 
             r.title AS role_title, 
             CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE m.id = ${response.manager_id}
    `);
    console.log(`\nEmployees under manager ${results[0][0].manager_name}...\n`);
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function viewEmployeesByDepartment() {
  try {
    const response = await inquirer.prompt([
      {
        type: "number",
        message:
          "Please enter the department id to view employee by department.",
        name: "department_id",
      },
    ]);
    const [department] = await connection
      .promise()
      .query(
        `SELECT name FROM department WHERE id = ${response.department_id}`
      );

    const results = await connection.promise().query(`
      SELECT e.id, 
             e.first_name, 
             e.last_name, 
             r.title AS role_title, 
             CONCAT(m.first_name, ' ', m.last_name) AS manager_name
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE r.department_id = ${response.department_id}
    `);
    console.log(`\n${department[0].name} Department...\n`);
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function departmentBudget() {
  try {
    const response = await inquirer.prompt([
      {
        type: "number",
        message:
          "Please enter the department id to view the department budget.",
        name: "department_id",
      },
    ]);
    const results = await connection.promise().query(`
      SELECT d.name AS department_name, SUM(r.salary) AS department_budget
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      WHERE r.department_id = ${response.department_id}
    `);
    console.log(
      `The budget for ${results[0][0].department_name} department is: $${results[0][0].department_budget}`
    );
    return results[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function addDepartment() {
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

async function addRole() {
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

async function addEmployee() {
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

async function updateEmployeeRole() {
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
        console.log("Employee's role has been successfully updated!");
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

async function updateEmployeeManager() {
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
          message: "Please enter the new manager id for this employee.",
          name: "new_manager_id",
        },
      ])
      .then(async (response) => {
        connection.promise().query(
          `
          UPDATE employee
          SET manager_id = '${response.new_manager_id}'
          WHERE id = '${response.employee_id}';
          `
        );
        console.log("Employee's manager has been successfully updated!");
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

async function deleteDepartment() {
  try {
    await inquirer
      .prompt([
        {
          type: "number",
          message: "Please provide the employee id to delete.",
          name: "department_id",
        },
        {
          type: "confirm",
          message: async (response) => {
            const [department] = await connection
              .promise()
              .query(
                `SELECT name FROM department WHERE id = '${response.department_id}'`
              );

            return `Are you sure you want to delete the department '${department[0].name}'?`;
          },
          name: "confirm",
          default: false,
        },
      ])
      .then(async (response) => {
        if (response.confirm) {
          connection.promise().query(`
          DELETE FROM department
          WHERE id = '${response.department_id}'
          `);
          console.log("The department has been sucessfully deleted!");
          await viewAllDepartments();
        } else {
          console.log("Deletion canceled.");
        }
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

async function deleteRole() {
  try {
    await inquirer
      .prompt([
        {
          type: "number",
          message: "Please provide the role id to delete.",
          name: "role_id",
        },
        {
          type: "confirm",
          message: async (response) => {
            const [role] = await connection
              .promise()
              .query(`SELECT title FROM role WHERE id = '${response.role_id}'`);

            return `Are you sure you want to delete the role '${role[0].title}'?`;
          },
          name: "confirm",
          default: false,
        },
      ])
      .then(async (response) => {
        if (response.confirm) {
          connection.promise().query(`
          DELETE FROM role
          WHERE id = '${response.role_id}'
          `);
          console.log("The role has been sucessfully deleted!");
          await viewAllRoles();
        } else {
          console.log("Deletion canceled.");
        }
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

async function deleteEmployee() {
  try {
    await inquirer
      .prompt([
        {
          type: "number",
          message: "Please provide the employee id to delete.",
          name: "employee_id",
        },
        {
          type: "confirm",
          message: async (response) => {
            const [employee] = await connection
              .promise()
              .query(
                `SELECT first_name, last_name FROM employee WHERE id = '${response.employee_id}'`
              );

            return `Are you sure you want to delete the employee '${employee[0].first_name} ${employee[0].last_name}'?`;
          },
          name: "confirm",
          default: false,
        },
      ])
      .then(async (response) => {
        if (response.confirm) {
          connection.promise().query(`
          DELETE FROM employee
          WHERE id = '${response.employee_id}'
          `);
          console.log("The employee has been sucessfully deleted!");
          await viewAllEmployees();
        } else {
          console.log("Deletion canceled.");
        }
      });
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
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
};
