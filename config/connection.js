require("dotenv").config();
const mysql = require("mysql2");

// Create a new MySQL connection object
const connection = mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

module.exports = connection;
