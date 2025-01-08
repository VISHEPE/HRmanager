// db.js
const mysql = require('mysql2');

// Create a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'hr'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;
